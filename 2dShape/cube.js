var canvas;
var gl;

var cubeVerticesBuffer;
var cubeVerticesColorBuffer;
var cubeVerticesIndexBuffer;
var cubeVerticesIndexBuffer;
var cubeRotation = 0.0;
var cubeXOffset = 0.0;
var cubeYOffset = 0.0;
var cubeZOffset = 0.0;
var lastCubeUpdateTime = 0;
var xIncValue = 0.2;
var yIncValue = -0.4;
var zIncValue = 0.3;

var mvMatrix;
var shaderProgram;
var vertexPositionAttribute;
var vertexColorAttribute;
var textureCoordAttribute;
var perspectiveMatrix;
var tmpBuffer;

function start() {
    canvas = document.getElementById("glcanvas");

    initWebGL(canvas); // Initialize the GL context


    if (gl) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
        gl.clearDepth(1.0); // Clear everything
        gl.enable(gl.DEPTH_TEST); // Enable depth testing
        gl.depthFunc(gl.LEQUAL); // Near things obscure far things

        this.$SphericalRenderer1 = gl;
        initShaders();
        initBuffers();
        initTextures();
    }
}
var cubeTexture;

function initTextures() {
    cubeTexture = gl.createTexture();
    cubeImage = new Image();
    cubeImage.onload = function() { handleTextureLoaded(cubeImage, cubeTexture); }
    cubeImage.src = "Koala.jpg";
}

function handleTextureLoaded(image, texture) {
    console.log("handleTextureLoaded, image = " + image);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
        gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);

    setTimeout(drawScene, 15);
}

function initWebGL() {
    gl = null;

    try {
        gl = canvas.getContext("webgl");
    } catch (e) {}

    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
    }
}


function initBuffers() {

    o = 3;
    var p = 2,
        q = 3,
        r = [5, 1, 3, 7, 0, 4, 6, 2, 6, 7, 3, 2, 0, 1, 5, 4, 4, 5, 7, 6, 1, 0, 2, 3],
        s = [];
    for (var t = 0; t < r.length; t++) {
        var u = r[t] >> 2 & 1,
            v = r[t] >> 1 & 1,
            w = r[t] >> 0 & 1;
        s.push(u * 2 - 1);
        s.push(v * 2 - 1);
        s.push(w * 2 - 1);
    }
    this.$SphericalRenderer14 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.$SphericalRenderer14);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(s), gl.STATIC_DRAW);
    this.$SphericalRenderer14.itemSize = 3;
    this.$SphericalRenderer14.numItems = s.length / 3;
    var x = [],
        y = 1 / q,
        z = 1 / p,
        aa = (o - 1) / 2;
    for (var ba = 0; ba < p; ++ba)
        for (var ca = 0; ca < q; ++ca) {
            var da = p - 1 - ba,
                ea = ca;
            x.push((ea + aa) * y);
            x.push((da + aa) * z);
            x.push((ea + 1 - aa) * y);
            x.push((da + aa) * z);
            x.push((ea + 1 - aa) * y);
            x.push((da + 1 - aa) * z);
            x.push((ea + aa) * y);
            x.push((da + 1 - aa) * z);
        }
    this.$SphericalRenderer13 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.$SphericalRenderer13);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(x), gl.STATIC_DRAW);
    this.$SphericalRenderer13.itemSize = 2;
    this.$SphericalRenderer13.numItems = x.length / 2;
    var fa = [];
    for (var ga = 0; ga < r.length; ga += 4) {
        fa.push(ga);
        fa.push(ga + 2);
        fa.push(ga + 1);
        fa.push(ga);
        fa.push(ga + 3);
        fa.push(ga + 2);
    }
    window.fa=fa;
    this.$SphericalRenderer15 = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.$SphericalRenderer15);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(fa), gl.STATIC_DRAW);
    this.$SphericalRenderer15.itemSize = 1;
    this.$SphericalRenderer15.numItems = fa.length;
}


