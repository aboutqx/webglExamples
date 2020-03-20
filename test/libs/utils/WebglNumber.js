// stolen there https://github.com/mattdesl/gl-constants thanks @mattdesl ^^
module.exports = {
	0: 'NONE',
	1: 'ONE',
	2: 'LINE_LOOP',
	3: 'LINE_STRIP',
	4: 'TRIANGLES',
	5: 'TRIANGLE_STRIP',
	6: 'TRIANGLE_FAN',
	256: 'DEPTH_BUFFER_BIT',
	512: 'NEVER',
	513: 'LESS',
	514: 'EQUAL',
	515: 'LEQUAL',
	516: 'GREATER',
	517: 'NOTEQUAL',
	518: 'GEQUAL',
	519: 'ALWAYS',
	768: 'SRC_COLOR',
	769: 'ONE_MINUS_SRC_COLOR',
	770: 'SRC_ALPHA',
	771: 'ONE_MINUS_SRC_ALPHA',
	772: 'DST_ALPHA',
	773: 'ONE_MINUS_DST_ALPHA',
	774: 'DST_COLOR',
	775: 'ONE_MINUS_DST_COLOR',
	776: 'SRC_ALPHA_SATURATE',
	1024: 'STENCIL_BUFFER_BIT',
	1028: 'FRONT',
	1029: 'BACK',
	1032: 'FRONT_AND_BACK',
	1280: 'INVALID_ENUM',
	1281: 'INVALID_VALUE',
	1282: 'INVALID_OPERATION',
	1285: 'OUT_OF_MEMORY',
	1286: 'INVALID_FRAMEBUFFER_OPERATION',
	2304: 'CW',
	2305: 'CCW',
	2849: 'LINE_WIDTH',
	2884: 'CULL_FACE',
	2885: 'CULL_FACE_MODE',
	2886: 'FRONT_FACE',
	2928: 'DEPTH_RANGE',
	2929: 'DEPTH_TEST',
	2930: 'DEPTH_WRITEMASK',
	2931: 'DEPTH_CLEAR_VALUE',
	2932: 'DEPTH_FUNC',
	2960: 'STENCIL_TEST',
	2961: 'STENCIL_CLEAR_VALUE',
	2962: 'STENCIL_FUNC',
	2963: 'STENCIL_VALUE_MASK',
	2964: 'STENCIL_FAIL',
	2965: 'STENCIL_PASS_DEPTH_FAIL',
	2966: 'STENCIL_PASS_DEPTH_PASS',
	2967: 'STENCIL_REF',
	2968: 'STENCIL_WRITEMASK',
	2978: 'VIEWPORT',
	3024: 'DITHER',
	3042: 'BLEND',
	3088: 'SCISSOR_BOX',
	3089: 'SCISSOR_TEST',
	3106: 'COLOR_CLEAR_VALUE',
	3107: 'COLOR_WRITEMASK',
	3317: 'UNPACK_ALIGNMENT',
	3333: 'PACK_ALIGNMENT',
	3379: 'MAX_TEXTURE_SIZE',
	3386: 'MAX_VIEWPORT_DIMS',
	3408: 'SUBPIXEL_BITS',
	3410: 'RED_BITS',
	3411: 'GREEN_BITS',
	3412: 'BLUE_BITS',
	3413: 'ALPHA_BITS',
	3414: 'DEPTH_BITS',
	3415: 'STENCIL_BITS',
	3553: 'TEXTURE_2D',
	4352: 'DONT_CARE',
	4353: 'FASTEST',
	4354: 'NICEST',
	5120: 'BYTE',
	5121: 'UNSIGNED_BYTE',
	5122: 'SHORT',
	5123: 'UNSIGNED_SHORT',
	5124: 'INT',
	5125: 'UNSIGNED_INT',
	5126: 'FLOAT',
	5386: 'INVERT',
	5890: 'TEXTURE',
	6401: 'STENCIL_INDEX',
	6402: 'DEPTH_COMPONENT',
	6403: 'RED',
	6406: 'ALPHA',
	6407: 'RGB',
	6408: 'RGBA',
	6409: 'LUMINANCE',
	6410: 'LUMINANCE_ALPHA',
	7680: 'KEEP',
	7681: 'REPLACE',
	7682: 'INCR',
	7683: 'DECR',
	7936: 'VENDOR',
	7937: 'RENDERER',
	7938: 'VERSION',
	9728: 'NEAREST',
	9729: 'LINEAR',
	9984: 'NEAREST_MIPMAP_NEAREST',
	9985: 'LINEAR_MIPMAP_NEAREST',
	9986: 'NEAREST_MIPMAP_LINEAR',
	9987: 'LINEAR_MIPMAP_LINEAR',
	10240: 'TEXTURE_MAG_FILTER',
	10241: 'TEXTURE_MIN_FILTER',
	10242: 'TEXTURE_WRAP_S',
	10243: 'TEXTURE_WRAP_T',
	10497: 'REPEAT',
	10752: 'POLYGON_OFFSET_UNITS',
	16384: 'COLOR_BUFFER_BIT',
	32769: 'CONSTANT_COLOR',
	32770: 'ONE_MINUS_CONSTANT_COLOR',
	32771: 'CONSTANT_ALPHA',
	32772: 'ONE_MINUS_CONSTANT_ALPHA',
	32773: 'BLEND_COLOR',
	32774: 'FUNC_ADD',
	32777: 'BLEND_EQUATION_RGB',
	32778: 'FUNC_SUBTRACT',
	32779: 'FUNC_REVERSE_SUBTRACT',
	32819: 'UNSIGNED_SHORT_4_4_4_4',
	32820: 'UNSIGNED_SHORT_5_5_5_1',
	32823: 'POLYGON_OFFSET_FILL',
	32824: 'POLYGON_OFFSET_FACTOR',
	32854: 'RGBA4',
	32855: 'RGB5_A1',
	32873: 'TEXTURE_BINDING_2D',
	32926: 'SAMPLE_ALPHA_TO_COVERAGE',
	32928: 'SAMPLE_COVERAGE',
	32936: 'SAMPLE_BUFFERS',
	32937: 'SAMPLES',
	32938: 'SAMPLE_COVERAGE_VALUE',
	32939: 'SAMPLE_COVERAGE_INVERT',
	32968: 'BLEND_DST_RGB',
	32969: 'BLEND_SRC_RGB',
	32970: 'BLEND_DST_ALPHA',
	32971: 'BLEND_SRC_ALPHA',
	33071: 'CLAMP_TO_EDGE',
	33170: 'GENERATE_MIPMAP_HINT',
	33189: 'DEPTH_COMPONENT16',
	33306: 'DEPTH_STENCIL_ATTACHMENT',
	33321: 'R8',
	33635: 'UNSIGNED_SHORT_5_6_5',
	33648: 'MIRRORED_REPEAT',
	33901: 'ALIASED_POINT_SIZE_RANGE',
	33902: 'ALIASED_LINE_WIDTH_RANGE',
	33984: 'TEXTURE0',
	33985: 'TEXTURE1',
	33986: 'TEXTURE2',
	33987: 'TEXTURE3',
	33988: 'TEXTURE4',
	33989: 'TEXTURE5',
	33990: 'TEXTURE6',
	33991: 'TEXTURE7',
	33992: 'TEXTURE8',
	33993: 'TEXTURE9',
	33994: 'TEXTURE10',
	33995: 'TEXTURE11',
	33996: 'TEXTURE12',
	33997: 'TEXTURE13',
	33998: 'TEXTURE14',
	33999: 'TEXTURE15',
	34000: 'TEXTURE16',
	34001: 'TEXTURE17',
	34002: 'TEXTURE18',
	34003: 'TEXTURE19',
	34004: 'TEXTURE20',
	34005: 'TEXTURE21',
	34006: 'TEXTURE22',
	34007: 'TEXTURE23',
	34008: 'TEXTURE24',
	34009: 'TEXTURE25',
	34010: 'TEXTURE26',
	34011: 'TEXTURE27',
	34012: 'TEXTURE28',
	34013: 'TEXTURE29',
	34014: 'TEXTURE30',
	34015: 'TEXTURE31',
	34016: 'ACTIVE_TEXTURE',
	34024: 'MAX_RENDERBUFFER_SIZE',
	34041: 'DEPTH_STENCIL',
	34055: 'INCR_WRAP',
	34056: 'DECR_WRAP',
	34067: 'TEXTURE_CUBE_MAP',
	34068: 'TEXTURE_BINDING_CUBE_MAP',
	34069: 'TEXTURE_CUBE_MAP_POSITIVE_X',
	34070: 'TEXTURE_CUBE_MAP_NEGATIVE_X',
	34071: 'TEXTURE_CUBE_MAP_POSITIVE_Y',
	34072: 'TEXTURE_CUBE_MAP_NEGATIVE_Y',
	34073: 'TEXTURE_CUBE_MAP_POSITIVE_Z',
	34074: 'TEXTURE_CUBE_MAP_NEGATIVE_Z',
	34076: 'MAX_CUBE_MAP_TEXTURE_SIZE',
	34338: 'VERTEX_ATTRIB_ARRAY_ENABLED',
	34339: 'VERTEX_ATTRIB_ARRAY_SIZE',
	34340: 'VERTEX_ATTRIB_ARRAY_STRIDE',
	34341: 'VERTEX_ATTRIB_ARRAY_TYPE',
	34342: 'CURRENT_VERTEX_ATTRIB',
	34373: 'VERTEX_ATTRIB_ARRAY_POINTER',
	34466: 'NUM_COMPRESSED_TEXTURE_FORMATS',
	34467: 'COMPRESSED_TEXTURE_FORMATS',
	34660: 'BUFFER_SIZE',
	34661: 'BUFFER_USAGE',
	34816: 'STENCIL_BACK_FUNC',
	34817: 'STENCIL_BACK_FAIL',
	34818: 'STENCIL_BACK_PASS_DEPTH_FAIL',
	34819: 'STENCIL_BACK_PASS_DEPTH_PASS',
	34842: 'RGBA16F',
	34877: 'BLEND_EQUATION_ALPHA',
	34921: 'MAX_VERTEX_ATTRIBS',
	34922: 'VERTEX_ATTRIB_ARRAY_NORMALIZED',
	34930: 'MAX_TEXTURE_IMAGE_UNITS',
	34962: 'ARRAY_BUFFER',
	34963: 'ELEMENT_ARRAY_BUFFER',
	34964: 'ARRAY_BUFFER_BINDING',
	34965: 'ELEMENT_ARRAY_BUFFER_BINDING',
	34975: 'VERTEX_ATTRIB_ARRAY_BUFFER_BINDING',
	35040: 'STREAM_DRAW',
	35044: 'STATIC_DRAW',
	35048: 'DYNAMIC_DRAW',
	35632: 'FRAGMENT_SHADER',
	35633: 'VERTEX_SHADER',
	35660: 'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
	35661: 'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
	35663: 'SHADER_TYPE',
	35664: 'FLOAT_VEC2',
	35665: 'FLOAT_VEC3',
	35666: 'FLOAT_VEC4',
	35667: 'INT_VEC2',
	35668: 'INT_VEC3',
	35669: 'INT_VEC4',
	35670: 'BOOL',
	35671: 'BOOL_VEC2',
	35672: 'BOOL_VEC3',
	35673: 'BOOL_VEC4',
	35674: 'FLOAT_MAT2',
	35675: 'FLOAT_MAT3',
	35676: 'FLOAT_MAT4',
	35678: 'SAMPLER_2D',
	35680: 'SAMPLER_CUBE',
	35712: 'DELETE_STATUS',
	35713: 'COMPILE_STATUS',
	35714: 'LINK_STATUS',
	35715: 'VALIDATE_STATUS',
	35716: 'INFO_LOG_LENGTH',
	35717: 'ATTACHED_SHADERS',
	35718: 'ACTIVE_UNIFORMS',
	35719: 'ACTIVE_UNIFORM_MAX_LENGTH',
	35720: 'SHADER_SOURCE_LENGTH',
	35721: 'ACTIVE_ATTRIBUTES',
	35722: 'ACTIVE_ATTRIBUTE_MAX_LENGTH',
	35724: 'SHADING_LANGUAGE_VERSION',
	35725: 'CURRENT_PROGRAM',
	36003: 'STENCIL_BACK_REF',
	36004: 'STENCIL_BACK_VALUE_MASK',
	36005: 'STENCIL_BACK_WRITEMASK',
	36006: 'FRAMEBUFFER_BINDING',
	36007: 'RENDERBUFFER_BINDING',
	36048: 'FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE',
	36049: 'FRAMEBUFFER_ATTACHMENT_OBJECT_NAME',
	36050: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL',
	36051: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE',
	36053: 'FRAMEBUFFER_COMPLETE',
	36054: 'FRAMEBUFFER_INCOMPLETE_ATTACHMENT',
	36055: 'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT',
	36057: 'FRAMEBUFFER_INCOMPLETE_DIMENSIONS',
	36061: 'FRAMEBUFFER_UNSUPPORTED',
	36064: 'COLOR_ATTACHMENT0',
	36096: 'DEPTH_ATTACHMENT',
	36128: 'STENCIL_ATTACHMENT',
	36160: 'FRAMEBUFFER',
	36161: 'RENDERBUFFER',
	36162: 'RENDERBUFFER_WIDTH',
	36163: 'RENDERBUFFER_HEIGHT',
	36164: 'RENDERBUFFER_INTERNAL_FORMAT',
	36168: 'STENCIL_INDEX8',
	36176: 'RENDERBUFFER_RED_SIZE',
	36177: 'RENDERBUFFER_GREEN_SIZE',
	36178: 'RENDERBUFFER_BLUE_SIZE',
	36179: 'RENDERBUFFER_ALPHA_SIZE',
	36180: 'RENDERBUFFER_DEPTH_SIZE',
	36181: 'RENDERBUFFER_STENCIL_SIZE',
	36194: 'RGB565',
	36336: 'LOW_FLOAT',
	36337: 'MEDIUM_FLOAT',
	36338: 'HIGH_FLOAT',
	36339: 'LOW_INT',
	36340: 'MEDIUM_INT',
	36341: 'HIGH_INT',
	36346: 'SHADER_COMPILER',
	36347: 'MAX_VERTEX_UNIFORM_VECTORS',
	36348: 'MAX_VARYING_VECTORS',
	36349: 'MAX_FRAGMENT_UNIFORM_VECTORS',
	37440: 'UNPACK_FLIP_Y_WEBGL',
	37441: 'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
	37442: 'CONTEXT_LOST_WEBGL',
	37443: 'UNPACK_COLORSPACE_CONVERSION_WEBGL',
	37444: 'BROWSER_DEFAULT_WEBGL'
};
