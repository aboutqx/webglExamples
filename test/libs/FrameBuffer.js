// FrameBuffer.js

import { gl, GlTools, canvas } from './GlTools';
import GLTexture from './GLTexture';


let webglDepthTexture;
let hasCheckedMultiRenderSupport = false;
let extDrawBuffer;


const checkMultiRender = function () {
    if (window.useWebgl2) {
        return true;
    } else {
        extDrawBuffer = gl.getExtension('WEBGL_draw_buffers');
        return !!extDrawBuffer;
    }
};

class FrameBuffer {

    constructor(mWidth, mHeight, mParameters = {}, mNumTargets = 1) {
        webglDepthTexture = !window.useWebgl2 && gl.getExtension('WEBGL_depth_texture');

        this.width = mWidth || canvas.width;
        this.height = mHeight || canvas.height;
        this._numTargets = mNumTargets;
        this._multipleTargets = mNumTargets > 1;
        if (mParameters.hdr == true) {
            this._parameters = { internalFormat: gl.RGBA16F, type: gl.HALF_FLOAT, minFilter: mParameters.minFilter, maxFilter: mParameters.magFilter }
        } else this._parameters = mParameters;

        if (!hasCheckedMultiRenderSupport) {
            checkMultiRender();
        }

        if (this._multipleTargets) {
            this._checkMaxNumRenderTarget();
        }

        this._init();
    }


    _init() {
        this._initTextures();

        this.frameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);

        if (window.useWebgl2) {
            // let depthRenderBuffer = gl.createRenderbuffer();
            // gl.bindRenderbuffer(gl.RENDERBUFFER, depthRenderBuffer);
            // gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH24_STENCIL8, this.width, this.height);
            // gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthRenderBuffer);
            if (this._numTargets === 0) {
                gl.readBuffer(gl.NONE);
                gl.drawBuffers([gl.NONE]);
            }
            else {
                const buffers = [];
                for (let i = 0; i < this._numTargets; i++) {
                    gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, this._textures[i].texture, 0);
                    buffers.push(gl[`COLOR_ATTACHMENT${i}`]);
                }
                gl.drawBuffers(buffers);
            }

            gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.glDepthTexture.texture, 0);


        } else {
            for (let i = 0; i < this._numTargets; i++) {
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, this._textures[i].texture, 0);
            }

            if (this._multipleTargets) {
                const drawBuffers = [];
                for (let i = 0; i < this._numTargets; i++) {
                    drawBuffers.push(extDrawBuffer[`COLOR_ATTACHMENT${i}_WEBGL`]);
                }

                extDrawBuffer.drawBuffersWEBGL(drawBuffers);
            }

            if (webglDepthTexture) {
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.glDepthTexture.texture, 0);
            }
        }


        //	CHECKING FBO
        const FBOstatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (FBOstatus != gl.FRAMEBUFFER_COMPLETE) {
            console.log(`gl.checkFramebufferStatus() returned ${status.toString(16)}`);
        }

        //	UNBIND

        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);


        //	CLEAR FRAMEBUFFER

        this.clear(); // can't comment this, or Bloom.js effects can't work in chrome, while works at firefox. May caused by the depth texture.
        //well, it's a type mistake,in unbind, which set viewport size to gl.width, which is not defined there, and no error or warnning.
        //so it seems firefox handle it somewhere.
    }

    _checkMaxNumRenderTarget() {
        const maxNumDrawBuffers = window.useWebgl2 ? gl.getParameter(gl.MAX_DRAW_BUFFERS) : gl.getParameter(extDrawBuffer.MAX_DRAW_BUFFERS_WEBGL);
        if (this._numTargets > maxNumDrawBuffers) {
            console.error('Over max number of draw buffers supported : ', maxNumDrawBuffers);
            this._numTargets = maxNumDrawBuffers;
        }
    }

    _initTextures() {
        this._textures = [];
        for (let i = 0; i < this._numTargets; i++) {
            const glt = this._createTexture();
            this._textures.push(glt);
        }


        if (window.useWebgl2) {
            this.glDepthTexture = this._createTexture(gl.DEPTH_COMPONENT16, gl.UNSIGNED_SHORT, gl.DEPTH_COMPONENT, { minFilter: gl.NEAREST, magFilter: gl.NEAREST });
        } else {
            this.glDepthTexture = this._createTexture(gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, gl.DEPTH_COMPONENT, { minFilter: gl.LINEAR });
        }
    }

    _createTexture(mInternalformat, mTexelType, mFormat, mParameters = {}) {
        const parameters = Object.assign({}, this._parameters);
        parameters.internalFormat = mInternalformat || parameters.internalFormat;
        parameters.format = mFormat || parameters.format || gl.RGBA;
        parameters.type = mTexelType || parameters.type || gl.UNSIGNED_BYTE;

        for (const s in mParameters) {
            parameters[s] = mParameters[s];
        }

        const texture = new GLTexture(null, parameters, this.width, this.height);

        return texture;
    }

    //	PUBLIC METHODS

    bind(mAutoSetViewport = true) {
        if (mAutoSetViewport) {
            gl.viewport(0, 0, this.width, this.height);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        GlTools.clear(0, 0, 0, 1)
    }


    unbind(mAutoSetViewport = true) {
        if (mAutoSetViewport) {
            gl.viewport(0, 0, canvas.width, canvas.height);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        this._textures.forEach(texture => {
            texture.generateMipmap();
        });
    }


    clear(r = 0, g = 0, b = 0, a = 0) {
        this.bind();
        GlTools.clear(r, g, b, a);
        this.unbind();
    }


    //	TEXTURES

    get textures() {
        return this._textures
    }

    getTexture(mIndex = 0) {
        return this._textures[mIndex];
    }

    get depthTexture() {
        return this.glDepthTexture;
    }

    //	TOUGHTS : Should I remove these from frame buffer ?
    //	Shouldn't these be set individually to each texture ?
    //	e.g. fbo.getTexture(0).minFilter = gl.NEAREST;
    //		 fbo.getTexture(1).minFilter = gl.LINEAR; ... etc ?

    //	MIPMAP FILTER

    get minFilter() { return this._textures[0].minFilter; }

    set minFilter(mValue) {
        this._textures.forEach(texture => {
            texture.minFilter = mValue;
        });
    }

    get magFilter() { return this._textures[0].magFilter; }

    set magFilter(mValue) {
        this._textures.forEach(texture => {
            texture.magFilter = mValue;
        });
    }


    //	WRAPPING

    get wrapS() { return this._textures[0].wrapS; }

    set wrapS(mValue) {
        this._textures.forEach(texture => {
            texture.wrapS = mValue;
        });
    }


    get wrapT() { return this._textures[0].wrapT; }

    set wrapT(mValue) {
        this._textures.forEach(texture => {
            texture.wrapT = mValue;
        });
    }

    //	UTILS

    showParameters() {
        this._textures[0].showParameters();
    }

    get numTargets() { return this._numTargets; }
}


export default FrameBuffer;