var worldFactor = 1.0;
var HMD = {

    hResolution: 960,
    vResolution: 640,
    hScreenSize: 0.12576,
    vScreenSize: 0.07074,
    interpupillaryDistance: 0.0635,
    lensSeparationDistance: 0.0635,
    eyeToScreenDistance: 0.041,
    distortionK: [1.0, 0.22, 0.24, 0.0],
    chromaAbParameter: [0.996, -0.004, 1.014, 0.0]
};
var left = {},
    right = {};
var aspect = HMD.hResolution / (2 * HMD.vResolution);

// Fov is normally computed with:
//   THREE.Math.radToDeg( 2*Math.atan2(HMD.vScreenSize,2*HMD.eyeToScreenDistance) );
// But with lens distortion it is increased (see Oculus SDK Documentation)
var r = -1.0 - (4 * (HMD.hScreenSize / 4 - HMD.lensSeparationDistance / 2) / HMD.hScreenSize);
distScale = (HMD.distortionK[0] + HMD.distortionK[1] * Math.pow(r, 2) + HMD.distortionK[2] * Math.pow(r, 4) + HMD.distortionK[3] * Math.pow(r, 6));
/*var fov = THREE.Math.radToDeg(2 * Math.atan2(HMD.vScreenSize * distScale, 2 * HMD.eyeToScreenDistance));

// Compute camera projection matrices
var proj = (new THREE.Matrix4()).makePerspective(fov, aspect, 0.3, 10000);
var h = 4 * (HMD.hScreenSize / 4 - HMD.interpupillaryDistance / 2) / HMD.hScreenSize;
left.proj = ((new THREE.Matrix4()).makeTranslation(h, 0.0, 0.0)).multiply(proj);
right.proj = ((new THREE.Matrix4()).makeTranslation(-h, 0.0, 0.0)).multiply(proj);
*/
// Compute camera transformation matrices
left.tranform = [-worldFactor * HMD.interpupillaryDistance / 2, 0.0, 0.0];
right.tranform = [worldFactor * HMD.interpupillaryDistance / 2, 0.0, 0.0];

// Compute Viewport
left.viewport = [0, 0, HMD.hResolution / 2, HMD.vResolution];
right.viewport = [HMD.hResolution / 2, 0, HMD.hResolution / 2, HMD.vResolution];

// Distortion shader parameters
var lensShift = 4 * (HMD.hScreenSize / 4 - HMD.lensSeparationDistance / 2) / HMD.hScreenSize;
left.lensCenter = [lensShift, 0.0];
right.lensCenter = [-lensShift, 0.0];

function drawScene() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    perspectiveMatrix = makePerspective(45, 640.0 / 480.0, 0.1, 100.0);


    loadIdentity();

    mvTranslate([-0.0, 0.0, -6.0]);

    // Save the current matrix, then rotate before we draw.
    
    mvPushMatrix();
    mvRotate(cubeRotation, [1, 0, 1]);
    mvTranslate(left.tranform);
    gl.viewport(left.viewport[0], left.viewport[1], left.viewport[2], left.viewport[3]);

    draw();

    loadIdentity();
    mvTranslate([-0.0, 0.0, -6.0]);
    mvPushMatrix();
    mvTranslate(right.tranform);

    gl.viewport(right.viewport[0], right.viewport[1], right.viewport[2], right.viewport[3]);
    draw(true);

}

