function initShaders(gl,vshader,fshader){
    var program = createProgram(gl,vshader,fshader);
    if(!program){
        console.log('Failed to create program');
        return false;
    }

    gl.useProgram(program);
    gl.program = program;

    return true;
}

function createProgram(gl,vshader,fshader){
    var vertexShader = loadShader(gl,gl.VERTEX_SHADER,vshader);
    var fragmentShader = loadShader(gl,gl.FRAGMENT_SHADER,fshader);
    if(!vertexShader || !fragmentShader){
        return null;
    }

    var program = gl.createProgram();
    if(!program){
        return null;
    }

    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);

    gl.linkProgram(program);

    var linked = gl.getProgramParameter(program,gl.LINK_STATUS);
    if(!linked){
        var error = gl.getProgramInfoLog(program);
        console.log('Failed to link program: ' + error);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        return null;
    }
    return program;
}

function loadShader(gl,type,source){
    var shader = gl.createShader(type);
    if(shader == null){
        console.log('unable to create shader');
        return null;
    }

    gl.shaderSource(shader,source);

    gl.compileShader(shader);

    // Check the result of compilation
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log('Failed to compile shader: ' + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function getWebGLContext(canvas,opt_debug){
    var gl = WebGLUtils.setupWebGL(canvas);
    if(!gl) return null;

    if(arguments.length<2 || opt_debug){
        gl = WebGLDebugUtils.makeDebugContext(gl);
    }

    return gl;
}