function draw(flag) {
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, cubeTexture);

    


    gl.uniform1i(this.$SphericalRenderer4.samplerUniform, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.$SphericalRenderer14);
    gl.vertexAttribPointer(vertexPositionAttribute, this.$SphericalRenderer14.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.$SphericalRenderer13);
    gl.vertexAttribPointer(textureCoordAttribute, this.$SphericalRenderer13.itemSize, gl.FLOAT, false, 0, 0);
    
    if(flag){
      tmpBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tmpBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(fa), gl.STATIC_DRAW);
      tmpBuffer.itemSize = 1;
      tmpBuffer.numItems = fa.length;
    }
    else gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.$SphericalRenderer15);
    gl.uniformMatrix4fv(this.$SphericalRenderer4.pMatrixUniform, false, perspectiveMatrix.flatten());
    gl.uniformMatrix4fv(this.$SphericalRenderer4.mvMatrixUniform, false, mvMatrix.flatten());
    
    var tmp=createFramebufferTexture(canvas.width,canvas.height);
    var program=new WebGLProgram(gl,vertexShader,fragmentShader);
    
    gl.bindFramebuffer(gl.FREAMEBUFFER,tmp.fbo);
    gl.uniform2f(program.scale,1.0,1.0)
    gl.uniform2f(program.scaleIn,1.0,1.0)
    gl.uniform2f(program.lensCenter,0.0,0.0)
    gl.uniform4f(program.hmdWarpParam,1.0,0.0,0.0,0.0)
    gl.uniform4f(program.chromAbParam,1.0,0.0,0.0,0.0);
    var vertices = new Float32Array([
        -1, -1, 0, 1,  1, -1, 1, 1,  -1, 1, 0, 0,
        -1, 1, 0, 0,  1, -1, 1, 1,  1, 1, 1, 0
      ]);
    _vertexBuffer = gl.createBuffer(),
    gl.bindBuffer(gl.ARRAY_BUFFER, _vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var floatSize = Float32Array.BYTES_PER_ELEMENT;
    var vertSize = 4 * floatSize;
    gl.enableVertexAttribArray(program.attribute.pos);
    gl.vertexAttribPointer(program.attribute.pos, 2, gl.FLOAT, false, vertSize , 0 * floatSize);
    gl.enableVertexAttribArray(program.attribute.uv);
    gl.vertexAttribPointer(program.attribute.uv, 2, gl.FLOAT, false, vertSize, 2 * floatSize);
    
    if(flag)  gl.drawElements(gl.TRIANGLES, tmpBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    else gl.drawElements(gl.TRIANGLES, this.$SphericalRenderer15.numItems, gl.UNSIGNED_SHORT, 0);
}

function initShaders() {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }

    gl.useProgram(shaderProgram);
    this.$SphericalRenderer4 = shaderProgram;

    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
    textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
    gl.enableVertexAttribArray(textureCoordAttribute);
    this.$SphericalRenderer4.pMatrixUniform = gl.getUniformLocation(this.$SphericalRenderer4, 'uPMatrix');
    this.$SphericalRenderer4.mvMatrixUniform = gl.getUniformLocation(this.$SphericalRenderer4, 'uMVMatrix');
    this.$SphericalRenderer4.samplerUniform = gl.getUniformLocation(this.$SphericalRenderer4, 'uSampler');
}


function getShader(gl, id) {
    var shaderScript = document.getElementById(id);

    if (!shaderScript) {
        return null;
    }

    var theSource = "";
    var currentChild = shaderScript.firstChild;

    while (currentChild) {
        if (currentChild.nodeType == 3) {
            theSource += currentChild.textContent;
        }

        currentChild = currentChild.nextSibling;
    }
    var shader;

    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null; // Unknown shader type
    }

    gl.shaderSource(shader, theSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}


//
// Matrix utility functions
//

function loadIdentity() {
    mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
    mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
    multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms() {
    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}

var mvMatrixStack = [];

function mvPushMatrix(m) {
    if (m) {
        mvMatrixStack.push(m.dup());
        mvMatrix = m.dup();
    } else {
        mvMatrixStack.push(mvMatrix.dup());
    }
}

function mvPopMatrix() {
    if (!mvMatrixStack.length) {
        throw ("Can't pop from an empty matrix stack.");
    }

    mvMatrix = mvMatrixStack.pop();
    return mvMatrix;
}

function mvRotate(angle, v) {
    var inRadians = angle * Math.PI / 180.0;

    var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
    multMatrix(m);
}
