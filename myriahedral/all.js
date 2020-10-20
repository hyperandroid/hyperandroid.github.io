require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EPSILON = .00001;
/**
 * matrix4
 *
 * [ a  b  c  0 ]
 * [ d  e  f  0 ]
 * [ g  h  i  0 ]
 * [ tx ty tz 0 ]
 */
class Matrix4 {
    static perspective(out, verticalFOVInRadians, aspect, zNear, zFar) {
        const f = 1.0 / Math.tan(verticalFOVInRadians / 2.0);
        out[0] = f / aspect;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = f;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = -1.0;
        out[12] = 0;
        out[13] = 0;
        out[15] = 0;
        if (zFar !== Infinity) {
            const nf = 1 / (zNear - zFar);
            out[10] = (zFar + zNear) * nf;
            out[14] = 2.0 * zFar * zNear * nf;
        }
        else {
            out[10] = -1.0;
            out[14] = -2.0 * zNear;
        }
        return out;
    }
    static ortho(out, left, right, top, bottom, near, far) {
        const lr = 1.0 / (left - right);
        const bt = 1.0 / (bottom - top);
        const nf = 1.0 / (near - far);
        out[0] = -2.0 * lr;
        out[1] = 0.0;
        out[2] = 0.0;
        out[3] = 0.0;
        out[4] = 0.0;
        out[5] = -2.0 * bt;
        out[6] = 0.0;
        out[7] = 0.0;
        out[8] = 0.0;
        out[9] = 0.0;
        out[10] = 2.0 * nf;
        out[11] = 0.0;
        out[12] = (left + right) * lr;
        out[13] = (top + bottom) * bt;
        out[14] = (far + near) * nf;
        out[15] = 1.0;
        return out;
    }
    static mul(out, a, b) {
        const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
        const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
        let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return out;
    }
    static inverse(out, a) {
    }
    static clone(a) {
        const b = Matrix4.create();
        return Matrix4.copy(b, a);
    }
    static copy(out, m) {
        out.set(m);
        return out;
    }
    static identity(out, offset) {
        offset = offset || 0;
        out[offset + 0] = 1.0;
        out[offset + 1] = 0.0;
        out[offset + 2] = 0.0;
        out[offset + 3] = 0.0;
        out[offset + 4] = 0.0;
        out[offset + 5] = 1.0;
        out[offset + 6] = 0.0;
        out[offset + 7] = 0.0;
        out[offset + 8] = 0.0;
        out[offset + 9] = 0.0;
        out[offset + 10] = 1.0;
        out[offset + 11] = 0.0;
        out[offset + 12] = 0.0;
        out[offset + 13] = 0.0;
        out[offset + 14] = 0.0;
        out[offset + 15] = 1.0;
        return out;
    }
    static viewMatrix(out, min) {
        Matrix4.identity(out);
        out[0] = min[0];
        out[1] = min[1];
        out[2] = min[2];
        out[4] = min[4];
        out[5] = min[5];
        out[6] = min[6];
        out[8] = min[8];
        out[9] = min[9];
        out[10] = min[10];
        return out;
    }
    static lookAt(out, eye, lookAt, up) {
        const eyex = eye[0];
        const eyey = eye[1];
        const eyez = eye[2];
        const upx = up[0];
        const upy = up[1];
        const upz = up[2];
        const lookAtX = lookAt[0];
        const lookAtY = lookAt[1];
        const lookAtZ = lookAt[2];
        // eye and lookAt are mostly the same.
        if (Math.abs(eyex - lookAtX) < EPSILON &&
            Math.abs(eyey - lookAtY) < EPSILON &&
            Math.abs(eyez - lookAtZ) < EPSILON) {
            return Matrix4.identity(out);
        }
        let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
        // forward vector
        z0 = eyex - lookAtX;
        z1 = eyey - lookAtY;
        z2 = eyez - lookAtZ;
        // normalized
        len = 1 / Math.hypot(z0, z1, z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;
        // cross vector between up and forward (right vector)
        x0 = upy * z2 - upz * z1;
        x1 = upz * z0 - upx * z2;
        x2 = upx * z1 - upy * z0;
        len = Math.hypot(x0, x1, x2);
        if (!len) {
            x0 = 0.0;
            x1 = 0.0;
            x2 = 0.0;
        }
        else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }
        // cross right/forward (up)
        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;
        len = Math.hypot(y0, y1, y2);
        if (len === 0) {
            y0 = 0.0;
            y1 = 0.0;
            y2 = 0.0;
        }
        else {
            len = 1.0 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }
        out[0] = x0;
        out[1] = y0;
        out[2] = z0;
        out[3] = 0.0;
        out[4] = x1;
        out[5] = y1;
        out[6] = z1;
        out[7] = 0.0;
        out[8] = x2;
        out[9] = y2;
        out[10] = z2;
        out[11] = 0.0;
        out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
        out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
        out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
        out[15] = 1.0;
        return out;
    }
    static transpose(out, m) {
        if (out === m) {
            const a01 = m[1], a02 = m[2], a03 = m[3];
            const a12 = m[6], a13 = m[7];
            const a23 = m[11];
            out[1] = m[4];
            out[2] = m[8];
            out[3] = m[12];
            out[4] = a01;
            out[6] = m[9];
            out[7] = m[13];
            out[8] = a02;
            out[9] = a12;
            out[11] = m[14];
            out[12] = a03;
            out[13] = a13;
            out[14] = a23;
        }
        else {
            out[0] = m[0];
            out[1] = m[4];
            out[2] = m[8];
            out[3] = m[12];
            out[4] = m[1];
            out[5] = m[5];
            out[6] = m[9];
            out[7] = m[13];
            out[8] = m[2];
            out[9] = m[6];
            out[10] = m[10];
            out[11] = m[14];
            out[12] = m[3];
            out[13] = m[7];
            out[14] = m[11];
            out[15] = m[15];
        }
        return out;
    }
    static translate(out, m, v) {
        const x = v[0], y = v[1], z = v[2];
        if (m === out) {
            out[12] = m[0] * x + m[4] * y + m[8] * z + m[12];
            out[13] = m[1] * x + m[5] * y + m[9] * z + m[13];
            out[14] = m[2] * x + m[6] * y + m[10] * z + m[14];
            out[15] = m[3] * x + m[7] * y + m[11] * z + m[15];
        }
        else {
            const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3];
            const a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7];
            const a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];
            out[0] = a00;
            out[1] = a01;
            out[2] = a02;
            out[3] = a03;
            out[4] = a10;
            out[5] = a11;
            out[6] = a12;
            out[7] = a13;
            out[8] = a20;
            out[9] = a21;
            out[10] = a22;
            out[11] = a23;
            out[12] = a00 * x + a10 * y + a20 * z + m[12];
            out[13] = a01 * x + a11 * y + a21 * z + m[13];
            out[14] = a02 * x + a12 * y + a22 * z + m[14];
            out[15] = a03 * x + a13 * y + a23 * z + m[15];
        }
        return out;
    }
    static rotate(out, m, euler) {
        const xy = euler[2];
        const xz = euler[1];
        const yz = euler[0];
        const sxy = Math.sin(xy);
        const sxz = Math.sin(xz);
        const syz = Math.sin(yz);
        const cxy = Math.cos(xy);
        const cxz = Math.cos(xz);
        const cyz = Math.cos(yz);
        m0[0] = cxz * cxy;
        m0[1] = -cxz * sxy;
        m0[2] = sxz;
        m0[3] = 0;
        m0[4] = syz * sxz * cxy + sxy * cyz;
        m0[5] = cyz * cxy - syz * sxz * sxy;
        m0[6] = -syz * cxz;
        m0[7] = 0;
        m0[8] = syz * sxy - cyz * sxz * cxy;
        m0[9] = cyz * sxz * sxy + syz * cxy;
        m0[10] = cyz * cxz;
        m0[11] = 0;
        m0[12] = 0;
        m0[13] = 0;
        m0[14] = 0;
        m0[15] = 1;
        Matrix4.mul(out, m, m0);
    }
    /**
     * scale matrix m by vector v.
     */
    static scale(out, m, v) {
        const x = v[0], y = v[1], z = v[2];
        out[0] = m[0] * x;
        out[1] = m[1] * x;
        out[2] = m[2] * x;
        out[3] = m[3] * x;
        out[4] = m[4] * y;
        out[5] = m[5] * y;
        out[6] = m[6] * y;
        out[7] = m[7] * y;
        out[8] = m[8] * z;
        out[9] = m[9] * z;
        out[10] = m[10] * z;
        out[11] = m[11] * z;
        out[12] = m[12];
        out[13] = m[13];
        out[14] = m[14];
        out[15] = m[15];
        return out;
    }
    static create() {
        const ret = new Float32Array(16);
        ret[0] = 1.0;
        ret[5] = 1.0;
        ret[10] = 1.0;
        ret[15] = 1.0;
        return ret;
    }
    static modelMatrix(out, position, rotation, scale) {
        Matrix4.identity(out);
        Matrix4.translate(out, out, position);
        Matrix4.rotate(out, out, rotation);
        Matrix4.scale(out, out, scale);
        return out;
    }
}
exports.default = Matrix4;
const m0 = Matrix4.create();

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = require("./Vector3");
/**
 * a quaternion representation would be a float[4], where
 * 0,1,2 = i,j,k
 * 3 = w
 */
const w = 3;
const i = 0;
const j = 1;
const k = 2;
const _v0 = Vector3_1.default.create();
const _v1 = Vector3_1.default.create();
const _v2 = Vector3_1.default.create();
const _v3 = Vector3_1.default.create();
class Quaternion {
    /**
     * return a default quaternion
     */
    static create() {
        const r = new Float32Array(4);
        r[w] = 1.0;
        return r;
    }
    static createFromAxisAndAngle(axis, theta) {
        return Quaternion.fromAxisAndAngle(Quaternion.create(), axis, theta);
    }
    static fromAxisAndAngle(out, axis, theta) {
        const s = Math.sin(theta / 2);
        out[i] = axis[0] * s;
        out[j] = axis[1] * s;
        out[k] = axis[2] * s;
        out[w] = Math.cos(theta / 2);
        return out;
    }
    static identity(out) {
        out[i] = 0.0;
        out[j] = 0.0;
        out[k] = 0.0;
        out[w] = 1.0;
        return out;
    }
    static fromPoint(out, p) {
        out[i] = p[0];
        out[j] = p[1];
        out[k] = p[2];
        out[w] = 0.0;
        return out;
    }
    static conjugate(out, q) {
        out[i] = q[i] * -1.0;
        out[j] = q[j] * -1.0;
        out[k] = q[k] * -1.0;
        out[w] = q[w];
        return out;
    }
    static invert(out, q) {
        const dot = Quaternion.magnitude(q);
        const invdot = dot === 0 ? 0 : 1.0 / dot;
        out[i] = q[i] * -invdot;
        out[j] = q[j] * -invdot;
        out[k] = q[k] * -invdot;
        out[w] = q[w] * invdot;
        return out;
    }
    static dot(q0, q1) {
        return q0[w] * q1[w] + q0[i] * q1[i] + q0[j] * q1[j] + q0[k] * q1[k];
    }
    static squaredLength(q) {
        return q[w] * q[w] + q[i] * q[i] + q[j] * q[j] + q[k] * q[k];
    }
    static magnitude(q) {
        return Math.sqrt(Quaternion.squaredLength(q));
    }
    static normalize(out, q) {
        const m = Quaternion.magnitude(q);
        if (m !== 0) {
            const im = 1.0 / m;
            out[i] = q[i] * im;
            out[j] = q[j] * im;
            out[k] = q[k] * im;
            out[w] = q[w] * im;
        }
        return out;
    }
    /**
     *    q.w²+q.x²+q.y²+q.z²    0                        0                        0
     *    0                    q.w²+q.x²-q.y²-q.z²        2*q.x*q.y - 2*q.w*q.z    2*q.x*q.z + 2*q.w*q.y
     *    0                    2*q.x*q.y + 2*q.w*q.z    q.w²-q.x² + q.y²-q.z²    2*q.y*q.z - 2*q.w*q.x
     *    0                    2*q.x*q.z - 2*q.w*q.y    2*q.y*q.z + 2*q.w*q.x    q.w²-q.x²-q.y²+q.z²
     */
    static toMatrix(m, q) {
        const w2 = q[w] * q[w];
        const x = q[i];
        const x2 = x * x;
        const y = q[j];
        const y2 = y * y;
        const z = q[k];
        const z2 = z * z;
        // row 0
        m[0] = w2 + x2 + y2 + z2;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        // row 1
        m[4] = 0;
        m[5] = w2 + x2 - y2 - z2;
        m[6] = 2 * x * y - 2 * w * z;
        m[7] = 2 * x * z + 2 * w * y;
        // row 2
        m[8] = 0;
        m[9] = 2 * x * y + 2 * w * z;
        m[10] = w2 - x2 + y2 - z2;
        m[11] = 2 * y * z - 2 * w * x;
        // row 3
        m[12] = 0;
        m[13] = 2 * x * z - 2 * w * y;
        m[14] = 2 * y * z + 2 * w * x;
        m[15] = w2 - x2 - y2 + z2;
        return m;
    }
    /**
     * rotate point v by quaternion q.
     * store the result a a quaternion in out.
     */
    static rotate(q, v) {
        return Quaternion.mul(_q0, Quaternion.mul(_q0, q, Quaternion.fromPoint(_q1, v)), Quaternion.conjugate(_q2, q));
    }
    static clone(out, q) {
        out[i] = q[i];
        out[j] = q[j];
        out[k] = q[k];
        out[w] = q[w];
        return out;
    }
    static toJSON(q) {
        return {
            w: q[w],
            v: {
                x: q[i],
                y: q[j],
                z: q[k],
            }
        };
    }
    static add(out, a, b) {
        out[i] = a[i] + b[i];
        out[j] = a[j] + b[j];
        out[k] = a[k] + b[k];
        out[w] = a[w] + b[w];
        return out;
    }
    static sub(out, a, b) {
        out[i] = a[i] - b[i];
        out[j] = a[j] - b[j];
        out[k] = a[k] - b[k];
        out[w] = a[w] - b[w];
        return out;
    }
    static mul(out, a, b) {
        const bw = b[w];
        const bx = b[i];
        const by = b[j];
        const bz = b[k];
        const aw = a[w];
        const ax = a[i];
        const ay = a[j];
        const az = a[k];
        out[i] = aw * bx + ax * bw + ay * bz - az * by;
        out[j] = aw * by - ax * bz + ay * bw + az * bx;
        out[k] = aw * bz + ax * by - ay * bx + az * bw;
        out[w] = aw * bw - ax * bx - ay * by - az * bz;
        return out;
    }
    static div(out, q1, q2) {
        // -q1.v X q2.v
        const v0 = Vector3_1.default.cross(_v0, Vector3_1.default.set(_v3, -q1[i], -q1[j], -q1[k]), q2 // just take first 3 coords: (x,y,z)
        );
        // q2.v * q1.w
        const v1 = Vector3_1.default.mul(_v1, q2, q1[w]);
        const v2 = Vector3_1.default.mul(_v2, q1, q2[w]);
        Vector3_1.default.add(_v3, Vector3_1.default.sub(_v3, v0, v1), v2);
        out[i] = _v3[i];
        out[j] = _v3[j];
        out[k] = _v3[k];
        out[w] = q1[w] * q2[w] + q1[i] * q2[i] + q1[j] * q2[j] + q1[k] * q2[k];
        return out;
    }
    static Test() {
        const p0 = Vector3_1.default.createFromCoords(1.0, 0.0, 0.0);
        const q0 = Quaternion.createFromAxisAndAngle(Vector3_1.default.createFromCoords(0.0, 1.0, 0.0), Math.PI / 4);
        const q1 = Quaternion.createFromAxisAndAngle(Vector3_1.default.createFromCoords(0.0, 0.0, 1.0), Math.PI / 4);
        const rp0 = Quaternion.rotate(q0, p0);
        console.log(Quaternion.toJSON(Quaternion.rotate(q1, rp0)));
        const q2 = Quaternion.mul(Quaternion.create(), q1, q0);
        console.log(Quaternion.toJSON(Quaternion.rotate(q2, p0)));
    }
}
exports.default = Quaternion;
const _q0 = Quaternion.create();
const _q1 = Quaternion.create();
const _q2 = Quaternion.create();

},{"./Vector3":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector3T = void 0;
const Cube_1 = require("../render/geometry/Cube");
class Vector3T {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.index = -1;
    }
    static create(a, offset) {
        return new Vector3T(a[offset], a[offset + 1], a[offset + 2]);
    }
    static createC(x, y, z) {
        return new Vector3T(x, y, z);
    }
    static normalize(b, offset, radius) {
        const x = b[offset];
        const y = b[offset + 1];
        const z = b[offset + 2];
        const l = Math.sqrt(x * x + y * y + z * z);
        if (l !== 0.0) {
            b[offset] = x / l * radius;
            b[offset + 1] = y / l * radius;
            b[offset + 2] = z / l * radius;
        }
    }
    static middle(v0, v1) {
        return Vector3T.createC(v0.x + (v1.x - v0.x) / 2., v0.y + (v1.y - v0.y) / 2., v0.z + (v1.z - v0.z) / 2.);
    }
    write(b) {
        b.push(this.x);
        b.push(this.y);
        b.push(this.z);
    }
}
exports.Vector3T = Vector3T;
class Sphere {
    constructor() {
    }
    tessellateFromCube(subdivisions) {
        const t = [];
        const v = Cube_1.CubeVertices;
        const index = Cube_1.CubeIndices;
        for (let i = 0; i < index.length; i++) {
            t.push(v[index[i] * 3]);
            t.push(v[index[i] * 3 + 1]);
            t.push(v[index[i] * 3 + 2]);
        }
        let data = this.subdivideTriangles(new Float32Array(t), 12, subdivisions);
        this.expand(data, 1);
        data = this.calculateUV(data);
        return data;
    }
    tessellateFromTetrahedron(subdivisions) {
        const P1 = Vector3T.createC(0.0, -1.0, 2.0);
        const P2 = Vector3T.createC(1.73205081, -1.0, -1.0);
        const P3 = Vector3T.createC(-1.73205081, -1.0, -1.0);
        const P4 = Vector3T.createC(0.0, 2.0, 0.0);
        const t = [];
        P1.write(t);
        P3.write(t);
        P2.write(t);
        P1.write(t);
        P4.write(t);
        P3.write(t);
        P1.write(t);
        P2.write(t);
        P4.write(t);
        P2.write(t);
        P3.write(t);
        P4.write(t);
        let data = this.subdivideTriangles(new Float32Array(t), 4, subdivisions);
        this.expand(data, 1);
        data = this.calculateUV(data);
        return data;
    }
    calculateUV(data) {
        const uv = new Float32Array(data.numTriangles * 3 * 2);
        let uvIndex = 0;
        for (let i = 0; i < data.numTriangles * 3; i++) {
            uv[uvIndex] = Math.atan2(data.vertices[i * 3], data.vertices[i * 3 + 2]);
            uv[uvIndex] = .5 + Math.atan2(data.vertices[i * 3], data.vertices[i * 3 + 2]) / (2 * Math.PI);
            uv[uvIndex + 1] = .5 - Math.asin(data.vertices[i * 3 + 1]) / Math.PI;
            uvIndex += 2;
        }
        for (let i = 0; i < data.numTriangles * 3; i += 3) {
            const u0 = uv[i * 2];
            const v0 = uv[i * 2 + 1];
            const u1 = uv[i * 2 + 2];
            const v1 = uv[i * 2 + 3];
            const u2 = uv[i * 2 + 4];
            const v2 = uv[i * 2 + 5];
            if (Math.abs(u0 - u1) > .5 || Math.abs(u2 - u0) > .5 || Math.abs(u2 - u1) > .5) {
                if (u0 < .5) {
                    uv[i * 2] += 1;
                }
                if (u1 < .5) {
                    uv[i * 2 + 2] += 1;
                }
                if (u2 < .5) {
                    uv[i * 2 + 4] += 1;
                }
            }
            if (Math.abs(v0 - v1) > .5 || Math.abs(v2 - v0) > .5 || Math.abs(v2 - v1) > .5) {
                if (v0 < .5) {
                    uv[i * 2 + 1] += 1;
                }
                if (v1 < .5) {
                    uv[i * 2 + 3] += 1;
                }
                if (v2 < .5) {
                    uv[i * 2 + 5] += 1;
                }
            }
        }
        return Object.assign(Object.assign({}, data), { uv, normals: data.vertices });
    }
    expand(data, radius) {
        for (let i = 0; i < data.numTriangles * 3; i++) {
            Vector3T.normalize(data.vertices, i * 3, radius);
        }
    }
    subdivideTriangles(data, numTriangles, subdivisions) {
        for (let i = 0; i < subdivisions; i++) {
            data = this.subdivideTrianglesImpl(data, numTriangles);
            numTriangles = numTriangles * 4;
        }
        return {
            vertices: data,
            numTriangles,
            uv: null,
            index: null,
            normals: null,
        };
    }
    /**
     * Subdivide numTriangles.
     * data is at least numTriangles*3 length
     * @param data
     * @param numTriangles
     */
    subdivideTrianglesImpl(data, numTriangles) {
        if (data.length < numTriangles * 3) {
            throw new Error(`Not enough input data`);
        }
        const newBuffer = [];
        for (let i = 0; i < numTriangles; i++) {
            const offset = i * 9; // each tri has 3 vertices of xyz
            const v0 = Vector3T.create(data, offset);
            const v1 = Vector3T.create(data, offset + 3);
            const v2 = Vector3T.create(data, offset + 6);
            const mv0v1 = Vector3T.middle(v0, v1);
            const mv1v2 = Vector3T.middle(v1, v2);
            const mv2v0 = Vector3T.middle(v2, v0);
            v0.write(newBuffer);
            mv0v1.write(newBuffer);
            mv2v0.write(newBuffer);
            mv0v1.write(newBuffer);
            v1.write(newBuffer);
            mv1v2.write(newBuffer);
            mv1v2.write(newBuffer);
            mv2v0.write(newBuffer);
            mv0v1.write(newBuffer);
            mv2v0.write(newBuffer);
            mv1v2.write(newBuffer);
            v2.write(newBuffer);
        }
        return new Float32Array(newBuffer);
    }
    tessellateFromTetrahedronRec(subdivisions) {
        const p1 = Vector3T.createC(0.0, -1.0, 2.0);
        const p2 = Vector3T.createC(1.73205081, -1.0, -1.0);
        const p3 = Vector3T.createC(-1.73205081, -1.0, -1.0);
        const p4 = Vector3T.createC(0.0, 2.0, 0.0);
        const store = [];
        const index = [];
        this.subdivideTrianglesR(store, index, subdivisions, p1, p3, p2);
        this.subdivideTrianglesR(store, index, subdivisions, p1, p4, p3);
        this.subdivideTrianglesR(store, index, subdivisions, p1, p2, p4);
        this.subdivideTrianglesR(store, index, subdivisions, p2, p3, p4);
        const vertices = new Float32Array(store.length * 3);
        store.forEach((v, i) => {
            const l = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
            vertices[i * 3] = v.x / l;
            vertices[i * 3 + 1] = v.y / l;
            vertices[i * 3 + 2] = v.z / l;
        });
        let data = {
            vertices,
            index: new Uint16Array(index),
            uv: null,
            normals: vertices,
            numTriangles: index.length / 3,
        };
        data = this.calculateUVIndexed(data);
        return data;
    }
    calculateUVIndexed(data) {
        const uv = new Float32Array(data.vertices.length / 3 * 2);
        let uvIndex = 0;
        for (let i = 0; i < data.vertices.length / 3; i++) {
            uv[uvIndex] = .5 + Math.atan2(data.vertices[i * 3], data.vertices[i * 3 + 2]) / (2 * Math.PI);
            uv[uvIndex + 1] = .5 - Math.asin(data.vertices[i * 3 + 1]) / Math.PI;
            uvIndex += 2;
        }
        for (let i = 0; i < data.numTriangles; i++) {
            const u0 = uv[data.index[i * 3] * 2];
            const v0 = uv[data.index[i * 3] * 2 + 1];
            const u1 = uv[data.index[i * 3 + 1] * 2];
            const v1 = uv[data.index[i * 3 + 1] * 2 + 1];
            const u2 = uv[data.index[i * 3 + 2] * 2];
            const v2 = uv[data.index[i * 3 + 2] * 2 + 1];
            if (Math.abs(u0 - u1) > .5 || Math.abs(u2 - u0) > .5 || Math.abs(u2 - u1) > .5) {
                if (u0 < .5) {
                    uv[data.index[i * 3] * 2] += 1;
                }
                if (u1 < .5) {
                    uv[data.index[i * 3 + 1] * 2] += 1;
                }
                if (u2 < .5) {
                    uv[data.index[i * 3 + 2] * 2] += 1;
                }
            }
            if (Math.abs(v0 - v1) > .5 || Math.abs(v2 - v0) > .5 || Math.abs(v2 - v1) > .5) {
                if (v0 < .5) {
                    uv[data.index[i * 3] * 2 + 1] += 1;
                }
                if (v1 < .5) {
                    uv[data.index[i * 3 + 1] * 2 + 1] += 1;
                }
                if (v2 < .5) {
                    uv[data.index[i * 3 + 2] * 2 + 1] += 1;
                }
            }
        }
        return Object.assign(Object.assign({}, data), { uv, normals: data.vertices });
    }
    subdivideTrianglesR(store, index, level, v0, v1, v2) {
        if (level === 0) {
            if (v0.index === -1) {
                v0.index = store.length;
                store.push(v0);
            }
            if (v1.index === -1) {
                v1.index = store.length;
                store.push(v1);
            }
            if (v2.index === -1) {
                v2.index = store.length;
                store.push(v2);
            }
            index.push(v0.index, v1.index, v2.index);
            return;
        }
        const mv0v1 = Vector3T.middle(v0, v1);
        const mv1v2 = Vector3T.middle(v1, v2);
        const mv2v0 = Vector3T.middle(v2, v0);
        this.subdivideTrianglesR(store, index, level - 1, v0, mv0v1, mv2v0);
        this.subdivideTrianglesR(store, index, level - 1, mv0v1, v1, mv1v2);
        this.subdivideTrianglesR(store, index, level - 1, mv1v2, mv2v0, mv0v1);
        this.subdivideTrianglesR(store, index, level - 1, mv2v0, mv1v2, v2);
    }
}
exports.default = Sphere;

},{"../render/geometry/Cube":14}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A vector 3 is an Float32Array[3]
 */
class Vector3 {
    static create() {
        return new Float32Array(3);
    }
    static createFromCoords(x, y, z) {
        return Vector3.set(Vector3.create(), x, y, z);
    }
    static clone(vin) {
        return Vector3.createFromCoords(vin[0], vin[1], vin[2]);
    }
    static set(out, x, y, z) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        return out;
    }
    static add(out, v0, v1) {
        out[0] = v0[0] + v1[0];
        out[1] = v0[1] + v1[1];
        out[2] = v0[2] + v1[2];
        return out;
    }
    /**
     * out = v0 - v1
     * @param out
     * @param v0
     * @param v1
     */
    static sub(out, v0, v1) {
        out[0] = v0[0] - v1[0];
        out[1] = v0[1] - v1[1];
        out[2] = v0[2] - v1[2];
        return out;
    }
    static magnitude(v) {
        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    }
    static copy(out, v) {
        out[0] = v[0];
        out[1] = v[1];
        out[2] = v[2];
        return out;
    }
    static normalize(out, v) {
        const l = Vector3.magnitude(v);
        if (l !== 0) {
            const ll = 1 / l;
            out[0] = v[0] * ll;
            out[1] = v[1] * ll;
            out[2] = v[2] * ll;
        }
        return out;
    }
    static mul(out, v, l) {
        out[0] = v[0] * l;
        out[1] = v[1] * l;
        out[2] = v[2] * l;
        return out;
    }
    /**
     * assumes normalized vectors.
     */
    static dot(v0, v1) {
        return v0[0] * v1[0] + v0[1] * v1[1] + v0[2] * v1[2];
    }
    static invert(out, v) {
        out[0] = v[0] * -1.0;
        out[1] = v[1] * -1.0;
        out[2] = v[2] * -1.0;
    }
    static cross(out, a, b) {
        out[0] = a[1] * b[2] - a[2] * b[1];
        out[1] = a[2] * b[0] - a[0] * b[2];
        out[2] = a[0] * b[1] - a[1] * b[0];
        return out;
    }
}
exports.default = Vector3;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = exports.TextResource = exports.ImageResource = exports.ResourceType = void 0;
var ResourceType;
(function (ResourceType) {
    ResourceType[ResourceType["Image"] = 0] = "Image";
    ResourceType[ResourceType["Text"] = 1] = "Text";
})(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
class ImageResource {
    constructor(id_, url, onLoaded, onErrored) {
        this.type = ResourceType.Image;
        const img = new Image();
        img.onload = (e) => {
            onLoaded(this);
        };
        img.onerror = (e) => {
            onErrored(this);
        };
        this.id = id_;
        this.url = url;
        this.image = img;
    }
    load() {
        this.image.src = this.url;
    }
    get() {
        return this.image;
    }
}
exports.ImageResource = ImageResource;
class TextResource {
    constructor(id_, url, onLoaded, onErrored) {
        this.type = ResourceType.Text;
        this.id = id_;
        this.url = url;
        this.xhr = new XMLHttpRequest();
        this.xhr.open("GET", this.url, true);
        this.xhr.onload = (ev) => {
            if (this.xhr.status != 200) {
                this.text = "";
                onErrored(this);
            }
            else {
                this.text = ev.currentTarget ? ev.currentTarget.responseText : ev.target.responseText;
                onLoaded(this);
            }
        };
        this.xhr.onerror = (ev) => {
            this.text = "";
            onErrored(this);
        };
    }
    load() {
        console.log(`loading ${this.url}`);
        this.xhr.send();
    }
    get() {
        return this.text;
    }
}
exports.TextResource = TextResource;
var LoaderStatus;
(function (LoaderStatus) {
    LoaderStatus[LoaderStatus["CREATING"] = 0] = "CREATING";
    LoaderStatus[LoaderStatus["LOADING"] = 1] = "LOADING";
    LoaderStatus[LoaderStatus["DONE"] = 2] = "DONE";
})(LoaderStatus || (LoaderStatus = {}));
class Loader {
    constructor() {
        this.numResourcesToLoad = 0;
        this.resources = {};
        this.status = LoaderStatus.CREATING;
        this.currentLoadedResources = 0;
        this.erroredResources = 0;
        this.onLoadEnded = null;
    }
    addImage(url) {
        if (typeof url === 'string') {
            this.addImageImpl(url);
        }
        else {
            const urls = url;
            urls.forEach(u => this.addImageImpl(u));
        }
        return this;
    }
    addText(url) {
        if (typeof url === 'string') {
            this.addTextImpl(url);
        }
        else {
            const urls = url;
            urls.forEach(u => this.addTextImpl(u));
        }
        return this;
    }
    addTextImpl(url) {
        if (this.status === LoaderStatus.CREATING) {
            let index = url.lastIndexOf('/');
            let id = url.substring(index + 1); // accounts for lastIndexOf===-1
            let endindex = id.lastIndexOf('?');
            if (endindex !== -1) {
                id = url.substring(0, endindex);
            }
            if (this.resources[id] !== void 0) {
                console.warn(`${id} has already been added to download list. Skipping`);
            }
            else {
                this.resources[id] = new TextResource(id, url, this.onLoaded.bind(this), this.onErrored.bind(this));
                this.numResourcesToLoad++;
            }
        }
        else {
            console.error(`Text Resource not added: ${url}. Bad state.`);
        }
    }
    addImageImpl(url) {
        if (this.status === LoaderStatus.CREATING) {
            let index = url.lastIndexOf('/');
            let id = url.substring(index + 1); // accounts for lastIndexOf===-1
            let endindex = id.lastIndexOf('?');
            if (endindex !== -1) {
                id = url.substring(0, endindex);
            }
            if (this.resources[id] !== void 0) {
                console.warn(`${id} has already been added to download list. Skipping`);
            }
            else {
                this.resources[id] = new ImageResource(id, url, this.onLoaded.bind(this), this.onErrored.bind(this));
                this.numResourcesToLoad++;
            }
        }
        else {
            console.error(`HTMLImageElement Resource not added: ${url}. Bad state.`);
        }
    }
    onLoaded(r) {
        this.loaded(r);
    }
    onErrored(r) {
        this.erroredResources++;
        console.error(`Error loading resource ${r.id}`);
        this.loaded(r);
    }
    loaded(r) {
        this.currentLoadedResources++;
        if (this.currentLoadedResources === this.numResourcesToLoad) {
            this.onLoadEnded(this);
            this.status = LoaderStatus.DONE;
        }
        console.info(`loaded ${r.id} - ${this.currentLoadedResources}/${this.numResourcesToLoad}. Errored: ${this.erroredResources}`);
    }
    load(cb) {
        this.status = LoaderStatus.LOADING;
        this.onLoadEnded = cb;
        console.info(`About to load ${this.numResourcesToLoad} elements`);
        Object.keys(this.resources).forEach(k => this.resources[k].load());
    }
    get isError() {
        return this.erroredResources !== 0;
    }
    getText(id) {
        return this.resources[id].get();
    }
    getImage(id) {
        return this.resources[id].get();
    }
    getImagesWith(ids) {
        const ret = [];
        ids.forEach(id => {
            const r = this.resources[id];
            if (r !== void 0) {
                ret.push(r.get());
            }
        });
        return ret;
    }
    getImages() {
        return this.getResourceByType(ResourceType.Image).map((e) => {
            return {
                image: e.get(),
                id: e.id
            };
        });
    }
    getResourceByType(t) {
        const ret = [];
        Object.keys(this.resources).forEach(k => {
            const r = this.resources[k];
            if (r.type === t) {
                ret.push(r);
            }
        });
        return ret;
    }
}
exports.Loader = Loader;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Initialize system.
 * Create canvas, get gl2 context, etc.
 */
let Platform = /** @class */ (() => {
    class Platform {
        static initialize(w, h) {
            const c = document.createElement('canvas');
            c.width = w;
            c.height = h;
            document.body.appendChild(c);
            const ctx = c.getContext("webgl2", {
                depth: true,
                alpha: false,
                antialias: false,
                premultipliedAlpha: false,
            });
            if (ctx) {
                Platform.glContext = ctx;
                Platform.canvas = c;
            }
            else {
                alert("Webgl2 enabled please.");
            }
        }
    }
    Platform.glContext = null;
    Platform.canvas = null;
    return Platform;
})();
exports.default = Platform;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = require("../math/Vector3");
const Matrix4_1 = require("../math/Matrix4");
const v0 = Vector3_1.default.create();
const v1 = Vector3_1.default.create();
function radians(v) {
    return v * Math.PI / 180;
}
class Camera {
    constructor() {
        this.matrix = Matrix4_1.default.create();
        this.viewMatrix = Matrix4_1.default.create();
        this.advanceAmount = 0;
        this.strafeAmount = 0;
        this.upAmount = 0;
        this.yaw = 0;
        this.pitch = 0;
        this.position = Vector3_1.default.createFromCoords(0, 0, 3);
        this.forward = Vector3_1.default.createFromCoords(0, 0, 0);
        this.up = Vector3_1.default.createFromCoords(0, 1, 0);
    }
    static from(c) {
        return new Camera().setup(c.position, c.forward, c.up);
    }
    setup(pos, forward, up) {
        Vector3_1.default.copy(this.position, pos);
        Vector3_1.default.copy(this.forward, forward);
        Vector3_1.default.copy(this.up, up);
        Vector3_1.default.normalize(v0, Vector3_1.default.copy(v0, this.forward));
        this.yaw = 180 / Math.PI * Math.atan2(v0[2], v0[0]);
        this.pitch =
            180 / Math.PI * Math.asin(v0[1]);
        this.sync();
        return this;
    }
    sync() {
        if (this.advanceAmount !== 0) {
            this.advance(this.advanceAmount * .25);
        }
        if (this.strafeAmount !== 0) {
            this.strafe(this.strafeAmount * .25);
        }
        if (this.upAmount !== 0) {
            this.moveUp(this.upAmount * .25);
        }
        Matrix4_1.default.lookAt(this.matrix, this.position, Vector3_1.default.add(v0, this.position, this.forward), this.up);
        Matrix4_1.default.viewMatrix(this.viewMatrix, this.matrix);
    }
    lookAt(x, y, z) {
        Vector3_1.default.normalize(this.forward, Vector3_1.default.sub(this.forward, Vector3_1.default.createFromCoords(x, y, z), this.position));
        this.setup(this.position, this.forward, this.up);
    }
    advance(amount) {
        Vector3_1.default.add(this.position, this.position, Vector3_1.default.mul(v0, this.forward, amount));
    }
    strafe(amount) {
        Vector3_1.default.add(this.position, this.position, Vector3_1.default.mul(v0, Vector3_1.default.normalize(v0, Vector3_1.default.cross(v0, this.forward, this.up)), amount));
    }
    moveUp(amount) {
        // right
        Vector3_1.default.normalize(v0, Vector3_1.default.cross(v0, this.forward, this.up));
        // up
        Vector3_1.default.normalize(v1, Vector3_1.default.cross(v1, this.forward, v0));
        Vector3_1.default.add(this.position, this.position, Vector3_1.default.mul(v1, v1, amount));
    }
    anglesFrom(ix, iy) {
        this.yaw += ix;
        this.pitch -= iy;
        if (this.pitch > 89) {
            this.pitch = 89;
        }
        if (this.pitch < -89) {
            this.pitch = -89;
        }
        v0[0] = Math.cos(radians(this.pitch)) * Math.cos(radians(this.yaw));
        v0[1] = Math.sin(radians(this.pitch));
        v0[2] = Math.cos(radians(this.pitch)) * Math.sin(radians(this.yaw));
        Vector3_1.default.normalize(this.forward, v0);
        this.sync();
    }
}
exports.default = Camera;

},{"../math/Matrix4":1,"../math/Vector3":4}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Platform_1 = require("../platform/Platform");
const NullShader_1 = require("./shader/NullShader");
const Matrix4_1 = require("../math/Matrix4");
const TextureShader_1 = require("./shader/TextureShader");
const Vector3_1 = require("../math/Vector3");
const Camera_1 = require("./Camera");
const SkyboxShader_1 = require("./shader/SkyboxShader");
const Cube_1 = require("./geometry/Cube");
const EnvironmentMapShader_1 = require("./shader/EnvironmentMapShader");
const Material_1 = require("./Material");
const Surface_1 = require("./Surface");
const Mesh_1 = require("./Mesh");
const Light_1 = require("./Light");
const Myriahedral_1 = require("./geometry/Myriahedral");
const Solids_1 = require("./geometry/Solids");
const Graticule_1 = require("./geometry/Graticule");
const MaxUnfoldScale = 90;
const N = 64;
let pos = 0;
class Engine {
    constructor(w, h) {
        this.shader = {};
        this.texture = {};
        this.surface = {};
        this.camera = {};
        this.mesh = {};
        this.light = {};
        this.perspective = Matrix4_1.default.create();
        this.time = 0;
        this.matrices = new Float32Array(16 * N * N);
        this.matrix = Matrix4_1.default.create();
        this.position = Vector3_1.default.create();
        this.rotation = Vector3_1.default.create();
        this.scale = Vector3_1.default.createFromCoords(1, 1, 1);
        this.exy = 0;
        this.exz = 0;
        this.eyz = 0;
        this.unfoldScale = 0;
        this.normals = false;
        this.cuts = false;
        this.folds = false;
        this.outline = false;
        this.action = 0;
        this.longitude = 0;
        this.latitude = 0;
        this.start = 0;
        this.graticules = [];
        this.currentGraticuleIndex = -1;
        Platform_1.default.initialize(w, h);
        this.gl = Platform_1.default.glContext;
        this.resize(w, h, true);
        // ahemhem
        window.engine = this;
    }
    init() {
        const gl = this.gl;
        this.currentCamera = new Camera_1.default();
        this.camera["camera0"] = this.currentCamera;
        this.shader["null"] = new NullShader_1.default(gl);
        this.shader["texture"] = new TextureShader_1.default(gl);
        this.shader["textureNoLight"] = new TextureShader_1.default(gl, {});
        this.shader["skybox"] = new SkyboxShader_1.default(gl);
        this.shader["reflectiveEnvMap"] = new EnvironmentMapShader_1.EnvironmentMapShader(gl);
        this.shader["refractiveEnvMap"] = new EnvironmentMapShader_1.EnvironmentMapShader(gl, true);
        this.surface["surface0"] = new Surface_1.default(this, {
            width: 256,
            height: 256,
            attachments: [
                {
                    renderBufferTarget: gl.DEPTH_STENCIL_ATTACHMENT,
                    renderBufferInternalFormat: gl.DEPTH24_STENCIL8
                },
                {
                    renderBufferTarget: gl.COLOR_ATTACHMENT0,
                    textureDefinition: {
                    // default. size will be set as Surface size.
                    }
                }
            ]
        });
        this.mesh["cube2"] = new Cube_1.Cube(this, Material_1.default.Texture(this.getTexture("diffuse"), this.getTexture("specular"), .1, 32), false, N * N);
        this.updateInstancingMatrices();
        this.mesh["lightprobe"] = new Cube_1.Cube(this, Material_1.default.Color(new Float32Array([1.0, 0.0, 0.0, 1.0])), false);
        this.mesh["cube"] = new Cube_1.Cube(this, Material_1.default.Texture(this.surface["surface0"].texture, this.surface["surface0"].texture, .2, 32), false, N * N);
        this.mesh["skybox"] = new Cube_1.Cube(this, Material_1.default.Skybox(this.getTexture("cubemap")), true);
        this.buildGraticules();
        this.buildMyriahedrons();
        this.selectGraticule(0);
        this.currentCamera.setup([-116.15988159179688, 6.677720546722412, -5.870321273803711], [0.9977958798408508, -0.016972756013274193, 0.06415063887834549], [0, 1, 0]);
        this.currentCamera.lookAt(0, 0, 0);
        this.light["sun"] = Light_1.default.Directional({
            ambient: [.1, .1, .1],
            diffuse: [.5, .5, .5],
            specular: [1, 1, 1],
            direction: [0, -1, 1]
        });
        this.light["point"] = Light_1.default.Point({
            ambient: [.1, .1, .1],
            diffuse: [1, 1, 1],
            specular: [1, 1, 1],
            position: [0, 0, -3]
        });
        this.initializeGraphics();
        Platform_1.default.canvas.addEventListener("touchend", (e) => {
            const mult = (e.changedTouches[0].pageX < window.innerWidth / 2) ? 1 : -1;
            pos += .01 * mult;
            this.currentCamera.lookAt(30 * Math.cos(pos), -20, 30 * Math.sin(pos));
            console.log(pos);
        });
    }
    buildFoldsCutsLines(data, s1, s2, gd) {
        const gl = this.gl;
        /*****/
        const centers = [];
        for (let i = 0; i < data.index.length; i += 3) {
            const v0x = data.vertices[data.index[i] * 3];
            const v0y = data.vertices[data.index[i] * 3 + 1];
            const v0z = data.vertices[data.index[i] * 3 + 2];
            const v1x = data.vertices[data.index[i + 1] * 3];
            const v1y = data.vertices[data.index[i + 1] * 3 + 1];
            const v1z = data.vertices[data.index[i + 1] * 3 + 2];
            const v2x = data.vertices[data.index[i + 2] * 3];
            const v2y = data.vertices[data.index[i + 2] * 3 + 1];
            const v2z = data.vertices[data.index[i + 2] * 3 + 2];
            centers.push((v0x + v1x + v2x) / 3);
            centers.push((v0y + v1y + v2y) / 3);
            centers.push((v0z + v1z + v2z) / 3);
        }
        const indices = [];
        data.folds.forEach(fold => {
            indices.push(fold.f0);
            indices.push(fold.f1);
        });
        if (this.folds) {
            const mc = Material_1.default.Color(new Float32Array([1, 0, 1, 1]));
            mc.renderMode = gl.POINTS;
            gd.foldPoints = new Mesh_1.default().from(this, {
                material: mc,
                index: new Uint16Array(indices),
                vertices: new Float32Array(centers),
                cullDisabled: true,
                uv: null,
                normals: null,
            }, 1).setScale(s2);
            const mc2 = Material_1.default.Color(new Float32Array([1, 0, 1, 1]));
            mc2.renderMode = gl.LINES;
            gd.foldLines = new Mesh_1.default().from(this, {
                material: mc2,
                index: new Uint16Array(indices),
                vertices: new Float32Array(centers),
                cullDisabled: true,
                uv: null,
                normals: null,
            }, 1).setScale(s2);
        }
        /// cuts
        const indicescut = [];
        data.cuts.forEach((cut) => {
            indicescut.push(cut.vertex0);
            indicescut.push(cut.vertex1);
        });
        if (this.cuts) {
            const mc3 = Material_1.default.Color(new Float32Array([0, 1, 1, 1]));
            mc3.renderMode = gl.LINES;
            gd.cutLines = new Mesh_1.default().from(this, {
                material: mc3,
                index: new Uint16Array(indicescut),
                vertices: new Float32Array(data.vertices),
                cullDisabled: true,
                uv: null,
                normals: null,
            }, 1).setScale(s2);
            const mc4 = Material_1.default.Color(new Float32Array([0, 1, 1, 1]));
            mc4.renderMode = gl.POINTS;
            gd.cutPoints = new Mesh_1.default().from(this, {
                material: mc4,
                index: new Uint16Array(indicescut),
                vertices: new Float32Array(data.vertices),
                cullDisabled: true,
                uv: null,
                normals: null,
            }, 1).setScale(s2);
        }
        /*****/
        if (this.normals) {
            /// normals
            const normals = [];
            const indicesnormals = [];
            let indexnormals = 0;
            for (let i = 0; i < data.index.length; i += 3) {
                const x0 = data.vertices[data.index[i + 1] * 3] - data.vertices[data.index[i] * 3];
                const y0 = data.vertices[data.index[i + 1] * 3 + 1] - data.vertices[data.index[i] * 3 + 1];
                const z0 = data.vertices[data.index[i + 1] * 3 + 2] - data.vertices[data.index[i] * 3 + 2];
                const x1 = data.vertices[data.index[i + 2] * 3] - data.vertices[data.index[i] * 3];
                const y1 = data.vertices[data.index[i + 2] * 3 + 1] - data.vertices[data.index[i] * 3 + 1];
                const z1 = data.vertices[data.index[i + 2] * 3 + 2] - data.vertices[data.index[i] * 3 + 2];
                const x = y0 * z1 - z0 * y1;
                const y = z0 * x1 - x0 * z1;
                const z = x0 * y1 - y0 * x1;
                let l = Math.sqrt(x * x + y * y + z * z);
                normals.push(x / l, y / l, z / l);
                const f = 1.1;
                normals.push(x / l * f, y / l * f, z / l * f);
                indicesnormals.push(indexnormals++);
                indicesnormals.push(indexnormals++);
            }
            const matnormals = Material_1.default.Color(new Float32Array([1, 1, 1, 1]));
            matnormals.renderMode = gl.LINES;
            gd.normals = new Mesh_1.default().from(this, {
                material: matnormals,
                index: new Uint16Array(indicesnormals),
                vertices: new Float32Array(normals),
                cullDisabled: true,
                uv: null,
                normals: null,
            }, 1).setScale(s1);
        }
    }
    resize(w, h, force) {
        if (force || Platform_1.default.canvas.width !== w || Platform_1.default.canvas.height !== h) {
            Platform_1.default.canvas.width = w;
            Platform_1.default.canvas.height = h;
            this.renderSurfaceSize(w, h);
        }
    }
    renderSurfaceSize(w, h) {
        this.renderWidth = w;
        this.renderHeight = h;
        this.perspective = Matrix4_1.default.perspective(this.perspective, 70 * Math.PI / 180, w / h, 1, 2000);
        this.gl.viewport(0, 0, w, h);
    }
    getShader(s) {
        return this.shader[s];
    }
    getTexture(s) {
        return this.texture[s];
    }
    addTexture(name, t) {
        this.texture[name] = t;
    }
    projectionMatrix() {
        return this.perspective;
    }
    cameraMatrix() {
        return this.currentCamera.matrix;
    }
    cameraPosition() {
        return this.currentCamera.position;
    }
    viewMatrix() {
        return this.currentCamera.viewMatrix;
    }
    initializeGraphics() {
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clearDepth(1.0);
        this.gl.cullFace(this.gl.BACK);
        this.gl.frontFace(this.gl.CCW);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }
    render(delta) {
        // cubemap ambient
        // this.surface["surface0"].enableAsTextureTarget(this);
        // this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        //
        // this.mesh["cube2"].render(this);
        // this.mesh["skybox"].render(this);
        //
        // this.surface["surface0"].disableAsTextureTarget(this);
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const gl = this.gl;
        gl.disable(gl.BLEND);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT | this.gl.STENCIL_BUFFER_BIT);
        this.currentCamera = this.camera["camera0"];
        this.currentCamera.sync();
        this.updateInstancingMatrices();
        // this.mesh["cube"].renderInstanced(this, this.matrices, N*N);
        const light = this.light['point'];
        light.setPosition(-100, 50, 40);
        const cg = this.currentGraticule;
        cg.mesh.euler(this.exy, this.exz, this.eyz);
        (_a = cg.outline) === null || _a === void 0 ? void 0 : _a.euler(this.exy, this.exz, this.eyz);
        (_b = cg.normals) === null || _b === void 0 ? void 0 : _b.euler(this.exy, this.exz, this.eyz);
        (_c = cg.cutLines) === null || _c === void 0 ? void 0 : _c.euler(this.exy, this.exz, this.eyz);
        (_d = cg.cutPoints) === null || _d === void 0 ? void 0 : _d.euler(this.exy, this.exz, this.eyz);
        (_e = cg.foldLines) === null || _e === void 0 ? void 0 : _e.euler(this.exy, this.exz, this.eyz);
        (_f = cg.foldPoints) === null || _f === void 0 ? void 0 : _f.euler(this.exy, this.exz, this.eyz);
        cg.mesh.render(this);
        if (this.outline) {
            (_g = cg.outline) === null || _g === void 0 ? void 0 : _g.render(this);
        }
        if (this.normals) {
            (_h = cg.normals) === null || _h === void 0 ? void 0 : _h.render(this);
        }
        if (this.cuts) {
            (_j = cg.cutLines) === null || _j === void 0 ? void 0 : _j.render(this);
            (_k = cg.cutPoints) === null || _k === void 0 ? void 0 : _k.render(this);
        }
        if (this.folds) {
            (_l = cg.foldLines) === null || _l === void 0 ? void 0 : _l.render(this);
            (_m = cg.foldPoints) === null || _m === void 0 ? void 0 : _m.render(this);
        }
        // const moon = this.mesh["moon"];
        // (moon as Mesh).euler(0, (this.time%25000)/25000*2*Math.PI, 0 );
        // moon.render(this);
        // light.setPosition(
        // 	25*Math.cos((this.time%15000)/15000*2*Math.PI),
        // 	5,
        // 	25*Math.sin((this.time%15000)/15000*2*Math.PI));
        this.mesh["lightprobe"].setPositionV(light.getPosition());
        this.mesh["lightprobe"].setScale(3);
        this.mesh["lightprobe"].getMaterial().definition.color.set(light.getDiffuse());
        const lp = this.mesh["lightprobe"];
        lp.render(this);
        this.mesh["skybox"].render(this);
        // const p = light.getPosition();
        // this.currentCamera.lookAt(p[0], -p[1], p[2]);
        // const angle = ((Date.now() % 30000) / 30000)*2*Math.PI;
        // const angle2 = ((Date.now() % 40000) / 40000)*2*Math.PI;
        // const r = 10;
        // Vector3.set(this.currentCamera.position,
        // 	0,Math.sin(angle)*3.5 + 5,0);
        // this.currentCamera.lookAt(
        // 	r*Math.cos(angle),Math.sin(angle2)*3.5 + 5,r*Math.sin(angle)		// from
        // );
        // this.currentCamera.sync();
        this.time += delta;
    }
    updateInstancingMatrices() {
        for (let i = 0; i < N * N; i++) {
            const row = (i / N) | 0;
            const col = i % N;
            const tt = 15000;
            const t = ((this.time % tt)) / (tt / 2) * Math.PI;
            Vector3_1.default.set(this.position, (col - ((N - 1) / 2)) * 3, 20 * Math.sin(2 * Math.PI / N * col + t) * Math.cos(2 * Math.PI / N * row + t), (N / 2 - row) * 3);
            Vector3_1.default.set(this.rotation, t, 2 * (t + i) * (i % 2 ? 1 : -1), 0);
            // Vector3.set(this.rotation, Math.random()*2*Math.PI, 0, Math.random()*2*Math.PI);
            // Vector3.set(this.position, (col - ((N - 1) / 2)) * 3, 0, (row - ((N-1)/2)) * 3);
            Vector3_1.default.set(this.scale, 2, 2, 2);
            this.matrices.set(Matrix4_1.default.modelMatrix(this.matrix, this.position, this.rotation, this.scale), i * 16);
        }
    }
    mouseEvent(pixelsIncrementX, pixelsIncrementY) {
        this.camera["camera0"].anglesFrom(pixelsIncrementX, pixelsIncrementY);
        this.camera["camera0"].sync();
    }
    updateUnfoldingOutline(data) {
        var _a, _b;
        (_b = (_a = this.currentGraticule) === null || _a === void 0 ? void 0 : _a.outline) === null || _b === void 0 ? void 0 : _b.remesh(this, data.vertices, data.uv);
    }
    buildUnfoldingOutline(data) {
        const gl = this.gl;
        const indices = [];
        for (let i = 0; i < data.index.length; i += 3) {
            indices.push(data.index[i], data.index[i + 1]);
            indices.push(data.index[i + 1], data.index[i + 2]);
            indices.push(data.index[i + 2], data.index[i]);
        }
        const mc = Material_1.default.Color(new Float32Array([1, 1, 1, 1]));
        mc.renderMode = gl.LINES;
        return new Mesh_1.default().from(this, {
            material: mc,
            index: new Uint16Array(indices),
            vertices: data.vertices,
            cullDisabled: true,
            uv: null,
            normals: null,
        }, 1).setScale(30.2);
    }
    keyboardEvent(key, down) {
        var _a, _b;
        const c = this.camera["camera0"];
        switch (key) {
            case 'w':
                c.advanceAmount = down ? 1 : 0;
                break;
            case 's':
                c.advanceAmount = down ? -1 : 0;
                break;
            case 'a':
                c.strafeAmount = down ? -1 : 0;
                break;
            case 'd':
                c.strafeAmount = down ? 1 : 0;
                break;
            case 'q':
                c.upAmount = down ? -1 : 0;
                break;
            case 'z':
                c.upAmount = down ? 1 : 0;
                break;
            case 'j':
                this.exz += Math.PI / 90;
                break;
            case 'l':
                this.exz -= Math.PI / 90;
                break;
            case 'o':
                this.exy -= Math.PI / 90;
                break;
            case 'k':
                this.exy += Math.PI / 90;
                break;
            case 'i':
                this.eyz -= Math.PI / 90;
                break;
            case 'p':
                this.eyz += Math.PI / 90;
                break;
            case '1':
                this.action++;
                this.unfoldScale += 1;
                if (this.unfoldScale > 90) {
                    this.unfoldScale = 90;
                }
                else {
                    this.unfoldImpl();
                }
                break;
            case '2':
                this.action++;
                this.unfoldScale -= 1;
                if (this.unfoldScale < 0) {
                    this.unfoldScale = 0;
                }
                else {
                    this.unfoldImpl();
                }
                break;
            case '0':
                if (!down) {
                    this.normals = !this.normals;
                    this.foldsCutsInfo();
                }
                break;
            case '8':
                if (!down) {
                    this.folds = !this.folds;
                    this.foldsCutsInfo();
                }
                break;
            case '9':
                if (!down) {
                    this.cuts = !this.cuts;
                    this.foldsCutsInfo();
                }
                break;
            case '3':
                if (!down) {
                    this.outline = !this.outline;
                    this.foldsCutsInfo();
                }
                break;
            case '4':
                // if (!down) {
                {
                    this.longitude++;
                    this.myriahedral.uv = this.myriahedral.calculateUV(this.longitude / 180 * Math.PI, this.latitude / 180 * Math.PI);
                    const data = this.myriahedral.getMeshData();
                    (_a = this.currentGraticule) === null || _a === void 0 ? void 0 : _a.mesh.remesh(this, data.vertices, data.uv);
                }
                // }
                break;
            case '5':
                // if (!down) {
                {
                    this.latitude++;
                    this.myriahedral.uv = this.myriahedral.calculateUV(this.longitude / 180 * Math.PI, this.latitude / 180 * Math.PI);
                    const data = this.myriahedral.getMeshData();
                    (_b = this.currentGraticule) === null || _b === void 0 ? void 0 : _b.mesh.remesh(this, data.vertices, data.uv);
                }
                // }
                break;
            case 'f':
                if (!down) {
                    this.action++;
                    this.fold(() => {
                        console.log('folded');
                    });
                }
                break;
            case 'u':
                if (!down) {
                    this.action++;
                    this.unfold(() => {
                        console.log('unfolded');
                    });
                }
                break;
            case 'g':
                this.action++;
                if (!down) {
                    this.nextGraticule();
                }
                break;
        }
    }
    buildGraticules() {
        this.buildMenuHeader('Graticules');
        Graticule_1.Graticules.forEach(p => {
            this.buildGraticule(p);
        });
    }
    buildGraticule(p) {
        const myriahedral = new Myriahedral_1.default().graticule(p);
        const data = myriahedral.getMeshData();
        const outline = this.buildUnfoldingOutline(data);
        const mesh = new Mesh_1.default().from(this, Object.assign(Object.assign({}, data), { material: Material_1.default.TextureNoLight(this.getTexture("earth"), .6), cullDisabled: true }), 1).setScale(30);
        const gr = {
            mesh,
            myriahedral,
            outline,
        };
        this.buildFoldsCutsLines(data, 30, 30.5, gr);
        this.buildMenuEntry(p.name, this.graticules.length);
        this.graticules.push(gr);
    }
    buildMenuEntry(titleText, index) {
        const menu = document.getElementById("menu");
        const menuItem = document.createElement('div');
        const title = document.createElement('span');
        title.innerText = titleText;
        title.style.cursor = 'pointer';
        title.style.color = 'white';
        title.style.fontSize = '0.9em';
        title.style.paddingLeft = '15px';
        title.addEventListener('click', () => {
            this.selectGraticule(index);
        });
        menuItem.appendChild(title);
        menu.appendChild(menuItem);
    }
    buildMenuHeader(titleText) {
        const menu = document.getElementById("menu");
        const menuItem = document.createElement('div');
        const br0 = document.createElement('br');
        const br1 = document.createElement('br');
        const title = document.createElement('span');
        title.innerHTML = `${titleText}`;
        title.style.fontSize = '1.1em';
        title.style.color = 'white';
        menuItem.appendChild(br0);
        menuItem.appendChild(title);
        menuItem.appendChild(br1);
        menu.appendChild(menuItem);
    }
    buildMyriahedrons() {
        this.buildMenuHeader('Solids');
        const solids = [
            ['Tetrahedron', Solids_1.TetrahedronGeometry],
            ['Cube', Solids_1.CubeGeometry],
            ['Octahedron', Solids_1.OctahedronGeometry],
            ['Icosahedron', Solids_1.IcosahedronGeometry]
        ];
        solids.forEach(g => {
            this.buildMyriahedron(g);
        });
    }
    buildMyriahedron(geometry) {
        this.buildMenuEntry(geometry[0], this.graticules.length);
        const myriahedral = new Myriahedral_1.default().myriahedron({
            name: geometry[1].name,
            geometry: geometry[1],
            subdivisions: 5,
            unfold: true,
            normalize: true,
        });
        const data1 = myriahedral.getMeshData();
        const outline = this.buildUnfoldingOutline(data1);
        const mesh = new Mesh_1.default().from(this, Object.assign(Object.assign({}, data1), { material: Material_1.default.TextureNoLight(this.getTexture("earth"), .6), cullDisabled: true }), 1);
        mesh.setScale(30);
        this.graticules.push({
            mesh,
            myriahedral,
            outline,
        });
    }
    nextGraticule() {
        this.selectGraticule(this.currentGraticuleIndex + 1);
    }
    selectGraticule(i) {
        if (i !== this.currentGraticuleIndex) {
            this.currentGraticuleIndex = i;
            this.fold(() => {
                const graticule = this.graticules[this.currentGraticuleIndex];
                this.currentGraticule = graticule;
                this.myriahedral = graticule.myriahedral;
                this.unfold(() => {
                    console.log('unfolded');
                });
            });
        }
    }
    unfold(onUnfoldFinished) {
        if (this.myriahedral && this.unfoldScale < MaxUnfoldScale) {
            requestAnimationFrame(this.unfoldAnimation.bind(this, onUnfoldFinished, this.action));
        }
        else {
            onUnfoldFinished();
        }
    }
    unfoldAnimation(onUnfoldFinished, gi) {
        if (gi === this.action) {
            this.unfoldScale++;
            this.unfoldImpl();
            if (this.unfoldScale < MaxUnfoldScale) {
                requestAnimationFrame(this.unfoldAnimation.bind(this, onUnfoldFinished, gi));
            }
            else {
                onUnfoldFinished();
            }
        }
    }
    fold(onFoldFinished) {
        if (this.myriahedral && this.unfoldScale > 0) {
            requestAnimationFrame(this.foldAnimation.bind(this, onFoldFinished, this.action));
        }
        else {
            requestAnimationFrame(onFoldFinished);
        }
    }
    foldAnimation(onFoldFinished, gi) {
        if (this.action === gi) {
            this.unfoldScale--;
            this.unfoldImpl();
            if (this.unfoldScale > 0) {
                requestAnimationFrame(this.foldAnimation.bind(this, onFoldFinished, gi));
            }
            else {
                requestAnimationFrame(onFoldFinished);
            }
        }
    }
    unfoldImpl() {
        var _a;
        this.myriahedral.unfold(this.unfoldScale / MaxUnfoldScale);
        const data = this.myriahedral.getMeshData();
        (_a = this.currentGraticule) === null || _a === void 0 ? void 0 : _a.mesh.remesh(this, data.vertices, data.uv);
        this.foldsCutsInfo();
    }
    foldsCutsInfo(data) {
        var _a;
        data = data !== null && data !== void 0 ? data : (_a = this.currentGraticule) === null || _a === void 0 ? void 0 : _a.myriahedral.getMeshData();
        this.buildFoldsCutsLines(data, 30, 30.5, this.currentGraticule);
        if (this.outline) {
            this.updateUnfoldingOutline(data);
        }
    }
}
exports.default = Engine;

},{"../math/Matrix4":1,"../math/Vector3":4,"../platform/Platform":6,"./Camera":7,"./Light":9,"./Material":10,"./Mesh":11,"./Surface":12,"./geometry/Cube":14,"./geometry/Graticule":15,"./geometry/Myriahedral":16,"./geometry/Solids":17,"./shader/EnvironmentMapShader":18,"./shader/NullShader":19,"./shader/SkyboxShader":21,"./shader/TextureShader":22}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointLight = exports.DirectionalLight = exports.LightType = void 0;
var LightType;
(function (LightType) {
    LightType[LightType["DIRECTIONAL"] = 0] = "DIRECTIONAL";
    LightType[LightType["POINT"] = 1] = "POINT";
    LightType[LightType["SPOT"] = 2] = "SPOT";
})(LightType = exports.LightType || (exports.LightType = {}));
class Light {
    constructor(type, li) {
        this.enabled = false;
        this.type = type;
        this.ambient = new Float32Array(li.ambient);
        this.diffuse = new Float32Array(li.diffuse);
        this.specular = new Float32Array(li.specular);
    }
    getAmbient() {
        return this.ambient;
    }
    getDiffuse() {
        return this.diffuse;
    }
    getSpecular() {
        return this.specular;
    }
    setAmbient(x, y, z) {
        this.set(this.ambient, x, y, z);
    }
    setDiffuse(x, y, z) {
        this.set(this.diffuse, x, y, z);
    }
    setSpecular(x, y, z) {
        this.set(this.specular, x, y, z);
    }
    set(v, x, y, z) {
        v[0] = x;
        v[1] = y;
        v[2] = z;
    }
    setEnabled(e) {
        this.enabled = e;
    }
    static Directional(def) {
        return new DirectionalLight(def);
    }
    static Point(def) {
        return new PointLight(def);
    }
}
exports.default = Light;
class DirectionalLight extends Light {
    constructor(li) {
        super(LightType.DIRECTIONAL, li);
        this.direction = new Float32Array(li.direction);
    }
    getDirection() {
        return this.direction;
    }
    setDirection(x, y, z) {
        this.set(this.direction, x, y, z);
    }
}
exports.DirectionalLight = DirectionalLight;
class PointLight extends Light {
    constructor(li) {
        super(LightType.POINT, li);
        this.position = new Float32Array(li.position);
    }
    getPosition() {
        return this.position;
    }
    setPosition(x, y, z) {
        this.set(this.position, x, y, z);
    }
}
exports.PointLight = PointLight;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialType = void 0;
var MaterialTexture;
(function (MaterialTexture) {
    MaterialTexture[MaterialTexture["DIFFUSE"] = 0] = "DIFFUSE";
    MaterialTexture[MaterialTexture["SPECULAR"] = 1] = "SPECULAR";
    MaterialTexture[MaterialTexture["NORMAL"] = 2] = "NORMAL";
    MaterialTexture[MaterialTexture["DISPLACEMENT"] = 3] = "DISPLACEMENT";
})(MaterialTexture || (MaterialTexture = {}));
var MaterialType;
(function (MaterialType) {
    MaterialType[MaterialType["SKYBOX"] = 0] = "SKYBOX";
    MaterialType[MaterialType["TEXTURE"] = 1] = "TEXTURE";
    MaterialType[MaterialType["REFLECTIVE"] = 2] = "REFLECTIVE";
    MaterialType[MaterialType["REFRACTIVE"] = 3] = "REFRACTIVE";
    MaterialType[MaterialType["COLOR"] = 4] = "COLOR";
    MaterialType[MaterialType["TEXTURE_NO_LIGHT"] = 5] = "TEXTURE_NO_LIGHT";
})(MaterialType = exports.MaterialType || (exports.MaterialType = {}));
class Material {
    constructor(t, def) {
        this.type = t;
        this.definition = def;
    }
    dispose() {
    }
    static Reflective(t) {
        return new Material(MaterialType.REFLECTIVE, {
            diffuse: t,
        });
    }
    static Refractive(t) {
        return new Material(MaterialType.REFRACTIVE, {
            diffuse: t,
        });
    }
    static Skybox(texture) {
        return new Material(MaterialType.SKYBOX, {
            diffuse: texture,
        });
    }
    static Texture(diffuse, specular, ambient, shininess) {
        return new Material(MaterialType.TEXTURE, {
            diffuse,
            specular,
            ambient,
            shininess,
        });
    }
    static TextureNoLight(diffuse, ambient) {
        return new Material(MaterialType.TEXTURE_NO_LIGHT, {
            diffuse,
            ambient,
        });
    }
    static Color(color) {
        return new Material(MaterialType.COLOR, {
            color,
        });
    }
}
exports.default = Material;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = require("../math/Vector3");
const Matrix4_1 = require("../math/Matrix4");
const Material_1 = require("./Material");
const SphereTessellator_1 = require("../math/SphereTessellator");
class Mesh {
    constructor() {
        this.material = null;
        this.shaderInfo = null;
        this.position = Vector3_1.default.createFromCoords(0, 0, 0);
        this.rotation = Vector3_1.default.createFromCoords(0, 0, 0);
        this.scale = Vector3_1.default.createFromCoords(1, 1, 1);
        this.transformDirty = true;
        this.transform = Matrix4_1.default.create();
    }
    dispose(gl) {
        this.material.dispose();
        gl.deleteVertexArray(this.shaderInfo.vao);
        gl.deleteBuffer(this.shaderInfo.geometryBuffer);
        gl.deleteBuffer(this.shaderInfo.indexBuffer);
        gl.deleteBuffer(this.shaderInfo.normalBuffer);
        gl.deleteBuffer(this.shaderInfo.uvBuffer);
        this.shaderInfo.instanceBuffer.dispose(gl);
    }
    /**
     * define a mesh from vertices data, and optionally, vertices indexes.
     *
     * attrib pointer info will be set consecutively:
     *  all x,y,z
     *  all u,v
     *
     * hence vertexAttribArrayPointer calls will reflect:
     *  stride of (coords per vertex)*sizeof(FLOAT) = (3*4), offset 0
     *  stride of (coords per vertex uv)*sizeof(FLOAT) = (2*4), offset num_vertices * sizeof(FLOAT)
     *
     */
    from(e, p, instanceCount) {
        var _a, _b, _c, _d;
        const vertices = p.vertices;
        const uv = p.uv;
        const index = p.index;
        const material = p.material;
        this.material = material;
        const gl = e.gl;
        switch (material.type) {
            case Material_1.MaterialType.REFLECTIVE:
                this.shaderInfo = e.getShader("reflectiveEnvMap").createVAO(gl, {
                    vertex: vertices,
                    normal: (_a = p.normals) !== null && _a !== void 0 ? _a : this.generateNormals(vertices, index),
                    index,
                    instanceCount,
                    cullDisabled: p.cullDisabled,
                }, material);
                break;
            case Material_1.MaterialType.REFRACTIVE:
                this.shaderInfo = e.getShader("refractiveEnvMap").createVAO(gl, {
                    vertex: vertices,
                    normal: (_b = p.normals) !== null && _b !== void 0 ? _b : this.generateNormals(vertices, index),
                    index,
                    instanceCount,
                    cullDisabled: p.cullDisabled,
                }, material);
                break;
            case Material_1.MaterialType.TEXTURE:
                this.shaderInfo = e.getShader("texture").createVAO(gl, {
                    vertex: vertices,
                    uv,
                    normal: (_c = p.normals) !== null && _c !== void 0 ? _c : this.generateNormals(vertices, index),
                    index,
                    instanceCount,
                    cullDisabled: p.cullDisabled,
                }, material);
                break;
            case Material_1.MaterialType.TEXTURE_NO_LIGHT:
                this.shaderInfo = e.getShader("textureNoLight").createVAO(gl, {
                    vertex: vertices,
                    uv,
                    normal: (_d = p.normals) !== null && _d !== void 0 ? _d : this.generateNormals(vertices, index),
                    index,
                    instanceCount,
                    cullDisabled: p.cullDisabled,
                }, material);
                break;
            case Material_1.MaterialType.SKYBOX:
                this.shaderInfo = e.getShader("skybox").createVAO(gl, {
                    vertex: vertices,
                    uv,
                    index,
                    instanceCount,
                }, material);
                break;
            case Material_1.MaterialType.COLOR:
                this.shaderInfo = e.getShader("null").createVAO(gl, { vertex: vertices, index }, material);
                break;
            default:
                throw new Error(`Unknown material type. ${material}`);
        }
        return this;
    }
    remesh(e, vertices, uv) {
        const gl = e.gl;
        gl.bindVertexArray(this.shaderInfo.vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.shaderInfo.geometryBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.shaderInfo.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.generateNormals(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.shaderInfo.uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, uv, gl.STATIC_DRAW);
        gl.bindVertexArray(null);
    }
    generateNormals(vertices, index) {
        const v0 = Vector3_1.default.create();
        const v1 = Vector3_1.default.create();
        const v2 = Vector3_1.default.create();
        const v3 = Vector3_1.default.create();
        const v4 = Vector3_1.default.create();
        const v5 = Vector3_1.default.create();
        let normals = new Float32Array(vertices.length);
        if (index) {
            for (let i = 0; i < index.length; i += 3) {
                const v0i = index[i] * 3;
                const v1i = index[i + 1] * 3;
                const v2i = index[i + 2] * 3;
                Vector3_1.default.set(v0, vertices[v0i], vertices[v0i + 1], vertices[v0i + 2]);
                Vector3_1.default.set(v1, vertices[v1i], vertices[v1i + 1], vertices[v1i + 2]);
                Vector3_1.default.set(v2, vertices[v2i], vertices[v2i + 1], vertices[v2i + 2]);
                Vector3_1.default.sub(v3, v0, v1);
                Vector3_1.default.sub(v4, v0, v2);
                Vector3_1.default.cross(v5, v4, v3); // normal
                normals[v0i] += v5[0];
                normals[v0i + 1] += v5[1];
                normals[v0i + 2] += v5[2];
                normals[v1i] += v5[0];
                normals[v1i + 1] += v5[1];
                normals[v1i + 2] += v5[2];
                normals[v2i] += v5[0];
                normals[v2i + 1] += v5[1];
                normals[v2i + 2] += v5[2];
            }
        }
        else {
            for (let i = 0; i < vertices.length; i += 9) {
                const v0i = i;
                const v1i = i + 3;
                const v2i = i + 6;
                Vector3_1.default.set(v0, vertices[v0i], vertices[v0i + 1], vertices[v0i + 2]);
                Vector3_1.default.set(v1, vertices[v1i], vertices[v1i + 1], vertices[v1i + 2]);
                Vector3_1.default.set(v2, vertices[v2i], vertices[v2i + 1], vertices[v2i + 2]);
                Vector3_1.default.sub(v3, v1, v0);
                Vector3_1.default.sub(v4, v2, v0);
                Vector3_1.default.cross(v5, v3, v4); // normal
                normals[v0i] += v5[0];
                normals[v0i + 1] += v5[1];
                normals[v0i + 2] += v5[2];
                normals[v1i] += v5[0];
                normals[v1i + 1] += v5[1];
                normals[v1i + 2] += v5[2];
                normals[v2i] += v5[0];
                normals[v2i + 1] += v5[1];
                normals[v2i + 2] += v5[2];
            }
        }
        // normalize.
        for (let i = 0; i < normals.length; i += 3) {
            const v = Math.sqrt(normals[i] * normals[i] + normals[i + 1] * normals[i + 1] + normals[i + 2] * normals[i + 2]);
            normals[i] /= v;
            normals[i + 1] /= v;
            normals[i + 2] /= v;
        }
        return normals;
    }
    transformMatrix() {
        // transformation needs rebuild
        if (this.transformDirty) {
            Matrix4_1.default.modelMatrix(this.transform, this.position, this.rotation, this.scale);
            this.transformDirty = false;
        }
        return this.transform;
    }
    render(e) {
        this.renderInstanced(e, this.transform, this.shaderInfo.instanceCount);
    }
    renderInstanced(e, locals, numInstances) {
        this.transformMatrix();
        const gl = e.gl;
        this.shaderInfo.instanceBuffer && this.shaderInfo.instanceBuffer.updateWith(gl, locals);
        this.shaderInfo.shader.render(e, this.shaderInfo, this);
    }
    getMaterial() {
        return this.material;
    }
    getMatrix() {
        return this.transformMatrix();
    }
    euler(x, y, z) {
        this.rotation[0] = x;
        this.rotation[1] = y;
        this.rotation[2] = z;
        this.transformDirty = true;
        return this;
    }
    setPosition(x, y, z) {
        Vector3_1.default.set(this.position, x, y, z);
        this.transformDirty = true;
        return this;
    }
    setPositionV(a) {
        Vector3_1.default.copy(this.position, a);
        this.transformDirty = true;
        return this;
    }
    getPosition() {
        return this.position;
    }
    setScale(s) {
        Vector3_1.default.set(this.scale, s, s, s);
        this.transformDirty = true;
        return this;
    }
    //
    // static tessellateSphereRec(e: Engine, i: TessellationInfo): Mesh {
    // 	// const data = new SphereTessellator().tessellateFromTetrahedronRec(i.subdivisions);
    //
    // 	const m = new Myriahedral(i.subdivisions);
    // 	const data = m.getMeshData();
    //
    // 	return new Mesh().from(e, {
    // 		...data,
    // 		material: i.material,
    // 		cullDisabled: i.cullDisabled,
    // 	}, i.instanceCount ?? 1);
    //
    // }
    static tessellateSphere(e, i) {
        var _a;
        const data = new SphereTessellator_1.default().tessellateFromTetrahedronRec(i.subdivisions);
        return new Mesh().from(e, Object.assign(Object.assign({}, data), { material: i.material, cullDisabled: true }), (_a = i.instanceCount) !== null && _a !== void 0 ? _a : 1);
    }
    static tessellateSphereFromCube(e, i) {
        var _a;
        const data = new SphereTessellator_1.default().tessellateFromCube(i.subdivisions);
        return new Mesh().from(e, Object.assign(Object.assign({}, data), { material: i.material, cullDisabled: i.cullDisabled }), (_a = i.instanceCount) !== null && _a !== void 0 ? _a : 1);
    }
}
exports.default = Mesh;

},{"../math/Matrix4":1,"../math/SphereTessellator":3,"../math/Vector3":4,"./Material":10}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Texture_1 = require("./Texture");
const Platform_1 = require("../platform/Platform");
class Surface {
    constructor(e, def) {
        this.frameBuffer = null;
        this.renderBuffer = null;
        this.texture_ = null;
        this.definition = def;
        this.initialize(e);
    }
    initialize(e) {
        const gl = e.gl;
        this.frameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        this.renderBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
        this.definition.attachments.forEach(attachment => {
            if (attachment.renderBufferTarget >= gl.COLOR_ATTACHMENT0 && attachment.renderBufferTarget <= gl.COLOR_ATTACHMENT15) {
                // override texture size with framebuffer size.
                attachment.textureDefinition.width = this.definition.width;
                attachment.textureDefinition.height = this.definition.height;
                this.texture_ = Texture_1.default.initialize(gl, attachment.textureDefinition);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment.renderBufferTarget, this.texture_.target, this.texture_.glTexture_, 0);
            }
            else {
                if (this.definition.samples !== void 0) {
                    gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.definition.samples, attachment.renderBufferInternalFormat, this.definition.width, this.definition.height);
                }
                else {
                    gl.renderbufferStorage(gl.RENDERBUFFER, attachment.renderBufferInternalFormat, this.definition.width, this.definition.height);
                }
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment.renderBufferTarget, gl.RENDERBUFFER, this.renderBuffer);
            }
        });
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
            throw new Error(`FrameBuffer incomplete.`);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    enableAsTextureTarget(e) {
        const gl = e.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        e.renderSurfaceSize(this.definition.width, this.definition.height);
    }
    disableAsTextureTarget(e) {
        e.gl.bindFramebuffer(e.gl.FRAMEBUFFER, null);
        e.renderSurfaceSize(Platform_1.default.canvas.width, Platform_1.default.canvas.height);
    }
    get texture() {
        return this.texture_;
    }
}
exports.default = Surface;

},{"../platform/Platform":6,"./Texture":13}],13:[function(require,module,exports){
"use strict";
/**
 * Texture uses mipmaps by default.
 *
 * internal_format and format, are not required to be equal in webgl2.
 * Combinations are here:
 * https://www.khronos.org/registry/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A general texture class.
 * It honors bitmaps that will be constructed based on the TextureInitialized filter parameter.
 */
class Texture {
    constructor() {
        this.glTexture_ = null;
        this.width = -1;
        this.height = -1;
        this.target = -1;
    }
    static initializeCubeMap(gl, elements) {
        return Texture.initialize(gl, {
            target: gl.TEXTURE_CUBE_MAP,
            element: elements,
            wrap_mode: gl.CLAMP_TO_EDGE,
            minFilter: gl.LINEAR,
            internal_format: gl.RGBA,
            format: gl.RGBA
        });
    }
    static initialize(gl, info) {
        if (info.target === void 0) {
            info.target = gl.TEXTURE_2D;
        }
        const glTexture_ = gl.createTexture();
        gl.bindTexture(info.target, glTexture_);
        const arrayView = info.pixels !== void 0 ? info.pixels : null;
        if (info.internal_format === void 0) {
            info.internal_format = gl.RGBA;
        }
        if (info.format === void 0) {
            info.format = info.internal_format;
        }
        if (info.type === void 0) {
            info.type = gl.UNSIGNED_BYTE;
        }
        if (info.element) {
            if (Array.isArray(info.element)) {
                if (info.target === gl.TEXTURE_CUBE_MAP) {
                    info.element.forEach((img, index) => {
                        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + index, 0, info.internal_format, img.width, img.height, 0, info.format, info.type, img);
                    });
                }
                else {
                    throw (new Error("Texture type bad: array of images, not cubemap"));
                }
            }
            else {
                // not array
                const element = info.element;
                info.width = element.width;
                info.height = element.height;
                gl.texImage2D(info.target, info.level || 0, info.internal_format, info.width, info.height, 0, info.format, info.type, element);
            }
        }
        else {
            gl.texImage2D(info.target, info.level || 0, info.internal_format, info.width, info.height, 0, info.format, info.type, arrayView);
        }
        const texture = new Texture();
        texture.glTexture_ = glTexture_;
        texture.width = info.width;
        texture.height = info.height;
        texture.target = info.target;
        // default filter if not present
        if (info.minFilter === void 0) {
            info.minFilter = gl.LINEAR;
        }
        // generate mipmaps if needed
        if (info.minFilter === gl.NEAREST_MIPMAP_NEAREST ||
            info.minFilter === gl.NEAREST_MIPMAP_LINEAR ||
            info.minFilter === gl.LINEAR_MIPMAP_NEAREST ||
            info.minFilter === gl.LINEAR_MIPMAP_LINEAR) {
            gl.generateMipmap(info.target);
        }
        if (info.magFilter === void 0) {
            info.magFilter = gl.LINEAR;
        }
        gl.texParameteri(info.target, gl.TEXTURE_MIN_FILTER, info.minFilter);
        gl.texParameteri(info.target, gl.TEXTURE_MAG_FILTER, info.magFilter);
        // default wrap mode
        if (info.wrap_mode === void 0) {
            info.wrap_mode = gl.CLAMP_TO_EDGE;
        }
        gl.texParameteri(info.target, gl.TEXTURE_WRAP_S, info.wrap_mode);
        gl.texParameteri(info.target, gl.TEXTURE_WRAP_T, info.wrap_mode);
        if (info.target === gl.TEXTURE_CUBE_MAP) {
            gl.texParameteri(info.target, gl.TEXTURE_WRAP_R, info.wrap_mode);
        }
        gl.bindTexture(texture.target, null);
        return texture;
    }
    bindAsRenderTarget() {
    }
    bind(gl) {
        gl.bindTexture(this.target, this.glTexture_);
    }
    dispose(gl) {
        gl.deleteTexture(this.glTexture_);
    }
    enableAsUnit(gl, unit) {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(this.target, this.glTexture_);
    }
}
exports.default = Texture;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cube = exports.CubeIndices = exports.CubeVertices = void 0;
const Mesh_1 = require("../Mesh");
exports.CubeVertices = new Float32Array([
    0.5, -0.5, -0.5,
    -0.5, -0.5, -0.5,
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    0.5, 0.5, -0.5,
    -0.5, 0.5, -0.5,
    -0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
]);
const uv = new Float32Array([0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1]);
exports.CubeIndices = new Uint16Array([
    2, 1, 0, 3, 2, 0,
    3, 0, 4, 7, 3, 4,
    0, 1, 5, 4, 0, 5,
    1, 2, 6, 5, 1, 6,
    2, 3, 7, 6, 2, 7,
    4, 5, 6, 7, 4, 6,
]);
class Cube extends Mesh_1.default {
    constructor(e, material, indexed, instanceCount) {
        super();
        if (indexed) {
            this.buildIndexed(e, material, instanceCount);
        }
        else {
            this.build(e, material, instanceCount);
        }
    }
    buildIndexed(e, material, instanceCount) {
        this.from(e, {
            vertices: exports.CubeVertices,
            uv: uv,
            index: exports.CubeIndices,
            material
        }, instanceCount || 1);
    }
    build(e, material, instanceCount) {
        const vertices = new Float32Array([
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            -0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            -0.5, -0.5, 0.5,
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
        ]);
        const uv = new Float32Array([
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0,
            1.0, 0.0,
            1.0, 0.0,
            0.0, 0.0,
            0.0, 1.0,
            0.0, 1.0,
            1.0, 1.0,
            1.0, 0.0,
            1.0, 0.0,
            0.0, 0.0,
            0.0, 1.0
        ]);
        this.from(e, {
            vertices,
            uv,
            material,
            index: null,
        }, instanceCount || 1);
    }
}
exports.Cube = Cube;

},{"../Mesh":11}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graticule = exports.Graticules = exports.GraticuleType = void 0;
const Myriahedral_1 = require("./Myriahedral");
var QuadDirection;
(function (QuadDirection) {
    QuadDirection[QuadDirection["Left"] = 0] = "Left";
    QuadDirection[QuadDirection["Right"] = 1] = "Right";
    QuadDirection[QuadDirection["Top"] = 2] = "Top";
    QuadDirection[QuadDirection["Down"] = 3] = "Down";
})(QuadDirection || (QuadDirection = {}));
var GraticuleType;
(function (GraticuleType) {
    GraticuleType[GraticuleType["Cylindrical"] = 0] = "Cylindrical";
    GraticuleType[GraticuleType["Conical"] = 1] = "Conical";
    GraticuleType[GraticuleType["Azimutal"] = 2] = "Azimutal";
    GraticuleType[GraticuleType["AzimutalTwoHemispheres"] = 3] = "AzimutalTwoHemispheres";
    GraticuleType[GraticuleType["Polyconical"] = 4] = "Polyconical";
    GraticuleType[GraticuleType["Strip"] = 5] = "Strip";
})(GraticuleType = exports.GraticuleType || (exports.GraticuleType = {}));
exports.Graticules = [
    {
        type: GraticuleType.Cylindrical,
        parallels: 11,
        name: 'Cylindrical',
    },
    {
        type: GraticuleType.Conical,
        name: 'Conical',
    },
    {
        type: GraticuleType.Azimutal,
        name: 'Azimutal',
    },
    {
        type: GraticuleType.AzimutalTwoHemispheres,
        name: 'Azimutal two hemispheres',
    },
    {
        type: GraticuleType.Polyconical,
        name: 'Polyconical',
    },
    {
        type: GraticuleType.Strip,
        name: 'Strip',
        parallels: 14,
    }
];
class Graticule {
    constructor() {
        this.vertices = [];
        this.faces = new Map();
        this.folds = [];
        this.parallels = 0;
        this.connectedQuads = new Myriahedral_1.MM();
    }
    build(p) {
        var _a;
        this.parallels = (_a = p.parallels) !== null && _a !== void 0 ? _a : 24;
        this.buildVerticesAndFaces();
        this.setEdgesFaceIndices();
        this.connectGraticule(p.type);
        this.filterOutInvalidFaces();
        return this;
    }
    connectGraticule(t) {
        switch (t) {
            case GraticuleType.Azimutal:
                this.connectGraticuleAzimutal();
                break;
            case GraticuleType.AzimutalTwoHemispheres:
                this.connectGraticuleAzimutalTwoHemispheres();
                break;
            case GraticuleType.Conical:
                this.connectGraticuleConical();
                break;
            case GraticuleType.Cylindrical:
                this.connectGraticuleCylindrical();
                break;
            case GraticuleType.Polyconical:
                this.connectGraticulePolyconical();
                break;
            case GraticuleType.Strip:
                this.connectStrip();
                break;
            default:
                throw new Error(`unknown graticule type: ${t}`);
        }
    }
    filterOutInvalidFaces() {
        this.folds = this.folds.filter(f => {
            return f.fromFaceIndex !== null && f.toFaceIndex !== null;
        });
    }
    connectGraticuleCylindrical() {
        this.connectGraticuleCylindricalOrConical((this.parallels / 2) | 0, this.parallels);
    }
    connectGraticuleConical() {
        this.connectGraticuleCylindricalOrConical((this.parallels / 3) | 0, this.parallels);
    }
    connectGraticuleCylindricalOrConical(row, col) {
        this.startFoldsConnections(row, col);
        // horizontal connection
        for (let j = 0; j <= this.parallels; j++) {
            this.connectQuadByDirection(row, col - j, QuadDirection.Left);
            this.connectQuadByDirection(row, col + j, QuadDirection.Right);
        }
        // vertical connections (up)
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < this.parallels * 2; j++) {
                this.connectQuadByDirection(row - i, j, QuadDirection.Top);
            }
        }
        // vertical connections (down)
        const t1 = this.parallels - row;
        for (let i = 0; i < t1; i++) {
            for (let j = 0; j < this.parallels * 2; j++) {
                this.connectQuadByDirection(row + i, j, QuadDirection.Down);
            }
        }
        this.root.parent = null;
    }
    connectStrip() {
        const row = 1;
        const col = 0;
        this.startFoldsConnections(row, col);
        // lines
        for (let i = row; i < this.parallels - 1; i++) {
            if ((i % 2) === 1) {
                for (let j = 0; j < this.parallels * 2; j++) {
                    this.connectQuadByDirection(i, j, QuadDirection.Right);
                }
                this.connectQuadByDirection(i, this.parallels * 2 - 1, QuadDirection.Down);
            }
            else {
                for (let j = this.parallels * 2 - 1; j > 0; j--) {
                    this.connectQuadByDirection(i, j, QuadDirection.Left);
                }
                this.connectQuadByDirection(i, 0, QuadDirection.Down);
            }
        }
        for (let j = 0; j < this.parallels * 2; j++) {
            this.connectQuadByDirection(row, j, QuadDirection.Top);
            this.connectQuadByDirection(this.parallels - 2, j, QuadDirection.Down);
        }
        this.root.parent = null;
    }
    connectGraticuleAzimutalTwoHemispheres() {
        const mid = (this.parallels / 2) | 0;
        this.startFoldsConnections(mid, this.parallels);
        for (let i = 0; i < 2 * this.parallels - 1; i++) {
            this.connectQuadByDirection(0, i, QuadDirection.Right);
            this.connectQuadByDirection(this.parallels - 1, i, QuadDirection.Right);
        }
        for (let i = 0; i < mid; i++) {
            for (let j = 0; j < this.parallels * 2; j++) {
                this.connectQuadByDirection(mid - i - 1, j, QuadDirection.Top);
                this.connectQuadByDirection(mid + i, j, QuadDirection.Down);
            }
        }
        for (let j = 0; j < this.parallels * 2; j++) {
            this.connectQuad(mid, j);
            this.connectQuad(mid - 1, j);
        }
        this.connectQuadByDirection(mid, this.parallels, QuadDirection.Top);
        this.root.parent = null;
    }
    connectGraticuleAzimutal() {
        this.startFoldsConnections(0, 0);
        // horizontal first row
        for (let i = 0; i < 2 * this.parallels - 1; i++) {
            this.connectQuadByDirection(0, i, QuadDirection.Right);
        }
        for (let i = 0; i < this.parallels - 1; i++) {
            for (let j = 0; j < this.parallels * 2; j++) {
                this.connectQuadByDirection(i, j, QuadDirection.Down);
            }
        }
        this.root.parent = null;
    }
    connectGraticulePolyconical() {
        const row = Math.floor(this.parallels / 2);
        this.startFoldsConnections(row, this.parallels);
        for (let i = row; i > 0; i--) {
            this.connectQuadByDirection(i, this.parallels, QuadDirection.Top);
        }
        for (let i = row; i < this.parallels; i++) {
            this.connectQuadByDirection(i, this.parallels, QuadDirection.Down);
        }
        for (let i = 1; i < this.parallels - 1; i++) {
            for (let j = this.parallels; j > 0; j--) {
                this.connectQuadByDirection(i, j, QuadDirection.Left);
            }
            for (let j = this.parallels; j < 2 * this.parallels - 1; j++) {
                this.connectQuadByDirection(i, j, QuadDirection.Right);
            }
        }
        for (let i = 0; i < this.parallels * 2 - 1; i++) {
            this.connectQuadByDirection(0, i, QuadDirection.Right);
            this.connectQuadByDirection(this.parallels - 1, i, QuadDirection.Right);
        }
    }
    faceIndexForQuadAt(row, column, d) {
        return (row * this.parallels * 2 + column) * 2 + (d !== undefined ? 1 : 0);
    }
    startFoldsConnections(row, column) {
        this.root = this.connectQuad(row, column);
    }
    getQuadCommonEdge(row, column) {
        const o = this.faceIndexForQuadAt(row, column);
        return this.faces.get(o).edges[2];
    }
    getTriangleEdge(row, column, inc) {
        let e;
        if (row === 0) {
            const o = this.faceIndexForQuadAt(row, column) + 1;
            e = this.faces.get(o).edges[0];
            e.faceIndices[1] = o + inc;
        }
        else if (row === this.parallels - 1) {
            const o = this.faceIndexForQuadAt(row, column);
            e = this.faces.get(o).edges[1];
            e.faceIndices[1] = o + inc;
        }
        return e;
    }
    getTriangleRightEdge(row, column) {
        return this.getTriangleEdge(row, column, 2);
    }
    getTriangleLeftEdge(row, column) {
        return this.getTriangleEdge(row, column, -2);
    }
    getQuadRightEdge(row, column) {
        const o = this.faceIndexForQuadAt(row, column);
        return this.faces.get(o).edges[1];
    }
    getQuadTopEdge(row, column) {
        const o = this.faceIndexForQuadAt(row, column);
        return this.faces.get(o).edges[0];
    }
    getQuadBottomEdge(row, column) {
        const o = this.faceIndexForQuadAt(row, column, QuadDirection.Down);
        return this.faces.get(o).edges[1];
    }
    getQuadLeftEdge(row, column) {
        const o = this.faceIndexForQuadAt(row, column, QuadDirection.Left);
        return this.faces.get(o).edges[2];
    }
    connectQuad(row, column) {
        let edge = this.connectedQuads.get(row, column);
        if (!edge) {
            edge = new Myriahedral_1.FacesEdge(this.getQuadCommonEdge(row, column));
            this.folds.push(edge);
            this.connectedQuads.insert(row, column, edge);
        }
        return edge;
    }
    connectQuadByDirection(row, column, d) {
        const ne = this.foldByDirection(row, column, d);
        if (ne) {
            this.folds.push(ne);
            return ne;
        }
        else {
            console.error('nono');
        }
        return undefined;
    }
    rowWithQuads(r) {
        return r > 0 && r < this.parallels - 1;
    }
    foldByDirection(row, column, d) {
        let r;
        let nq;
        switch (d) {
            case QuadDirection.Left:
                if (column > 0) {
                    if (this.rowWithQuads(row)) {
                        nq = this.connectQuad(row, column - 1);
                        r = new Myriahedral_1.FacesEdge(this.getQuadLeftEdge(row, column));
                    }
                    else {
                        r = new Myriahedral_1.FacesEdge(this.getTriangleLeftEdge(row, column));
                    }
                }
                break;
            case QuadDirection.Right:
                if (column < 2 * this.parallels - 1) {
                    if (this.rowWithQuads(row)) {
                        nq = this.connectQuad(row, column + 1);
                        r = new Myriahedral_1.FacesEdge(this.getQuadRightEdge(row, column));
                    }
                    else {
                        r = new Myriahedral_1.FacesEdge(this.getTriangleRightEdge(row, column));
                    }
                }
                break;
            case QuadDirection.Top:
                if (row > 0) {
                    if (this.rowWithQuads(row - 1)) {
                        nq = this.connectQuad(row - 1, column);
                    }
                    r = new Myriahedral_1.FacesEdge(this.getQuadTopEdge(row, column));
                }
                break;
            case QuadDirection.Down:
                if (row < this.parallels - 1) {
                    if (this.rowWithQuads(row + 1)) {
                        nq = this.connectQuad(row + 1, column);
                    }
                    r = new Myriahedral_1.FacesEdge(this.getQuadBottomEdge(row, column));
                }
                break;
        }
        if (r) {
            r.parent = this.connectedQuads.get(row, column);
            if (nq && !nq.parent) {
                nq.parent = r;
            }
            else {
                // console.error(`quad fold with parent`);
            }
        }
        return r;
    }
    static spherical(t, u) {
        t *= Math.PI * 2;
        u *= Math.PI;
        return new Myriahedral_1.Vertex(Math.sin(u) * Math.cos(t), Math.cos(u), Math.sin(u) * Math.sin(t));
    }
    buildVerticesAndFaces() {
        const rows = this.parallels;
        const cols = this.parallels * 2;
        const vertexPerRow = cols + 1;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const p0 = Graticule.spherical(j / cols, i / rows);
                const p1 = Graticule.spherical((j + 1) / cols, i / rows);
                const p2 = Graticule.spherical((j + 1) / cols, (i + 1) / rows);
                const p3 = Graticule.spherical(j / cols, (i + 1) / rows);
                const fi0 = this.addFace(p0.clone(), p1.clone(), p2.clone());
                fi0.prevVerticesIndices = [
                    i * vertexPerRow + j,
                    i * vertexPerRow + j + 1,
                    (i + 1) * vertexPerRow + j + 1,
                ];
                const fi1 = this.addFace(p0.clone(), p2.clone(), p3.clone());
                fi1.prevVerticesIndices = [
                    i * vertexPerRow + j,
                    (i + 1) * vertexPerRow + j + 1,
                    (i + 1) * vertexPerRow + j,
                ];
                if (fi0[0] !== fi1[0] || fi0[2] !== fi1[1]) {
                    console.error(`wrong common axis def`);
                }
            }
        }
    }
    addVertex(v) {
        v.index = this.vertices.length;
        this.vertices.push(v);
    }
    addFace(p0, p1, p2) {
        this.addVertex(p0);
        this.addVertex(p1);
        this.addVertex(p2);
        const vertices = [p0, p1, p2];
        const fi = {
            vertices,
            normal: Myriahedral_1.Vertex.normalForVertices(vertices),
            id: this.faces.size,
            prevId: this.faces.size,
            prevVerticesIndices: [p0.index, p1.index, p2.index],
            edges: [
                new Myriahedral_1.Edge(p0.index, p1.index),
                new Myriahedral_1.Edge(p1.index, p2.index),
                new Myriahedral_1.Edge(p2.index, p0.index),
            ],
        };
        this.faces.set(fi.id, fi);
        return fi;
    }
    setEdgesFaceIndices() {
        // edges connections:
        const rows = this.parallels;
        const cols = this.parallels * 2 * 2;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const faceIndex = j + i * cols;
                const faceInfo = this.faces.get(faceIndex);
                const edges = faceInfo.edges;
                if ((faceIndex % 2) === 0) {
                    // top edge. Connect to row above+1
                    this.edgeFaceIndices(edges[0], faceIndex, j + 1 + (i - 1) * cols);
                    // right edge. connect to index+2
                    this.edgeFaceIndices(edges[1], faceIndex, faceIndex + 3);
                    // common edge
                    this.edgeFaceIndices(edges[2], faceIndex, faceIndex + 1);
                }
                else {
                    // common edge
                    this.edgeFaceIndices(edges[0], faceIndex, faceIndex - 1);
                    // bottom edge
                    this.edgeFaceIndices(edges[1], faceIndex, j + (i + 1) * cols - 1);
                    // left edge
                    this.edgeFaceIndices(edges[2], faceIndex, faceIndex - 3);
                }
            }
        }
    }
    edgeFaceIndices(edge, i0, i1) {
        if (i1 >= 0 && i1 < this.faces.size) {
            edge.faceIndices[0] = i0;
            edge.faceIndices[1] = i1;
        }
    }
}
exports.Graticule = Graticule;

},{"./Myriahedral":16}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MM = exports.FacesEdge = exports.Edge = exports.Vertex = void 0;
const Vector3_1 = require("../../math/Vector3");
const Quaternion_1 = require("../../math/Quaternion");
const Graticule_1 = require("./Graticule");
class Vertex {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.index = 0;
    }
    static middle(v0, v1) {
        return new Vertex(v0.x + (v1.x - v0.x) / 2., v0.y + (v1.y - v0.y) / 2., v0.z + (v1.z - v0.z) / 2.);
    }
    normalize() {
        const l = 1 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        this.x *= l;
        this.y *= l;
        this.z *= l;
    }
    dot(o) {
        // assumes normalized.
        return this.x * o.x + this.y * o.y + this.z * o.z;
    }
    clone() {
        const v = new Vertex(this.x, this.y, this.z);
        v.index = this.index;
        return v;
    }
    copy(o) {
        this.x = o.x;
        this.y = o.y;
        this.z = o.z;
    }
    equals(o) {
        return Math.abs(this.x - o.x) < 1e-9 &&
            Math.abs(this.y - o.y) < 1e-9 &&
            Math.abs(this.z - o.z) < 1e-9;
    }
    static normalForVertices(v) {
        const x0 = v[0].x - v[1].x;
        const y0 = v[0].y - v[1].y;
        const z0 = v[0].z - v[1].z;
        const x1 = v[0].x - v[2].x;
        const y1 = v[0].y - v[2].y;
        const z1 = v[0].z - v[2].z;
        const x = y0 * z1 - z0 * y1;
        const y = z0 * x1 - x0 * z1;
        const z = x0 * y1 - y0 * x1;
        const l = Math.sqrt(x * x + y * y + z * z);
        if (l === 0) {
            // there's no normal. Since we are in an goniometric sphere, this should be fine.
            return [v[0].x, v[0].y, v[0].z];
        }
        return [x / l, y / l, z / l];
    }
}
exports.Vertex = Vertex;
class Edge {
    constructor(vertex0, vertex1) {
        this.vertex0 = vertex0;
        this.vertex1 = vertex1;
        this.w0 = 0;
        this.w1 = 0;
        this.wc = 0;
        this.centerIndex = -1; // when an edge is split during recursive subdivision,
        // this is the newly created vertex index.
        // edge info: from->to, face index.
        // two entries per edge.
        this.faceIndices = [null, null]; // polygon index
    }
    facesDirection(i) {
        let v0 = i.fromVertex;
        let v1 = i.toVertex;
        const index = (v0 === this.vertex0 && v1 === this.vertex1) ? 0 : 1;
        this.faceIndices[index] = i.faceIndex;
    }
    swap() {
        [this.faceIndices[0], this.faceIndices[1]] = [this.faceIndices[1], this.faceIndices[0]];
        [this.vertex0, this.vertex1] = [this.vertex1, this.vertex0];
    }
}
exports.Edge = Edge;
let FacesEdge = /** @class */ (() => {
    class FacesEdge {
        constructor(edge) {
            this.edge = edge;
            this.children = [];
            this.orientationMultiplier = 1;
            this.commonAxisVertices = [];
            this.wc = -1;
            this.id = FacesEdge.__id++;
            this.wc = edge.wc;
            this.parent = null;
        }
        get fromFaceIndex() {
            return this.edge.faceIndices[0];
        }
        get toFaceIndex() {
            return this.edge.faceIndices[1];
        }
        get v0() {
            return this.edge.vertex0;
        }
        get v1() {
            return this.edge.vertex1;
        }
        swap() {
            this.edge.swap();
        }
    }
    FacesEdge.__id = 0;
    return FacesEdge;
})();
exports.FacesEdge = FacesEdge;
class MM {
    constructor() {
        this.map = new Map();
    }
    insert(k0, k1, v) {
        let m = this.map.get(k0);
        if (m === undefined) {
            m = new Map();
            this.map.set(k0, m);
        }
        m.set(k1, v);
    }
    get(k0, k1) {
        var _a;
        return (_a = this.map.get(k0)) === null || _a === void 0 ? void 0 : _a.get(k1);
    }
    getI(k0, k1) {
        var _a, _b, _c;
        return (_b = (_a = this.map.get(k0)) === null || _a === void 0 ? void 0 : _a.get(k1)) !== null && _b !== void 0 ? _b : (_c = this.map.get(k1)) === null || _c === void 0 ? void 0 : _c.get(k0);
    }
    clone(predicate) {
        const clone = new MM();
        this.forEach((v, k0, k1) => {
            if (predicate(v, k0, k1)) {
                clone.insert(k0, k1, v);
            }
        });
        return clone;
    }
    delete(k0, k1) {
        var _a;
        (_a = this.map.get(k0)) === null || _a === void 0 ? void 0 : _a.delete(k1);
    }
    forEach(cb) {
        this.map.forEach((mm, k0) => {
            mm.forEach((e, k1) => {
                cb(e, k0, k1);
            });
        });
    }
    exists(k0, k1) {
        var _a;
        return ((_a = this.map.get(k0)) === null || _a === void 0 ? void 0 : _a.get(k1)) !== undefined;
    }
    toArray() {
        const a = [];
        this.forEach(v => a.push(v));
        return a;
    }
    size() {
        let c = 0;
        this.forEach(_ => c++);
        return c;
    }
}
exports.MM = MM;
const knn = Vector3_1.default.create();
const knnP0 = Vector3_1.default.create();
const q0 = Quaternion_1.default.create();
class Myriahedral {
    constructor() {
        // MARK: myriahedron subdivision into.
        this.subdivisions = 6;
        this.edges = new MM(); // v0 -> v1 -> Edge
        // MARK:
        this.originalVertices = [];
        this.vertex = [];
        this.index = [];
    }
    graticule(p) {
        this.name = p.name;
        const gr = new Graticule_1.Graticule().build(p);
        this.vertex = gr.vertices;
        this.facesInfo = gr.faces;
        this.foldsMST = gr.folds;
        this.index = [];
        gr.faces.forEach(f => {
            f.vertices.forEach(v => {
                this.index.push(v.index);
            });
        });
        const tunfold = Date.now();
        this.unfoldSetup(false);
        console.log(`normalization+retriangulate+unfold time ${Date.now() - tunfold}ms`);
        this.folds = this.foldsMST.map(e => {
            return {
                f0: e.edge.faceIndices[0],
                f1: e.edge.faceIndices[1],
            };
        });
        this.cuts = [];
        return this;
    }
    myriahedron(p) {
        var _a, _b;
        this.name = p.name;
        if (p.unfold === undefined) {
            p.unfold = true;
        }
        this.miryahedronGeometry = p.geometry;
        this.subdivisions = (_a = p.subdivisions) !== null && _a !== void 0 ? _a : 5;
        this.buildMyriahedron(p.geometry, (_b = p.normalize) !== null && _b !== void 0 ? _b : true);
        // get only actual edges, not the ones used to subdivide.
        this.edges = this.edges.clone(v => {
            return v.centerIndex === -1;
        });
        let tMST = Date.now();
        this.foldsMST = this.calcMST(this.transformVertEdgesToFaceEdges());
        console.log(`MST calc time ${Date.now() - tMST}ms.`);
        // FOLDS
        // clone this.edges into edgesMST
        const edgesMST = this.edges.clone(_ => {
            return true;
        });
        // CUTS (not needed but beautiful to visualise)
        // all non fold edges, are cut.
        // folds are face-face edges, so use original vertices edge.
        this.foldsMST.forEach(f => {
            edgesMST.delete(f.edge.vertex0, f.edge.vertex1);
            edgesMST.delete(f.edge.vertex1, f.edge.vertex0);
        });
        this.cuts = [];
        edgesMST.forEach(v => {
            this.cuts.push(v);
        });
        if (!p.unfold) {
            this.uv = this.calculateUV();
        }
        else {
            const tunfold = Date.now();
            this.unfoldSetup(true);
            console.log(`normalization+retriangulate+unfold time ${Date.now() - tunfold}ms`);
        }
        this.folds = this.foldsMST.map(e => {
            return {
                f0: e.edge.faceIndices[0],
                f1: e.edge.faceIndices[1],
            };
        });
        return this;
    }
    edgesFromFaces(fs) {
        const edges = [];
        fs.forEach(f => {
            for (let i = 0; i < f.length; i++) {
                edges.push([f[i], f[(i + 1) % f.length]]);
            }
        });
        const edgesMap = new MM();
        edges.forEach(e => {
            if (edgesMap.getI(e[0], e[1]) === undefined) {
                edgesMap.insert(e[0], e[1], e);
            }
        });
        const retEdges = [];
        edgesMap.forEach(e => {
            retEdges.push(e);
        });
        return retEdges;
    }
    buildMyriahedron(geometry, normalize) {
        const tbm = Date.now();
        geometry.vertices.forEach(v => {
            this.insertVertex(new Vertex(v[0], v[1], v[2]));
        });
        if (geometry.edges === undefined) {
            geometry.edges = this.edgesFromFaces(geometry.faces);
        }
        for (const e of geometry.edges) {
            this.insertEdge(this.vertex[e[0]], this.vertex[e[1]], 0);
        }
        geometry.faces.forEach(f => this.recurse(1, f[0], f[1], f[2]));
        if (normalize) {
            this.normalizeGeometry();
        }
        console.log(`myriahedron build time ${Date.now() - tbm}ms`);
    }
    calcMST(faceEdges) {
        const helper = new MM(); // faceid -> faceid -> faceEdge
        faceEdges.forEach(e => {
            e.wc *= -1;
            let f0 = e.edge.faceIndices[0];
            let f1 = e.edge.faceIndices[1];
            helper.insert(f0, f1, e);
            helper.insert(f1, f0, e);
        });
        const treeFaces = [];
        treeFaces.push(faceEdges[0].edge.faceIndices[0]);
        const treeFacesSet = new Map();
        treeFacesSet.set(faceEdges[0].edge.faceIndices[0], faceEdges[0]);
        const treeEdges = [];
        treeEdges.push(faceEdges[0]);
        while (treeFacesSet.size !== this.index.length / 3) {
            let minFace = -1;
            let minEdge = null;
            let minWC = Number.MAX_VALUE;
            let nextFace = -1;
            treeFaces.forEach(face => {
                // find minimum wc of any edge outgoing from face edge
                helper.map.get(face).forEach((e, faceKey) => {
                    if (!treeFacesSet.has(faceKey) && e.wc < minWC) {
                        minEdge = e;
                        minWC = e.wc;
                        nextFace = faceKey;
                        minFace = face;
                    }
                });
            });
            if (minEdge) {
                const parent = treeFacesSet.get(minFace);
                // is not the same edge in different faces. e.g. `this.parent=this`
                if (parent.edge !== minEdge.edge) {
                    helper.map.get(nextFace).delete(minFace);
                    helper.map.get(minFace).delete(nextFace);
                    treeFaces.push(nextFace);
                    treeEdges.push(minEdge);
                    if (parent) {
                        minEdge.parent = parent;
                    }
                }
                treeFacesSet.set(nextFace, minEdge);
            }
            else {
                console.error(`no more edges`);
                break;
            }
        }
        return treeEdges;
    }
    // form Edge to EdgeFace.
    // EdgeFace keeps a directional Edge information (from face to face) based on
    // edge's vertices traversal direction.
    // 	v0 -> v1 -> F0
    // 	v1 -> v0 -> F1
    transformVertEdgesToFaceEdges() {
        this.faceEdges = new MM();
        let degenerated = 0;
        this.edges.forEach(edge => {
            if (edge.faceIndices[0] !== null && edge.faceIndices[1] !== null) {
                this.faceEdges.insert(edge.faceIndices[0], edge.faceIndices[1], new FacesEdge(edge));
            }
            else {
                degenerated++;
            }
        });
        console.log(`edges: ${this.edges.size()}, faceEdges: ${this.faceEdges.size()}, degenerated: ${degenerated}`);
        return this.faceEdges.toArray();
    }
    getMeshData() {
        const vertices = new Float32Array(this.vertex.length * 3);
        this.vertex.forEach((v, i) => {
            vertices[i * 3] = v.x;
            vertices[i * 3 + 1] = v.y;
            vertices[i * 3 + 2] = v.z;
        });
        return {
            vertices,
            index: this.index !== null ? new Uint16Array(this.index) : null,
            uv: this.uv,
            folds: this.folds,
            cuts: this.cuts,
            foldsMST: this.foldsMST,
        };
    }
    calculateUV(ox, oy) {
        const uv = new Float32Array(this.originalVertices.length * 2);
        ox = ox !== null && ox !== void 0 ? ox : 0;
        oy = oy !== null && oy !== void 0 ? oy : 0;
        this.originalVertices.forEach((v, i) => {
            uv[i * 2] = .5 + (ox + Math.atan2(v.x, v.z)) / (2 * Math.PI);
            uv[i * 2 + 1] = .5 - (oy + Math.asin(v.y)) / Math.PI;
        });
        // check for extreme uv offsets.
        this.facesInfo.forEach(fi => {
            const o0 = fi.vertices[0].index * 2;
            const u0 = uv[o0];
            const v0 = uv[o0 + 1];
            const o1 = fi.vertices[1].index * 2;
            const u1 = uv[o1];
            const v1 = uv[o1 + 1];
            const o2 = fi.vertices[2].index * 2;
            const u2 = uv[o2];
            const v2 = uv[o2 + 1];
            if (Math.abs(u0 - u1) > .5 || Math.abs(u2 - u0) > .5 || Math.abs(u2 - u1) > .5) {
                if (u0 < .5) {
                    uv[o0] += 1;
                }
                if (u1 < .5) {
                    uv[o1] += 1;
                }
                if (u2 < .5) {
                    uv[o2] += 1;
                }
            }
            if (Math.abs(v0 - v1) > .5 || Math.abs(v2 - v0) > .5 || Math.abs(v2 - v1) > .5) {
                if (v0 < .5) {
                    uv[o0 + 1] += 1;
                }
                if (v1 < .5) {
                    uv[o1 + 1] += 1;
                }
                if (v2 < .5) {
                    uv[o2 + 1] += 1;
                }
            }
        });
        return uv;
    }
    insertVertex(v) {
        v.index = this.vertex.length;
        this.vertex.push(v);
    }
    insertEdge(v0, v1, level) {
        if (this.edges.exists(v0.index, v1.index)) {
            console.log(`insert of duplicated edge`);
            return;
        }
        const e = new Edge(v0.index, v1.index);
        e.w0 = level;
        e.w1 = level;
        e.wc = level + 1;
        this.edges.insert(v0.index, v1.index, e);
        return e;
    }
    edgesFacesDirection(v0i, v1i, v2i) {
        this.edges.getI(v0i, v1i).facesDirection({
            fromVertex: v0i,
            toVertex: v1i,
            faceIndex: this.index.length / 3
        });
        this.edges.getI(v1i, v2i).facesDirection({
            fromVertex: v1i,
            toVertex: v2i,
            faceIndex: this.index.length / 3
        });
        this.edges.getI(v2i, v0i).facesDirection({
            fromVertex: v2i,
            toVertex: v0i,
            faceIndex: this.index.length / 3
        });
        this.index.push(v0i, v1i, v2i);
    }
    /**
     * recurse edges v01-v1i, v1i-v2i, v2i-v0i
     * @param level
     * @param v0i
     * @param v1i
     * @param v2i
     */
    recurse(level, v0i, v1i, v2i) {
        if (level === this.subdivisions) {
            this.edgesFacesDirection(v0i, v1i, v2i);
            return;
        }
        const mv0v1 = this.edges.getI(v0i, v1i);
        if (mv0v1.centerIndex === -1) {
            this.splitEdge(mv0v1);
        }
        const mv1v2 = this.edges.getI(v1i, v2i);
        if (mv1v2.centerIndex === -1) {
            this.splitEdge(mv1v2);
        }
        const mv2v0 = this.edges.getI(v2i, v0i);
        if (mv2v0.centerIndex === -1) {
            this.splitEdge(mv2v0);
        }
        this.insertEdge(this.vertex[mv0v1.centerIndex], this.vertex[mv2v0.centerIndex], level);
        this.insertEdge(this.vertex[mv0v1.centerIndex], this.vertex[mv1v2.centerIndex], level);
        this.insertEdge(this.vertex[mv2v0.centerIndex], this.vertex[mv1v2.centerIndex], level);
        this.recurse(level + 1, v0i, mv0v1.centerIndex, mv2v0.centerIndex);
        this.recurse(level + 1, mv0v1.centerIndex, v1i, mv1v2.centerIndex);
        this.recurse(level + 1, mv1v2.centerIndex, mv2v0.centerIndex, mv0v1.centerIndex);
        this.recurse(level + 1, mv2v0.centerIndex, mv1v2.centerIndex, v2i);
    }
    splitEdge(e) {
        const v0v1 = Vertex.middle(this.vertex[e.vertex0], this.vertex[e.vertex1]);
        this.insertVertex(v0v1);
        e.centerIndex = v0v1.index;
        if (!this.edges.getI(e.vertex0, v0v1.index)) {
            const e0 = this.insertEdge(this.vertex[e.vertex0], v0v1, 0);
            e0.w0 = e.w0;
            e0.w1 = e.wc;
            e0.wc = (e.w0 + e.wc) / 2;
        }
        else {
            console.error('splitting unknown edge.');
        }
        if (!this.edges.getI(v0v1.index, e.vertex1)) {
            const e1 = this.insertEdge(v0v1, this.vertex[e.vertex1], 0);
            e1.w0 = e.wc;
            e1.w1 = e.w1;
            e1.wc = (e.wc + e.w1) / 2;
        }
        else {
            console.error('splitting unknown edge.');
        }
    }
    buildFoldingTree() {
        this.roots = this.foldsMST.filter(e => {
            return e.parent === null;
        });
        if (this.roots.length > 1) {
            console.warn(`${this.name} more than one root: ${this.roots.length}`);
        }
        const root = this.roots[0];
        const processed = new Set();
        processed.add(root.id);
        this.buildFoldingTreeImpl(processed, root.fromFaceIndex, root);
        this.buildFoldingTreeImpl(processed, root.toFaceIndex, root);
        root.swap();
    }
    buildFoldingTreeImpl(processed, parent, nodeParent) {
        const children = this.foldsMST.filter(f => {
            return !processed.has(f.id) && (f.fromFaceIndex === parent || f.toFaceIndex === parent);
        });
        children.forEach(f => {
            if (!processed.has(f.id)) {
                if (f.fromFaceIndex !== parent) {
                    f.swap();
                }
                if (nodeParent !== null) {
                    nodeParent.children.push(f);
                }
                f.parent = nodeParent;
                processed.add(f.id);
            }
        });
        children.forEach(c => {
            this.buildFoldingTreeImpl(processed, c.toFaceIndex, c);
            this.buildFoldingTreeImpl(processed, c.fromFaceIndex, c);
        });
    }
    normalizeGeometry() {
        this.vertex.forEach((v) => {
            v.normalize();
        });
    }
    checkAllTrianglesComplete(faces) {
        let c = 0;
        let inc = {};
        faces.forEach((f, faceIndex) => {
            if (f.length !== 3) {
                c++;
                inc[faceIndex] = f;
            }
        });
        if (c !== 0) {
            console.log(inc);
            throw new Error(`incomplete faces: ${c}`);
        }
    }
    reTriangulateGeometry() {
        const newVertices = [];
        const newIndex = [];
        const faces = new Map(); // faceId, vertices
        const process = (edge, f0) => {
            let ar = faces.get(f0);
            if (ar === undefined) {
                ar = [];
                faces.set(f0, ar);
            }
            if (ar.indexOf(edge) === -1) {
                ar.push(edge);
            }
        };
        const addCut = (c) => {
            process(c, c.faceIndices[0]);
            process(c, c.faceIndices[1]);
        };
        const addFold = (fold) => {
            process(fold.edge, fold.fromFaceIndex);
            process(fold.edge, fold.toFaceIndex);
        };
        this.foldsMST.forEach(fold => {
            addFold(fold);
        });
        this.cuts.forEach(c => {
            addCut(c);
        });
        this.checkAllTrianglesComplete(faces);
        const faceRemap = new Map();
        this.facesInfo = new Map();
        // build new geometry.
        // number of faces is constant.
        faces.forEach((edges, faceIndex) => {
            const vertices = [
                this.index[faceIndex * 3],
                this.index[faceIndex * 3 + 1],
                this.index[faceIndex * 3 + 2]
            ];
            const nv0 = this.vertex[vertices[0]].clone();
            nv0.index = newVertices.length;
            const nv1 = this.vertex[vertices[1]].clone();
            nv1.index = newVertices.length + 1;
            const nv2 = this.vertex[vertices[2]].clone();
            nv2.index = newVertices.length + 2;
            newVertices.push(nv0, nv1, nv2);
            const i = newIndex.length;
            newIndex.push(i, i + 1, i + 2);
            const ni = (i / 3) | 0;
            faceRemap.set(faceIndex, ni);
            const originalVertices = [nv0, nv1, nv2];
            // this would work too, but I want debug normal in the center of each face.
            // const normal = this.normalForVertices(originalVertices);
            const normal = Myriahedral.getCenterPoint(originalVertices, true);
            this.facesInfo.set(ni, {
                id: ni,
                prevId: faceIndex,
                edges,
                vertices: originalVertices,
                prevVerticesIndices: vertices,
                normal,
            });
        });
        this.edges.forEach(e => {
            e.faceIndices[0] = faceRemap.get(e.faceIndices[0]);
            e.faceIndices[1] = faceRemap.get(e.faceIndices[1]);
        });
        this.vertex = newVertices;
        this.index = newIndex;
    }
    unfoldSetup(needsRetriangulation) {
        var _a, _b;
        this.buildFoldingTree();
        if (needsRetriangulation) {
            this.reTriangulateGeometry();
        }
        this.originalVertices = this.vertex;
        this.uv = this.calculateUV();
        this.setFoldsOrientations();
        console.log(`Debug info:`);
        if (this.miryahedronGeometry) {
            console.log(`  Original: ${this.miryahedronGeometry.vertices.length}-${this.miryahedronGeometry.faces.length}-${this.miryahedronGeometry.edges.length}`);
        }
        console.log(`  Geometry: ${this.originalVertices.length}-${this.facesInfo.size}`);
        console.log(`  Folds/Cuts: ${this.foldsMST.length}/${(_b = (_a = this.cuts) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0}`);
    }
    static getCenterPoint(v, normalize) {
        let nx = (v[0].x + v[1].x + v[2].x) / 3;
        let ny = (v[0].y + v[1].y + v[2].y) / 3;
        let nz = (v[0].z + v[1].z + v[2].z) / 3;
        if (normalize) {
            const l = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz);
            nx *= l;
            ny *= l;
            nz *= l;
        }
        return [nx, ny, nz];
    }
    setFoldsOrientations() {
        this.foldsMST.forEach(fold => this.setupCommonrotationAxisVertices(fold));
        this.setupGeometry();
        this.roots.forEach(root => {
            this.calculateOrientations(root);
        });
    }
    static dot(v0, v1) {
        return v0[0] * v1[0] + v0[1] * v1[1] + v0[2] * v1[2];
    }
    /**
     * Calculate fold angles before/after rotation over common axis to determine what is inwards-outwards.
     * We expect the myriahedron to be 100% flat after unfolding process.
     */
    calculateOrientations(node) {
        node.children.forEach(c => {
            this.calculateOrientations(c);
        });
        // get starting angle
        const n0 = this.facesInfo.get(node.fromFaceIndex).normal;
        const n1 = this.facesInfo.get(node.toFaceIndex).normal;
        const angle0 = Myriahedral.dot(n0, n1);
        // rotate around common axis
        this.setupQuaternionFor(node, 1);
        const vref = node.commonAxisVertices[0];
        this.facesInfo.get(node.toFaceIndex).vertices.forEach(v => {
            Myriahedral.rotateWith(q0, v, vref);
        });
        const newN1 = this.normalForFaceIndex(node.toFaceIndex);
        // get new angle
        const angle1 = Myriahedral.dot(n0, newN1);
        // set unfolding orientation
        node.orientationMultiplier = (angle1 < angle0) ? -1 : 1;
        // restore rotated face vertices
        const f = this.facesInfo.get(node.toFaceIndex);
        f.vertices.forEach((v, i) => {
            f.vertices[i].copy(this.originalVertices[v.index]);
        });
    }
    setupCommonrotationAxisVertices(fold) {
        const fi0 = this.facesInfo.get(fold.fromFaceIndex);
        const fi1 = this.facesInfo.get(fold.toFaceIndex);
        const rotationEdgeVerticesIndices = fi0.prevVerticesIndices.filter(v => {
            return fi1.prevVerticesIndices.indexOf(v) !== -1; // valores comunes
        });
        fold.commonAxisVertices = rotationEdgeVerticesIndices.map(v => {
            return fi0.vertices[fi0.prevVerticesIndices.indexOf(v)];
        });
        // not the same vertices indices. Graticule uses an ad-hoc triangle pairing process,
        // and this might not work as expected. Check for diff points.
        if (fold.commonAxisVertices.length !== 2) {
            fold.commonAxisVertices = fi0.vertices.filter(v => {
                return fi1.vertices.find(v0 => v0.equals(v));
            });
        }
    }
    unfoldProcess(scale) {
        // let t = Date.now();
        this.roots.forEach(f => this.unfoldImpl(f, scale));
        // t = Date.now() - t;
        // console.log(`unfold vertices took ${t}ms.`);
    }
    setupGeometry() {
        this.vertex = this.originalVertices.map(v => {
            return v.clone();
        });
        this.facesInfo.forEach(f => {
            f.vertices.forEach((v, i) => {
                f.vertices[i] = this.vertex[v.index];
            });
            f.normal = Vertex.normalForVertices(f.vertices);
        });
    }
    unfold(scale) {
        this.setupGeometry();
        this.unfoldProcess(scale);
        this.folds = this.foldsMST.map(e => {
            return {
                f0: e.edge.faceIndices[0],
                f1: e.edge.faceIndices[1],
            };
        });
    }
    normalForFaceIndex(i) {
        return Vertex.normalForVertices(this.facesInfo.get(i).vertices);
    }
    unfoldImpl(node, scale) {
        node.children.forEach(c => {
            this.unfoldImpl(c, scale);
        });
        this.unfoldNodeRec(node, scale);
    }
    setupQuaternionFor(node, scale) {
        const fi0 = this.facesInfo.get(node.fromFaceIndex);
        const fi1 = this.facesInfo.get(node.toFaceIndex);
        const N0 = fi0.normal;
        const N1 = fi1.normal;
        const ac = Math.max(-1, Math.min(1, Myriahedral.dot(N0, N1)));
        let diffAngle = scale *
            Math.acos(ac) *
            node.orientationMultiplier;
        const rotationEdgeVertices = node.commonAxisVertices;
        knn[0] = rotationEdgeVertices[1].x - rotationEdgeVertices[0].x;
        knn[1] = rotationEdgeVertices[1].y - rotationEdgeVertices[0].y;
        knn[2] = rotationEdgeVertices[1].z - rotationEdgeVertices[0].z;
        const e = Vector3_1.default.normalize(knn, knn);
        Quaternion_1.default.fromAxisAndAngle(q0, e, diffAngle);
    }
    unfoldNodeRec(node, scale) {
        this.setupQuaternionFor(node, scale);
        this.rotatePointRecQuaterion(node, node.commonAxisVertices[0], q0);
    }
    rotatePointRecQuaterion(n, vref, q0) {
        n.children.forEach(c => {
            this.rotatePointRecQuaterion(c, vref, q0);
        });
        this.facesInfo.get(n.toFaceIndex).vertices.forEach(v => {
            Myriahedral.rotateWith(q0, v, vref);
        });
    }
    static rotateWith(q0, v, vref) {
        knnP0[0] = v.x - vref.x;
        knnP0[1] = v.y - vref.y;
        knnP0[2] = v.z - vref.z;
        const rp0 = Quaternion_1.default.rotate(q0, knnP0);
        v.x = rp0[0] + vref.x;
        v.y = rp0[1] + vref.y;
        v.z = rp0[2] + vref.z;
    }
}
exports.default = Myriahedral;

},{"../../math/Quaternion":2,"../../math/Vector3":4,"./Graticule":15}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcosahedronGeometry = exports.CubeGeometry = exports.TetrahedronGeometry = exports.OctahedronGeometry = void 0;
exports.OctahedronGeometry = {
    name: 'octahedron',
    vertices: [
        [0, 1, 0],
        [1, 0, 0],
        [0, 0, -1],
        [-1, 0, 0],
        [0, 0, 1],
        [0, -1, 0]
    ],
    faces: [
        [0, 1, 2],
        [0, 2, 3],
        [0, 3, 4],
        [0, 4, 1],
        [5, 2, 1],
        [5, 3, 2],
        [5, 4, 3],
        [5, 1, 4]
    ]
};
exports.TetrahedronGeometry = {
    name: 'tetrahedron',
    vertices: [
        [0.0, -1.0, 2.0],
        [1.73205081, -1.0, -1.0],
        [-1.73205081, -1.0, -1.0],
        [0.0, 2.0, 0.0],
    ],
    edges: [[2, 0], [0, 1], [3, 0], [1, 2], [2, 3], [3, 1]],
    faces: [
        [0, 2, 1],
        [0, 3, 2],
        [0, 1, 3],
        [1, 2, 3],
    ]
};
exports.CubeGeometry = {
    name: 'cube',
    vertices: [
        [0.5, -0.5, -0.5],
        [-0.5, -0.5, -0.5],
        [-0.5, -0.5, 0.5],
        [0.5, -0.5, 0.5],
        [0.5, 0.5, -0.5],
        [-0.5, 0.5, -0.5],
        [-0.5, 0.5, 0.5],
        [0.5, 0.5, 0.5],
    ],
    faces: [
        [2, 1, 0], [3, 2, 0],
        [3, 0, 4], [7, 3, 4],
        [0, 1, 5], [4, 0, 5],
        [1, 2, 6], [5, 1, 6],
        [2, 3, 7], [6, 2, 7],
        [4, 5, 6], [7, 4, 6],
    ],
    edges: [
        [2, 0], [3, 0], [3, 4],
        [0, 1], [4, 0], [0, 5],
        [1, 2], [5, 1], [1, 6],
        [2, 3], [3, 7], [6, 2],
        [2, 7], [4, 5], [5, 6],
        [7, 4], [4, 6], [6, 7]
    ]
};
exports.IcosahedronGeometry = {
    name: 'icosahedron',
    vertices: [
        [-0.26286500, 0, 0.42532500],
        [0.26286500, 0, 0.42532500],
        [-0.26286500, 0, -0.42532500],
        [0.26286500, 0, -0.42532500],
        [0, 0.42532500, 0.26286500],
        [0, 0.42532500, -0.26286500],
        [0, -0.42532500, 0.26286500],
        [0, -0.42532500, -0.26286500],
        [0.42532500, 0.26286500, 0],
        [-0.42532500, 0.26286500, 0],
        [0.42532500, -0.26286500, 0],
        [-0.42532500, -0.26286500, 0],
    ],
    faces: [
        [0, 6, 1],
        [0, 11, 6],
        [1, 4, 0],
        [1, 8, 4],
        [1, 10, 8],
        [2, 5, 3],
        [2, 9, 5],
        [2, 11, 9],
        [3, 7, 2],
        [3, 10, 7],
        [4, 8, 5],
        [4, 9, 0],
        [5, 8, 3],
        [5, 9, 4],
        [6, 10, 1],
        [6, 11, 7],
        [7, 10, 6],
        [7, 11, 2],
        [8, 10, 3],
        [9, 11, 0]
    ]
};

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentMapShader = void 0;
const Shader_1 = require("./Shader");
class EnvironmentMapShader extends Shader_1.default {
    constructor(gl, refractive) {
        super({
            gl,
            vertex: `#version 300 es
			
				precision mediump float;
				
				layout (location = 0) in vec3 aPosition;
				layout (location = 1) in vec3 aNormal;
				layout (location = 2) in mat4 aModel;
				
				uniform mat4 uProjection;
				uniform mat4 uModelView;
				
				out vec3 vNormal;
				out vec3 vModelPosition;
				
				void main() {					
					vModelPosition = vec3(aModel * vec4(aPosition, 1.0));
					// to cope with non uniform scales (normal matrix)
					// bugbug: calculate in cpu, and pass as another instance attribute.
					vNormal = mat3(transpose(inverse(aModel)))*aNormal;	
					gl_Position = uProjection * uModelView * aModel * vec4(aPosition, 1.0);
				}
			`,
            fragment: `#version 300 es
			
				precision mediump float;
				
				uniform samplerCube uSkybox;
				uniform vec3 uCameraPos;
				uniform float uRefractionFactor;
				
				in vec3 vNormal;
				in vec3 vModelPosition;
				
				out vec4 color;
				
				#ifdef REFRACTIVE
				
								
					vec4 refraction() {
						float ratio = 1.00 / uRefractionFactor;
						vec3 I = normalize(vModelPosition-uCameraPos);
						vec3 R = refract(I, normalize(vNormal), ratio);
						return texture(uSkybox, R);
					}				
					
					void main() {
						color = refraction();
					}
				#else 
					vec4 reflection() {
						vec3 I = normalize(vModelPosition-uCameraPos);
						vec3 R = reflect(I, normalize(vNormal));
						return texture(uSkybox, R);				
					}
					
					void main() {
						color = reflection();
					}
				#endif
			`,
            uniforms: ['uProjection', 'uModelView', 'uSkybox', 'uCameraPos', 'uRefractionFactor'],
            attributes: ['aPosition', 'aNormal', 'aModel'],
            defines: refractive ? { 'REFRACTIVE': '1' } : {}
        });
        if (refractive) {
            this.use();
            this.set1F("uRefractionFactor", 1.52);
            this.notUse();
        }
    }
    render(e, info, rc) {
        const gl = e.gl;
        this.use();
        this.setMatrix4fv("uProjection", false, e.projectionMatrix());
        rc.getMaterial().definition.diffuse.enableAsUnit(gl, 0);
        this.set1I("uSkybox", 0);
        this.setMatrix4fv("uModelView", false, e.cameraMatrix());
        const cameraPos = e.cameraPosition();
        this.set3F("uCameraPos", cameraPos[0], cameraPos[1], cameraPos[2]);
        gl.bindVertexArray(info.vao);
        info.instanceBuffer.draw(gl, info.vertexCount, info.instanceCount);
        // if (info.indexBuffer !== null) {
        // 	gl.drawElementsInstanced(gl.TRIANGLES, info.vertexCount, gl.UNSIGNED_SHORT, 0, info.instanceCount);
        // } else {
        // 	gl.drawArraysInstanced(gl.TRIANGLES, 0, info.vertexCount, info.instanceCount);
        // }
        gl.bindVertexArray(null);
        this.notUse();
    }
    createVAO(gl, geometryInfo, material) {
        var _a;
        const instanceCount = geometryInfo.instanceCount || 1;
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        for (let i = 0; i < 5; i++) {
            gl.enableVertexAttribArray(i);
        }
        const glGeometryBuffer = Shader_1.default.createAttributeInfo(gl, 0, geometryInfo.vertex, 12, 0);
        const glNormalBuffer = Shader_1.default.createAttributeInfo(gl, 1, geometryInfo.normal, 12, 0);
        const glInstancedModelMatrixBuffer = Shader_1.default.createInstancedModelMatrix(gl, instanceCount, 2, !!geometryInfo.index);
        let glBufferIndex = null;
        let vertexCount = (geometryInfo.vertex.length / 3) | 0;
        if (geometryInfo.index !== null) {
            glBufferIndex = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glBufferIndex);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometryInfo.index, gl.STATIC_DRAW);
            vertexCount = geometryInfo.index.length;
        }
        // restore null vao
        gl.bindVertexArray(null);
        return {
            shader: this,
            vao,
            geometryBuffer: glGeometryBuffer,
            normalBuffer: glNormalBuffer,
            instanceBuffer: glInstancedModelMatrixBuffer,
            instanceCount: instanceCount,
            indexBuffer: glBufferIndex,
            vertexCount,
            uvBuffer: null,
            renderMode: (_a = material.renderMode) !== null && _a !== void 0 ? _a : this._gl.TRIANGLES,
        };
    }
}
exports.EnvironmentMapShader = EnvironmentMapShader;

},{"./Shader":20}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shader_1 = require("./Shader");
const Matrix4_1 = require("../../math/Matrix4");
/**
 * just draw geometry in a plain pink color
 */
class NullShader extends Shader_1.default {
    constructor(gl) {
        super({
            gl,
            vertex: `#version 300 es
				
				precision mediump float;

				layout(location = 0) in vec3 aPosition;
				
				uniform mat4 uProjection;
				uniform mat4 uModelView;
				uniform mat4 uModelTransform;

				void main() {
					gl_Position = uProjection * uModelView * uModelTransform * vec4(aPosition, 1.0);
					gl_PointSize = 5.0;
				
				}
			`,
            fragment: `#version 300 es
				
				precision mediump float; 
				
				uniform vec4 uColor;
				
				out vec4 color;

				void main() {
					color = uColor;
				}
			`,
            attributes: ["aPosition"],
            uniforms: ["uProjection", "uModelView", "uModelTransform", "uColor"]
        });
        this.setMatrix4fv("uProjection", false, Matrix4_1.default.create());
        this.setMatrix4fv("uModelView", false, Matrix4_1.default.create());
    }
    render(e, info, rc) {
        const gl = e.gl;
        this.use();
        this.setMatrix4fv("uProjection", false, e.projectionMatrix());
        this.setMatrix4fv("uModelView", false, e.cameraMatrix());
        this.setMatrix4fv("uModelTransform", false, rc.getMatrix());
        this.set4FV("uColor", rc.getMaterial().definition.color);
        gl.bindVertexArray(info.vao);
        if (info.indexBuffer !== null) {
            gl.drawElements(info.renderMode, info.vertexCount, gl.UNSIGNED_SHORT, 0);
        }
        else {
            gl.drawArrays(info.renderMode, 0, info.vertexCount);
        }
        gl.bindVertexArray(null);
        this.notUse();
    }
    createVAO(gl, geometryInfo, material) {
        var _a;
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        for (let i = 0; i < 1; i++) {
            gl.enableVertexAttribArray(i);
        }
        const instanceCount = geometryInfo.instanceCount || 1;
        const glGeometryBuffer = Shader_1.default.createAttributeInfo(gl, 0, geometryInfo.vertex, 12, 0);
        let glBufferIndex = null;
        let vertexCount = (geometryInfo.vertex.length / 3) | 0;
        if (geometryInfo.index) {
            glBufferIndex = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glBufferIndex);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometryInfo.index, gl.STATIC_DRAW);
            vertexCount = geometryInfo.index.length;
        }
        gl.bindVertexArray(null);
        return {
            shader: this,
            vao,
            instanceCount,
            vertexCount,
            geometryBuffer: glGeometryBuffer,
            normalBuffer: null,
            instanceBuffer: null,
            indexBuffer: glBufferIndex,
            uvBuffer: null,
            renderMode: (_a = material.renderMode) !== null && _a !== void 0 ? _a : this._gl.TRIANGLES,
        };
    }
}
exports.default = NullShader;

},{"../../math/Matrix4":1,"./Shader":20}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelMatrixInstancingInfo = void 0;
// make instancing batches taking at most MAX_BUFFER_INSTANCE bytes.
const BYTES_PER_INSTANCE = 16 * 4;
const MAX_BUFFER_INSTANCE = 65536;
class ModelMatrixInstancingInfo {
    constructor(gl, aid, instanceCount, indexed) {
        this.attributeIndex = aid;
        this.isIndexed = indexed;
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        const fbuffer = new Float32Array(instanceCount * 16);
        gl.bufferData(gl.ARRAY_BUFFER, fbuffer, gl.DYNAMIC_DRAW);
        this.instanceCount = instanceCount;
    }
    dispose(gl) {
        gl.deleteBuffer(this.buffer);
    }
    draw(gl, vertexCount, instanceCount) {
        instanceCount = Math.min(instanceCount, this.instanceCount);
        // batch instances info.
        // any mobile gpu would probably limit the buffer to 16k
        // any desktop will be ok with 65k instances.
        const batches = Math.max(1, ((instanceCount * BYTES_PER_INSTANCE) / MAX_BUFFER_INSTANCE) | 0);
        const maxInstancesPerBatch = batches === 0 ? instanceCount : MAX_BUFFER_INSTANCE / BYTES_PER_INSTANCE;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        for (let i = 0; i < 4; i++) {
            gl.enableVertexAttribArray(this.attributeIndex + i);
            gl.vertexAttribDivisor(this.attributeIndex + i, 1);
        }
        for (let j = 0; j < batches; j++) {
            const count = j < batches - 1 ?
                maxInstancesPerBatch :
                instanceCount - (batches - 1) * maxInstancesPerBatch;
            for (let i = 0; i < 4; i++) {
                gl.vertexAttribPointer(this.attributeIndex + i, 4, gl.FLOAT, false, 64, i * 16 + j * MAX_BUFFER_INSTANCE);
            }
            if (this.isIndexed) {
                gl.drawElementsInstanced(gl.TRIANGLES, vertexCount, gl.UNSIGNED_SHORT, 0, count);
            }
            else {
                gl.drawArraysInstanced(gl.TRIANGLES, 0, vertexCount, count);
            }
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
    updateWith(gl, locals) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, locals, 0, Math.min(this.instanceCount * 16, locals.length));
    }
}
exports.ModelMatrixInstancingInfo = ModelMatrixInstancingInfo;
/**
 *
 */
class Shader {
    constructor(init) {
        this._uniforms = {};
        this._attributes = {};
        this._shaderProgram = null;
        this._gl = init.gl;
        this.__init(init);
    }
    static getShader(gl, type, shader_text) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, shader_text);
        gl.compileShader(shader);
        const res = gl.getShaderInfoLog(shader);
        if (res !== null && res !== "") {
            console.error(`Shader info log: '${res}' for shader: ${shader_text}`);
        }
        return shader;
    }
    static getShaderDef(def, defines, common) {
        let ret = "";
        if (Object.prototype.toString.call(def) === "[object Array]") {
            ret = def.join('\n');
        }
        else {
            ret = def;
        }
        let sdefines = [];
        if (defines !== void 0) {
            Object.keys(defines).forEach(d => {
                sdefines.push(`#define ${d} ${defines[d]}`);
            });
        }
        const lines = ret.split('\n');
        if (lines[0].startsWith("#version")) {
            lines.splice(1, 0, ...sdefines);
        }
        if (common !== undefined) {
            common = `${common}\n`;
        }
        else {
            common = '';
        }
        return `${common}${lines.join('\n')}`;
    }
    __init(shaderDef) {
        const gl = this._gl;
        this._shaderProgram = gl.createProgram();
        gl.attachShader(this._shaderProgram, Shader.getShader(gl, gl.VERTEX_SHADER, Shader.getShaderDef(shaderDef.vertex, shaderDef.defines, shaderDef.common)));
        gl.attachShader(this._shaderProgram, Shader.getShader(gl, gl.FRAGMENT_SHADER, Shader.getShaderDef(shaderDef.fragment, shaderDef.defines, shaderDef.common)));
        gl.linkProgram(this._shaderProgram);
        gl.useProgram(this._shaderProgram);
        this.initializeUniforms(shaderDef.uniforms, gl);
        this.initializeAttributes(shaderDef.attributes, gl);
    }
    initializeAttributes(attributes, gl) {
        attributes.forEach(attr => {
            const attrid = gl.getAttribLocation(this._shaderProgram, attr);
            if (attrid !== -1) {
                this._attributes[attr] = attrid;
            }
            else {
                console.error(`Attribute ${attr} unknown in program.`);
            }
        });
    }
    initializeUniforms(uniforms, gl) {
        uniforms.forEach(uniform => {
            const location = gl.getUniformLocation(this._shaderProgram, uniform);
            if (location === null) {
                console.error(`Uniform ${uniform} not found in program.`);
            }
            else {
                this._uniforms[uniform] = location;
            }
        });
    }
    use() {
        this._gl.useProgram(this._shaderProgram);
        Object.keys(this._attributes).forEach(k => this._gl.enableVertexAttribArray(this._attributes[k]));
    }
    notUse() {
        this._gl.useProgram(null);
        Object.keys(this._attributes).forEach(k => this._gl.disableVertexAttribArray(this._attributes[k]));
    }
    set1F(name, v) {
        this._gl.uniform1f(this._uniforms[name], v);
    }
    set2F(name, v0, v1) {
        this._gl.uniform2f(this._uniforms[name], v0, v1);
    }
    set3F(name, v0, v1, v2) {
        this._gl.uniform3f(this._uniforms[name], v0, v1, v2);
    }
    set3FV(name, b) {
        this._gl.uniform3fv(this._uniforms[name], b);
    }
    set4FV(name, b) {
        this._gl.uniform4fv(this._uniforms[name], b);
    }
    set4F(name, v0, v1, v2, v3) {
        this._gl.uniform4f(this._uniforms[name], v0, v1, v2, v3);
    }
    set1I(name, v) {
        this._gl.uniform1i(this._uniforms[name], v);
    }
    set2I(name, v0, v1) {
        this._gl.uniform2i(this._uniforms[name], v0, v1);
    }
    set3I(name, v0, v1, v2) {
        this._gl.uniform3i(this._uniforms[name], v0, v1, v2);
    }
    setMatrix4fv(name, transpose, matrix, srcOffset, srcLength) {
        this._gl.uniformMatrix4fv(this._uniforms[name], transpose, matrix, srcOffset, srcLength);
    }
    static createInstancedModelMatrix(gl, instanceCount, attributeId, indexed) {
        return new ModelMatrixInstancingInfo(gl, attributeId, instanceCount, indexed);
    }
    static createAttributeInfo(gl, attributeId, data, stride, offset) {
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.vertexAttribPointer(attributeId, stride / 4, gl.FLOAT, false, stride, offset);
        gl.vertexAttribDivisor(attributeId, 0);
        return buffer;
    }
}
exports.default = Shader;

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shader_1 = require("./Shader");
/**
 * Skybox shader which draws a cubemap onto a cube.
 * The cube keeps always on the same position, regardless the camera position. Hence, we get from the camera matrix just
 * information regarding transformation, and not translation.
 *
 * This shader is expected to run the last thing on the renderer. This will speed things up a log, since no extra pixel
 * overdraw will be performed.
 * To do so, we trick gl_Position and duplicate position.w onto position.z. Thus the projection phase will just make z = 1.
 * We thus trick the depth buffer to think the cube is z=1, maximum depth. This will make the depth test fail should any
 * other object has been written to the same pixel.
 * So the skybox will only render on pixels where there's no previous object. It will also fill depth to maximum value of 1.
 *
 * We also need to change the depth function to GL_LEQUAL from GL_EQUAL.
 */
class SkyboxShader extends Shader_1.default {
    constructor(gl) {
        super({
            gl,
            vertex: `#version 300 es
			
				precision mediump float;
				
				layout (location = 0) in vec3 aPosition;
				
				out vec3 vTexCoords;
				
				uniform mat4 uProjection;
				uniform mat4 uView;
				
				void main() {
					vTexCoords = aPosition;
					vec4 pos = uProjection * uView * vec4(aPosition, 1.0);
					gl_Position = pos.xyww;
				}
			`,
            fragment: `#version 300 es
			
				precision mediump float;
				
				in vec3 vTexCoords;
				out vec4 color;
				
				uniform samplerCube uSampler;
				
				void main() {
					color = texture(uSampler, vTexCoords);
				}
			`,
            uniforms: ['uProjection', 'uView', 'uSampler'],
            attributes: ['aPosition']
        });
    }
    createVAO(gl, geometryInfo, material) {
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        const glGeometryBuffer = Shader_1.default.createAttributeInfo(gl, 0, geometryInfo.vertex, 12, 0);
        let glBufferIndex = gl.createBuffer();
        let vertexCount = geometryInfo.index.length;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glBufferIndex);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometryInfo.index, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
        gl.vertexAttribDivisor(0, 0);
        gl.bindVertexArray(null);
        return {
            shader: this,
            vao,
            geometryBuffer: glGeometryBuffer,
            vertexCount: vertexCount,
            indexBuffer: glBufferIndex,
            uvBuffer: null,
            instanceBuffer: null,
            instanceCount: 1,
            normalBuffer: null,
            renderMode: this._gl.TRIANGLES,
        };
    }
    render(e, info, rc) {
        const gl = e.gl;
        this.use();
        this.setMatrix4fv("uProjection", false, e.projectionMatrix());
        this.setMatrix4fv("uView", false, e.viewMatrix());
        rc.getMaterial().definition.diffuse.enableAsUnit(gl, 0);
        this.set1I("uSampler", 0);
        gl.depthFunc(gl.LEQUAL); // trick depth
        gl.bindVertexArray(info.vao);
        // invert cube normals to see from the inside. (we are inside the skybox)
        gl.cullFace(gl.FRONT);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
        gl.cullFace(gl.BACK);
        gl.bindVertexArray(null);
        gl.depthFunc(gl.LESS);
        this.notUse();
    }
}
exports.default = SkyboxShader;

},{"./Shader":20}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shader_1 = require("./Shader");
const Matrix4_1 = require("../../math/Matrix4");
/**
 * just draw geometry in a plain pink color
 */
class TextureShader extends Shader_1.default {
    constructor(gl, defines) {
        super({
            gl,
            common: `#version 300 es
							
				precision mediump float;
				
				// directional lights, 
				struct Light {
					// 				point light
					vec3 position;
					float constant;
					float linear;
					float quadratic;					
					
					// 				directional light
					vec3 direction;	
				  
					vec3 ambient;
					vec3 diffuse;
					vec3 specular;
					
					//				spot light
					float cutoff;
				};
				
 				struct Material {
					float     ambient;
					
					sampler2D diffuse;
					sampler2D specular;
					float     shininess;
			   	};  
				
			`,
            vertex: `					
				layout(location = 0) in vec3 aPosition;
				layout(location = 1) in vec2 aTexture;
				layout(location = 2) in vec3 aNormal;
				layout(location = 4) in mat4 aModel;
				
				uniform mat4 uProjection;
				uniform mat4 uModelView;
				uniform Light uLight;
				
				out vec2 vTexturePos;
				out vec3 vNormal;
				out vec3 vFragmentPos;

				void main() {
					vTexturePos = aTexture;
					vNormal = mat3(transpose(inverse(aModel))) * aNormal;	// normal matrix
					vFragmentPos = (aModel * vec4(aPosition, 1.0)).xyz;
					gl_Position = uProjection * uModelView * aModel * vec4(aPosition, 1.0);
				}
			`,
            fragment: `
				
				uniform vec3 uViewPos;
				uniform Light uLight;
				uniform Material uMaterial;
				
				in vec2 vTexturePos;
				in vec3 vNormal;
				in vec3 vFragmentPos;

				out vec4 color;
				
				vec3 getAmbient() {
					vec3 diffuseColor = texture(uMaterial.diffuse, vTexturePos).xyz;
					return (uLight.ambient + uMaterial.ambient) * diffuseColor;
				}
				
				vec3 getDiffuse(vec3 normal, vec3 lightDir) {
					float diff = max(dot(normal, lightDir), 0.0);
					vec3 diffuseColor = texture(uMaterial.diffuse, vTexturePos).xyz;
					
					return diff * uLight.diffuse * diffuseColor;
				}
				
				vec3 getSpecular(vec3 normal, vec3 lightDir) {
					float specular = 0.0;
					if (dot(normal, lightDir)>0.0) {					
						vec3 viewDir = normalize(uViewPos - vFragmentPos);
						#ifdef PHONG
							// phong
							vec3 reflect = -reflect(lightDir, normal);
							specular = pow(max(dot(viewDir, reflect), 0.0), uMaterial.shininess);
						#else						
							// blinn phong
							vec3 halfwayDir = normalize(lightDir + viewDir);
							specular = pow(max(dot(normal, halfwayDir), 0.0), uMaterial.shininess);
						#endif
					}
					
					return uLight.specular * specular * vec3(texture(uMaterial.specular, vTexturePos)); 
				}
				
				vec4 directional() {
					vec3 lightDir = normalize(-uLight.direction);
					return vec4(0,0,0,0);
				}
				
				vec3 point() {
					vec3 norm = 		normalize(vNormal);
					vec3 lightDir = 	normalize(uLight.position - vFragmentPos);
					
					vec3 color = getAmbient() + getDiffuse(norm, lightDir)
									#ifdef SPECULAR 
									 + getSpecular(norm, lightDir)
									#endif
										;
									
					#ifdef SPECULAR
						float distance = 	length(uLight.position - vFragmentPos);
						float attenuation = pow(1.0 / (	uLight.constant + 
													uLight.linear * distance + 
													uLight.quadratic * 
													(distance * distance)), .45);	// gamma    
	 
						color.xyz = color.xyz * attenuation;
 					#endif

 					color.xyz = pow(color.xyz, vec3(.45));	// gamma
 					
 					return color;
				}				

				void main() {
					color = vec4(point(), 1.0); 
					// color = vec4(vec3(gl_FragCoord.z), 1.0);
				}
			`,
            attributes: ["aPosition", "aTexture", "aNormal", "aModel"],
            uniforms: [
                "uProjection",
                "uModelView",
                "uLight.position",
                "uLight.constant",
                "uLight.linear",
                "uLight.quadratic",
                "uLight.direction",
                "uLight.ambient",
                "uLight.diffuse",
                "uLight.specular",
                "uMaterial.ambient",
                "uMaterial.diffuse",
                "uMaterial.specular",
                "uMaterial.shininess",
            ],
            defines: defines !== null && defines !== void 0 ? defines : {
                "SPECULAR": "1",
            },
        });
        this.light = true;
        this.light = defines === undefined;
        this.setMatrix4fv("uProjection", false, Matrix4_1.default.create());
        this.setMatrix4fv("uModelView", false, Matrix4_1.default.create());
        this.set3F("uLight.position", 0, 1, 0);
        this.set3F("uLight.direction", 0, 1, 0);
        this.set3F("uLight.ambient", .2, .2, .2);
        this.set3F("uLight.diffuse", .5, .5, .5);
        this.set3F("uLight.specular", 1, 1, 1);
        // for different point light values decay, check:
        // http://wiki.ogre3d.org/tiki-index.php?page=-Point+Light+Attenuation
        this.set1F("uLight.constant", 1.0);
        this.set1F("uLight.linear", 0.045);
        this.set1F("uLight.quadratic", 0.0075);
    }
    use() {
        const gl = this._gl;
        gl.useProgram(this._shaderProgram);
    }
    notUse() {
        const gl = this._gl;
        for (let i = 0; i < 7; i++) {
            gl.vertexAttribDivisor(i, 0);
            gl.disableVertexAttribArray(i);
        }
        gl.useProgram(null);
    }
    createVAO(gl, geometryInfo, material) {
        var _a;
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        for (let i = 0; i < 3; i++) {
            gl.enableVertexAttribArray(i);
            gl.vertexAttribDivisor(i, 0);
        }
        const instanceCount = geometryInfo.instanceCount || 1;
        const glGeometryBuffer = Shader_1.default.createAttributeInfo(gl, 0, geometryInfo.vertex, 12, 0);
        const glUVBuffer = Shader_1.default.createAttributeInfo(gl, 1, geometryInfo.uv, 8, 0);
        const glNormalBuffer = Shader_1.default.createAttributeInfo(gl, 2, geometryInfo.normal, 12, 0);
        const amodelLoc = gl.getAttribLocation(this._shaderProgram, "aModel");
        const glInstancedModelTransformBuffer = Shader_1.default.createInstancedModelMatrix(gl, instanceCount, amodelLoc, !!geometryInfo.index);
        let glBufferIndex = null;
        let vertexCount = (geometryInfo.vertex.length / 3) | 0;
        if (geometryInfo.index) {
            glBufferIndex = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glBufferIndex);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometryInfo.index, gl.STATIC_DRAW);
            vertexCount = geometryInfo.index.length;
        }
        gl.bindVertexArray(null);
        return {
            shader: this,
            vao,
            geometryBuffer: glGeometryBuffer,
            uvBuffer: glUVBuffer,
            indexBuffer: glBufferIndex,
            instanceBuffer: glInstancedModelTransformBuffer,
            normalBuffer: glNormalBuffer,
            vertexCount: vertexCount,
            instanceCount,
            backFaceDisabled: geometryInfo.cullDisabled,
            renderMode: (_a = material.renderMode) !== null && _a !== void 0 ? _a : this._gl.TRIANGLES,
        };
    }
    render(e, info, rc) {
        const gl = e.gl;
        if (info.backFaceDisabled) {
            this._gl.disable(this._gl.CULL_FACE);
        }
        this.use();
        this.setMatrix4fv("uProjection", false, e.projectionMatrix());
        this.setMatrix4fv("uModelView", false, e.cameraMatrix());
        const material = rc.getMaterial().definition;
        material.diffuse.enableAsUnit(gl, 0);
        this.set1I("uMaterial.diffuse", 0);
        this.set1F("uMaterial.ambient", material.ambient);
        const light = e.light['point'];
        if (this.light) {
            material.specular.enableAsUnit(gl, 1);
            this.set1I("uMaterial.specular", 1);
            this.set1F("uMaterial.shininess", material.shininess);
            this.set3FV("uLight.specular", light.getSpecular());
        }
        this.set3FV("uLight.diffuse", light.getDiffuse());
        this.set3FV("uLight.position", light.getPosition());
        this.set3FV("uLight.ambient", light.getAmbient());
        this.set3FV("uViewPos", e.cameraPosition());
        gl.bindVertexArray(info.vao);
        // if (info.indexBuffer) {
        // 	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, info.indexBuffer);
        // }
        info.instanceBuffer.draw(gl, info.vertexCount, info.instanceCount);
        gl.bindVertexArray(null);
        this.notUse();
        if (info.backFaceDisabled) {
            this._gl.enable(this._gl.CULL_FACE);
        }
    }
}
exports.default = TextureShader;

},{"../../math/Matrix4":1,"./Shader":20}],"Main":[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Engine_1 = require("./render/Engine");
const Platform_1 = require("./platform/Platform");
const Texture_1 = require("./render/Texture");
const Loader_1 = require("./platform/Loader");
new Loader_1.Loader().addImage([
    "assets/earth.jpg",
    "assets/cubemap3/back.png",
    "assets/cubemap3/bottom.png",
    "assets/cubemap3/front.png",
    "assets/cubemap3/left.png",
    "assets/cubemap3/right.png",
    "assets/cubemap3/top.png",
]).load((l) => {
    const e = new Engine_1.default(window.innerWidth, window.innerHeight);
    const gl = e.gl;
    e.addTexture("earth", Texture_1.default.initialize(gl, {
        element: l.getImage("earth.jpg"),
        wrap_mode: gl.REPEAT,
        minFilter: gl.LINEAR_MIPMAP_LINEAR,
    }));
    /*
    e.addTexture("jupiter", Texture_1.default.initialize(gl, {
        element: l.getImage("jupiter.jpg"),
        wrap_mode: gl.REPEAT,
        minFilter: gl.LINEAR_MIPMAP_LINEAR,
    }));
    e.addTexture("moon", Texture_1.default.initialize(gl, {
        element: l.getImage("moon.jpg"),
        wrap_mode: gl.REPEAT,
        minFilter: gl.LINEAR_MIPMAP_LINEAR,
    }));
    e.addTexture("diffuse", Texture_1.default.initialize(gl, {
        element: l.getImage("diffuse.png"),
        wrap_mode: gl.CLAMP_TO_EDGE,
        minFilter: gl.LINEAR_MIPMAP_LINEAR,
    }));
    e.addTexture("specular", Texture_1.default.initialize(gl, {
        element: l.getImage("lava.jpg"),
        wrap_mode: gl.CLAMP_TO_EDGE,
        minFilter: gl.LINEAR_MIPMAP_LINEAR,
    }));
     */
    e.addTexture("cubemap", Texture_1.default.initializeCubeMap(gl, l.getImagesWith(["left.png", "right.png", "top.png", "bottom.png", "back.png", "front.png"])));
    e.init();
    window.addEventListener("keydown", (ev) => {
        e.keyboardEvent(ev.key, true);
    });
    window.addEventListener("keyup", (ev) => {
        e.keyboardEvent(ev.key, false);
    });
    window.addEventListener("resize", (ev) => {
        e.resize(window.innerWidth, window.innerHeight);
    });
    Platform_1.default.canvas.onclick = function () {
        Platform_1.default.canvas.requestPointerLock();
    };
    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    run();
    function lockChangeAlert() {
        if (document.pointerLockElement === Platform_1.default.canvas) {
            console.log('The pointer lock status is now locked');
            Platform_1.default.canvas.addEventListener("mousemove", updatePosition, false);
        }
        else {
            console.log('The pointer lock status is now unlocked');
            Platform_1.default.canvas.removeEventListener("mousemove", updatePosition, false);
            firstPointerLockPosition = true;
        }
    }
    let firstPointerLockPosition = true;
    function updatePosition(ev) {
        if (firstPointerLockPosition) {
            firstPointerLockPosition = false;
        }
        else {
            e.mouseEvent(ev.movementX, ev.movementY);
        }
    }
    function run() {
        function loop() {
            e.render(16.66);
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }
});

},{"./platform/Loader":5,"./platform/Platform":6,"./render/Engine":8,"./render/Texture":13}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYXRoL01hdHJpeDQudHMiLCJtYXRoL1F1YXRlcm5pb24udHMiLCJtYXRoL1NwaGVyZVRlc3NlbGxhdG9yLnRzIiwibWF0aC9WZWN0b3IzLnRzIiwicGxhdGZvcm0vTG9hZGVyLnRzIiwicGxhdGZvcm0vUGxhdGZvcm0udHMiLCJyZW5kZXIvQ2FtZXJhLnRzIiwicmVuZGVyL0VuZ2luZS50cyIsInJlbmRlci9MaWdodC50cyIsInJlbmRlci9NYXRlcmlhbC50cyIsInJlbmRlci9NZXNoLnRzIiwicmVuZGVyL1N1cmZhY2UudHMiLCJyZW5kZXIvVGV4dHVyZS50cyIsInJlbmRlci9nZW9tZXRyeS9DdWJlLnRzIiwicmVuZGVyL2dlb21ldHJ5L0dyYXRpY3VsZS50cyIsInJlbmRlci9nZW9tZXRyeS9NeXJpYWhlZHJhbC50cyIsInJlbmRlci9nZW9tZXRyeS9Tb2xpZHMudHMiLCJyZW5kZXIvc2hhZGVyL0Vudmlyb25tZW50TWFwU2hhZGVyLnRzIiwicmVuZGVyL3NoYWRlci9OdWxsU2hhZGVyLnRzIiwicmVuZGVyL3NoYWRlci9TaGFkZXIudHMiLCJyZW5kZXIvc2hhZGVyL1NreWJveFNoYWRlci50cyIsInJlbmRlci9zaGFkZXIvVGV4dHVyZVNoYWRlci50cyIsIk1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUV2Qjs7Ozs7OztHQU9HO0FBQ0gsTUFBcUIsT0FBTztJQUUzQixNQUFNLENBQUMsV0FBVyxDQUFDLEdBQWlCLEVBQUUsb0JBQTRCLEVBQUUsTUFBYyxFQUFFLEtBQWEsRUFBRSxJQUFZO1FBRTlHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdB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QUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDNUIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNkLE9BQU8sR0FBRyxDQUFDO0lBQ1osQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBaUIsRUFBRSxDQUFlLEVBQUUsQ0FBZTtRQUM3RCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2RCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFekQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ25ELEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ25ELEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ25ELEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBRW5ELEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1YsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNWLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNuRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNuRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNuRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUVuRCxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1YsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNWLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDWCxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDbkQsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDbkQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFFcEQsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNYLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDWCxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNYLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBRXBELE9BQU8sR0FBRyxDQUFDO0lBQ1osQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBaUIsRUFBRSxDQUFlO0lBQ2pELENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQWU7UUFDM0IsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzNCLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBaUIsRUFBRSxDQUFlO1FBQzdDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxPQUFPLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQWlCLEVBQUUsTUFBZTtRQUVqRCxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUVyQixHQUFHLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUVyQixP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LElBQUksR0FBRyxDQUFDO1NBQ1Y7UUFFRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1osR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDWixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDWixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1osR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNiLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDWixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1osR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNiLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDZCxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDL0MsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQy9DLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUMvQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRWQsT0FBTyxHQUFHLENBQUM7SUFDWixDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFpQixFQUFFLENBQWU7UUFDbEQsSUFBSSxHQUFHLEtBQUcsQ0FBQyxFQUFFO1lBQ1osTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFbEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2YsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNiLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2YsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNiLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDYixHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDZCxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2QsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUNkO2FBQU07WUFDTixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2QsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2YsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2QsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNmLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2QsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDWixDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFpQixFQUFFLENBQWUsRUFBRSxDQUFlO1FBQ25FLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFO1lBQ2QsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqRCxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pELEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsRDthQUFNO1lBQ04sTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFdkQsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNiLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDYixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNiLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDYixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNiLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDYixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNiLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDZCxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBRWQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5QztRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ1osQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBaUIsRUFBRSxDQUFlLEVBQUUsS0FBYztRQUUvRCxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQixNQUFNLEdBQUcsR0FBRSxJQUFJLENBQUMsR0FBRyxDQUFFLEVBQUUsQ0FBRSxDQUFDO1FBQzFCLE1BQU0sR0FBRyxHQUFFLElBQUksQ0FBQyxHQUFHLENBQUUsRUFBRSxDQUFFLENBQUM7UUFDMUIsTUFBTSxHQUFHLEdBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBRSxFQUFFLENBQUUsQ0FBQztRQUMxQixNQUFNLEdBQUcsR0FBRSxJQUFJLENBQUMsR0FBRyxDQUFFLEVBQUUsQ0FBRSxDQUFDO1FBQzFCLE1BQU0sR0FBRyxHQUFFLElBQUksQ0FBQyxHQUFHLENBQUUsRUFBRSxDQUFFLENBQUM7UUFDMUIsTUFBTSxHQUFHLEdBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBRSxFQUFFLENBQUUsQ0FBQztRQUUxQixFQUFFLENBQUcsQ0FBQyxDQUFFLEdBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQztRQUNqQixFQUFFLENBQUcsQ0FBQyxDQUFFLEdBQUMsQ0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDO1FBQ2xCLEVBQUUsQ0FBRyxDQUFDLENBQUUsR0FBQyxHQUFHLENBQUM7UUFDYixFQUFFLENBQUcsQ0FBQyxDQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQ1osRUFBRSxDQUFHLENBQUMsQ0FBRSxHQUFDLEdBQUcsR0FBQyxHQUFHLEdBQUMsR0FBRyxHQUFDLEdBQUcsR0FBQyxHQUFHLENBQUM7UUFDN0IsRUFBRSxDQUFHLENBQUMsQ0FBRSxHQUFDLEdBQUcsR0FBQyxHQUFHLEdBQUMsR0FBRyxHQUFDLEdBQUcsR0FBQyxHQUFHLENBQUM7UUFDN0IsRUFBRSxDQUFHLENBQUMsQ0FBRSxHQUFDLENBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQztRQUNsQixFQUFFLENBQUcsQ0FBQyxDQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQ1osRUFBRSxDQUFHLENBQUMsQ0FBRSxHQUFDLEdBQUcsR0FBQyxHQUFHLEdBQUMsR0FBRyxHQUFDLEdBQUcsR0FBQyxHQUFHLENBQUM7UUFDN0IsRUFBRSxDQUFHLENBQUMsQ0FBRSxHQUFDLEdBQUcsR0FBQyxHQUFHLEdBQUMsR0FBRyxHQUFDLEdBQUcsR0FBQyxHQUFHLENBQUM7UUFDN0IsRUFBRSxDQUFHLEVBQUUsQ0FBQyxHQUFDLEdBQUcsR0FBQyxHQUFHLENBQUM7UUFDakIsRUFBRSxDQUFFLEVBQUUsQ0FBRSxHQUFFLENBQUMsQ0FBQztRQUNaLEVBQUUsQ0FBRSxFQUFFLENBQUUsR0FBRSxDQUFDLENBQUM7UUFDWixFQUFFLENBQUUsRUFBRSxDQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQ1osRUFBRSxDQUFFLEVBQUUsQ0FBRSxHQUFFLENBQUMsQ0FBQztRQUNaLEVBQUUsQ0FBRSxFQUFFLENBQUUsR0FBRSxDQUFDLENBQUM7UUFFWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFpQixFQUFFLENBQWUsRUFBRSxDQUFlO1FBQy9ELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMs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LENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0IsUUFBUTtRQUNSLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUIsUUFBUTtRQUNSLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFFMUIsT0FBTyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFlLEVBQUUsQ0FBZTtRQUU3QyxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQ3BCLEdBQUcsRUFDSCxVQUFVLENBQUMsR0FBRyxDQUNiLEdBQUcsRUFDSCxDQUFDLEVBQ0QsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVB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QUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BGLEVBQUUsQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUM3RCxPQUFPLElBQUksQ0FBQyxDQUFDO1NBQ2I7UUFFRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFFLENBQUMsRUFBRztZQUM5QyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXJCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FB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QUFNLENBQUMsQ0FBQztZQUN6QyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTNDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXRDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QixLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXZCLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQixLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXZCLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QixLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXZCLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QixFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3BCO1FBRUQsT0FBTyxJQUFJLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FB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USxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEQsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5RixFQUFFLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDckUsT0FBTyxJQUFJLENBQUMsQ0FBQztTQUNiO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFHLEVBQUU7WUFDNUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBUyxDQUFDO1lBQzNDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUssQ0FBQztZQUMzQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBRyxD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akQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDckQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFckQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFDRCxNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixNQUFNLEVBQUUsR0FBRyxrQkFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRCxFQUFFLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDMUIsRUFBRSxDQUFDLFVBQVUsR0FBRyxJQUFJLGNBQUks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QUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25GLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzNGLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRTNGLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUM1QixNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBRTVCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDekMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUU5QyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7Z0JBQ3BDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzthQUNwQztZQUVELE1BQU0sVUFBVSxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLFVBQVUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNqQyxFQUFFLENBQUMsT0FBTyxHQUFHLElBQUksY0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDbEMsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLEtBQUssRUFBRSxJQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUM7Z0JBQ3RDLFFBQVEsRUFBRSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUM7Z0JBQ25DLFlBQVksRUFBRSxJQUFJO2dCQUNsQixFQUFFLEVBQUUsSUFBSTtnQkFDUixPQUFPLEVBQUUsSUFBSTthQUNiLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25CO0lBQ0YsQ0FBQztJQUVELE1BQU0sQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWU7UUFDM0MsSUFBSSxLQUFLLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFHLENBQUMsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUcsQ0FBQyxFQUFFO1lBQ3JFLGtCQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDMUIsa0JBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzdCO0lBQ0YsQ0FBQztJQUVELGlCQUFpQixDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsaUJBQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELFNBQVMsQ0FBQyxDQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsVUFBVSxDQUFDLENBQVM7UUFDbkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBWSxFQUFFLENBQVU7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELGdCQUFnQjtRQUNmLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN6QixDQUFDO0lBRUQsWUFBWTtRQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFDbEMsQ0FBQztJQUVELGNBQWM7UUFDYixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxVQUFVO1FBQ1QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztJQUN0QyxDQUFDO0lBRU8sa0JBQWtCO1FBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV4QixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFhO1FBRW5CLGtCQUFrQjtRQUNsQix3REFBd0Q7UUFDeEQsc0VBQXNFO1FBQ3RFLEVBQUU7UUFDRixtQ0FBbUM7UUFDbkMsb0NBQW9DO1FBQ3BDLEVBQUU7UUFDRix5REFBeUQ7O1FBRXpELE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFFbkIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVoRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUxQixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQywrREFBK0Q7UUFFL0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQWUsQ0FBQztRQUNoRCxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUU5QixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxNQUFBLEVBQUUsQ0FBQyxPQUFPLDBDQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNoRCxNQUFBLEVBQUUsQ0FBQyxPQUFPLDBDQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNoRCxNQUFBLEVBQUUsQ0FBQyxRQUFRLDBDQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNqRCxNQUFBLEVBQUUsQ0FBQyxTQUFTLDBDQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNsRCxNQUFBLEVBQUUsQ0FBQyxTQUFTLDBDQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNsRCxNQUFBLEVBQUUsQ0FBQyxVQUFVLDBDQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUVuRCxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsTUFBQSxFQUFFLENBQUMsT0FBTywwQ0FBRSxNQUFNLENBQUMsSUFBSSxFQUFFO1NBQ3pCO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE1BQUEsRUFBRSxDQUFDLE9BQU8sMENBQUUsTUFBTSxDQUFDLElBQUksRUFBRTtTQUN6QjtRQUNELElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLE1BQUEsRUFBRSxDQUFDLFFBQVEsMENBQUUsTUFBTSxDQUFDLElBQUksRUFBRTtZQUMxQixNQUFBLEVBQUUsQ0FBQyxTQUFTLDBDQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUU7U0FDM0I7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixNQUFBLEVBQUUsQ0FBQyxTQUFTLDBDQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDM0IsTUFBQSxFQUFFLENBQUMsVUFBVSwwQ0FBRSxNQUFNLENBQUMsSUFBSSxFQUFFO1NBQzVCO1FBRUQsa0NBQWtDO1FBQ2xDLGtFQUFrRTtRQUNsRSxxQkFBcUI7UUFHckIscUJBQXFCO1FBQ3JCLG1EQUFtRDtRQUNuRCxNQUFNO1FBQ04sb0RBQW9EO1FBRW5ELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDekYsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLGlDQUFpQztRQUNqQyxnREFBZ0Q7UUFHaEQsMERBQTBEO1FBQzFELDJEQUEyRDtRQUMzRCxnQkFBZ0I7UUFDaEIsMkNBQTJDO1FBQzNDLGlDQUFpQztRQUNqQyw2QkFBNkI7UUFDN0IseUVBQXlFO1FBQ3pFLEtBQUs7UUFDTCw2QkFBNkI7UUFFN0IsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVPLHdCQUF3QjtRQUUvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVsQixNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUM7WUFDakIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2xELGlCQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQ3hCLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQ3pCLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUM5RSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakIsaUJBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JELG1GQUFtRjtZQUNuRixtRkFBbUY7WUFDbkYsaUJBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNoQixpQkFBTyxDQUFDLFdBQVcsQ0FDbEIsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUNaLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNUO0lBQ0YsQ0FBQztJQUVELFVBQVUsQ0FBQyxnQkFBd0IsRUFBQyxnQkFBd0I7UUFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxJQUF5Qjs7UUFDL0MsWUFBQSxJQUFJLENBQUMsZ0JBQWdCLDBDQUFFLE9BQU8sMENBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7SUFDdEUsQ0FBQztJQUVELHFCQUFxQixDQUFDLElBQXlCO1FBRTlDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbkIsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO1FBRTdCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUUsQ0FBQyxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvQztRQUVELE1BQU0sRUFBRSxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELEVBQUUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUN6QixPQUFPLElBQUksY0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUM1QixRQUFRLEVBQUUsRUFBRTtZQUNaLEtBQUssRUFBRSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUM7WUFDL0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLEVBQUUsRUFBRSxJQUFJO1lBQ1IsT0FBTyxFQUFFLElBQUk7U0FDYixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBS0QsYUFBYSxDQUFDLEdBQVcsRUFBRSxJQUFhOztRQUV2QyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLFFBQU8sR0FBRyxFQUFFO1lBQ1gsS0FBSyxHQUFHO2dCQUNQLENBQUMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTTtZQUNQLEtBQUssR0FBRztnQkFDUCxDQUFDLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsTUFBTTtZQUNQLEtBQUssR0FBRztnQkFDUCxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTTtZQUNQLEtBQUssR0FBRztnQkFDUCxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLE1BQU07WUFDUCxLQUFLLEdBQUc7Z0JBQ1AsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU07WUFDUCxLQUFLLEdBQUc7Z0JBQ1AsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixNQUFNO1lBRVAsS0FBSyxHQUFHO2dCQUNQLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07WUFDUCxLQUFLLEdBQUc7Z0JBQ1AsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQztnQkFDdkIsTUFBTTtZQUNQLEtBQUssR0FBRztnQkFDUCxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDO2dCQUN2QixNQUFNO1lBQ1AsS0FBSyxHQUFHO2dCQUNQLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07WUFDUCxLQUFLLEdBQUc7Z0JBQ1AsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQztnQkFDdkIsTUFBTTtZQUNQLEtBQUssR0FBRztnQkFDUCxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDO2dCQUN2QixNQUFNO1lBRVAsS0FBSyxHQUFHO2dCQUNQLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDZCxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsRUFBRTtvQkFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7aUJBQ3RCO3FCQUFNO29CQUNOLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztpQkFDbEI7Z0JBQ0QsTUFBTTtZQUNQLEtBQUssR0FBRztnQkFDUCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7Z0JBQ3RCLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2lCQUNyQjtxQkFBTTtvQkFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQ2xCO2dCQUNELE1BQU07WUFFUCxLQUFLLEdBQUc7Z0JBQ1AsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDVixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDN0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUNyQjtnQkFDRCxNQUFNO1lBQ1AsS0FBSyxHQUFHO2dCQUNQLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDckI7Z0JBQ0QsTUFBTTtZQUNQLEtBQUssR0FBRztnQkFDUCxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQ3JCO2dCQUNELE1BQU07WUFFUCxLQUFLLEdBQUc7Z0JBQ1AsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDVixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDN0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUNyQjtnQkFDRCxNQUFNO1lBRVAsS0FBSyxHQUFHO2dCQUNQLGVBQWU7Z0JBQ2hCO29CQUNDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzlHLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQzVDLE1BQUEsSUFBSSxDQUFDLGdCQUFnQiwwQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7aUJBQ2pFO2dCQUNBLElBQUk7Z0JBQ0osTUFBTTtZQUNQLEtBQUssR0FBRztnQkFDUCxlQUFlO2dCQUNoQjtvQkFDQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM5RyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUM1QyxNQUFBLElBQUksQ0FBQyxnQkFBZ0IsMENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO2lCQUNqRTtnQkFDQSxJQUFJO2dCQUNKLE1BQU07WUFFUCxLQUFLLEdBQUc7Z0JBQ1AsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDVixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdkIsQ0FBQyxDQUFDLENBQUM7aUJBQ0g7Z0JBQ0QsTUFBTTtZQUNQLEtBQUssR0FBRztnQkFDUCxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNWLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTt3QkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDekIsQ0FBQyxDQUFDLENBQUM7aUJBQ0g7Z0JBQ0QsTUFBTTtZQUNQLEtBQUssR0FBRztnQkFDUCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDVixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQ3JCO2dCQUNELE1BQU07U0FDUDtJQUNGLENBQUM7SUFNTyxlQUFlO1FBRXRCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbkMsc0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTyxjQUFjLENBQUMsQ0FBa0I7UUFFeEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxxQkFBVyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV2QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsTUFBTSxJQUFJLEdBQUcsSUFBSSxjQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxrQ0FDN0IsSUFBSSxLQUNQLFFBQVEsRUFBRSxrQkFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUMvRCxZQUFZLEVBQUUsSUFBSSxLQUVoQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFbkIsTUFBTSxFQUFFLEdBQUc7WUFDVixJQUFJO1lBQ0osV0FBVztZQUNYLE9BQU87U0FDUCxDQUFDO1FBRUYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTyxjQUFjLENBQUMsU0FBaUIsRUFBRSxLQUFhO1FBQ3RELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBRTVCLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUMvQixLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDNUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQy9CLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUVqQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTyxlQUFlLENBQUMsU0FBaUI7UUFDeEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRS9DLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUVqQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBRTVCLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVPLGlCQUFpQjtRQUV4QixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRS9CLE1BQU0sTUFBTSxHQUFvQztZQUMvQyxDQUFDLGFBQWEsRUFBRSw0QkFBbUIsQ0FBQztZQUNwQyxDQUFDLE1BQU0sRUFBRSxxQkFBWSxDQUFDO1lBQ3RCLENBQUMsWUFBWSxFQUFFLDJCQUFrQixDQUFDO1lBQ2xDLENBQUMsYUFBYSxFQUFFLDRCQUFtQixDQUFDO1NBQ3BDLENBQUM7UUFFRixNQUFNLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxRQUF1QztRQUUvRCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXpELE1BQU0sV0FBVyxHQUFHLElBQUkscUJBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNqRCxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDdEIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckIsWUFBWSxFQUFFLENBQUM7WUFDZixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxNQUFNLElBQUksR0FBRyxJQUFJLGNBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLGtDQUM3QixLQUFLLEtBQ1IsUUFBUSxFQUFFLGtCQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQy9ELFlBQVksRUFBRSxJQUFJLEtBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBRU4sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFJO1lBQ0osV0FBVztZQUNYLE9BQU87U0FDUCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU8sYUFBYTtRQUNwQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU8sZUFBZSxDQUFDLENBQVM7UUFDaEMsSUFBSSxDQUFDLEtBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQ25DLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBRWQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDOUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztnQkFFbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO2dCQUV6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtvQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDekIsQ0FBQyxDQUFDLENBQUM7WUFFSixDQUFDLENBQUMsQ0FBQztTQUVIO0lBQ0YsQ0FBQztJQUVPLE1BQU0sQ0FBQyxnQkFBNEI7UUFDMUMsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUMsY0FBYyxFQUFFO1lBQ3hELHFCQUFxQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN0RjthQUFNO1lBQ04sZ0JBQWdCLEVBQUUsQ0FBQztTQUNuQjtJQUNGLENBQUM7SUFFTyxlQUFlLENBQUMsZ0JBQTRCLEVBQUUsRUFBVTtRQUMvRCxJQUFJLEVBQUUsS0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsRUFBRTtnQkFDdEMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDN0U7aUJBQU07Z0JBQ04sZ0JBQWdCLEVBQUUsQ0FBQzthQUNuQjtTQUNEO0lBQ0YsQ0FBQztJQUVPLElBQUksQ0FBQyxjQUEwQjtRQUN0QyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLEVBQUU7WUFDM0MscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNsRjthQUFNO1lBQ04scUJBQXFCLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDdEM7SUFDRixDQUFDO0lBRU8sYUFBYSxDQUFDLGNBQTBCLEVBQUUsRUFBVTtRQUMzRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUcsRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRTtnQkFDekIscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3pFO2lCQUFNO2dCQUNOLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0Q7SUFDRixDQUFDO0lBRU8sVUFBVTs7UUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVDLE1BQUEsSUFBSSxDQUFDLGdCQUFnQiwwQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFFakUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxhQUFhLENBQUMsSUFBMEI7O1FBQy9DLElBQUksR0FBRyxJQUFJLGFBQUosSUFBSSxjQUFKLElBQUksU0FBSSxJQUFJLENBQUMsZ0JBQWdCLDBDQUFFLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDL0QsSUFBRyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQztJQUNGLENBQUM7Q0FDRDtBQXp4QkQseUJBeXhCQzs7Ozs7O0FDbDBCRCxJQUFZLFNBSVg7QUFKRCxXQUFZLFNBQVM7SUFDcEIsdURBQVcsQ0FBQTtJQUNYLDJDQUFLLENBQUE7SUFDTCx5Q0FBSSxDQUFBO0FBQ0wsQ0FBQyxFQUpXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBSXBCO0FBc0JELE1BQThCLEtBQUs7SUFVbEMsWUFBc0IsSUFBZSxFQUFFLEVBQXVCO1FBRjlELFlBQU8sR0FBRyxLQUFLLENBQUM7UUFHZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsVUFBVTtRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNyQixDQUFDO0lBRUQsVUFBVTtRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNyQixDQUFDO0lBRUQsV0FBVztRQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN0QixDQUFDO0lBRUQsVUFBVSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsVUFBVSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsV0FBVyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRVMsR0FBRyxDQUFDLENBQWUsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7UUFDN0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVELFVBQVUsQ0FBQyxDQUFVO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQXdCO1FBQzFDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFrQjtRQUM5QixPQUFPLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRDtBQTNERCx3QkEyREM7QUFFRCxNQUFhLGdCQUFpQixTQUFRLEtBQUs7SUFJMUMsWUFBWSxFQUF1QjtRQUNsQyxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsWUFBWTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBRUQsWUFBWSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0Q7QUFoQkQsNENBZ0JDO0FBRUQsTUFBYSxVQUFXLFNBQVEsS0FBSztJQUlwQyxZQUFZLEVBQWlCO1FBQzVCLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxXQUFXO1FBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxXQUFXLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQzFDLElBQUksQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRyxDQUFDO0lBQ3JDLENBQUM7Q0FDRDtBQWhCRCxnQ0FnQkM7Ozs7OztBQ3hIRCxJQUFLLGVBS0o7QUFMRCxXQUFLLGVBQWU7SUFDbkIsMkRBQU8sQ0FBQTtJQUNQLDZEQUFRLENBQUE7SUFDUix5REFBTSxDQUFBO0lBQ04scUVBQVksQ0FBQTtBQUNiLENBQUMsRUFMSSxlQUFlLEtBQWYsZUFBZSxRQUtuQjtBQUVELElBQVksWUFPWDtBQVBELFdBQVksWUFBWTtJQUN2QixtREFBTSxDQUFBO0lBQ04scURBQU8sQ0FBQTtJQUNQLDJEQUFVLENBQUE7SUFDViwyREFBVSxDQUFBO0lBQ1YsaURBQUssQ0FBQTtJQUNMLHVFQUFnQixDQUFBO0FBQ2pCLENBQUMsRUFQVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQU92QjtBQWtCRCxNQUFxQixRQUFRO0lBTzVCLFlBQW9CLENBQWUsRUFBRSxHQUF3QjtRQUM1RCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxPQUFPO0lBRVAsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBVTtRQUMzQixPQUFPLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUU7WUFDNUMsT0FBTyxFQUFFLENBQUM7U0FDVixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFVO1FBQzNCLE9BQU8sSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRTtZQUM1QyxPQUFPLEVBQUUsQ0FBQztTQUNWLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQWdCO1FBQzdCLE9BQU8sSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxPQUFPLEVBQUUsT0FBTztTQUNoQixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFnQixFQUFFLFFBQWlCLEVBQUUsT0FBZSxFQUFFLFNBQWlCO1FBQ3JGLE9BQU8sSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRTtZQUN6QyxPQUFPO1lBQ1AsUUFBUTtZQUNSLE9BQU87WUFDUCxTQUFTO1NBQ1QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBZ0IsRUFBRSxPQUFlO1FBQ3RELE9BQU8sSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFO1lBQ2xELE9BQU87WUFDUCxPQUFPO1NBQ1AsQ0FBRSxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBbUI7UUFDL0IsT0FBTyxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFO1lBQ3ZDLEtBQUs7U0FDTCxDQUFDLENBQUE7SUFDSCxDQUFDO0NBQ0Q7QUF2REQsMkJBdURDOzs7OztBQ3pGRCw2Q0FBc0M7QUFDdEMsNkNBQXNDO0FBSXRDLHlDQUFrRDtBQUNsRCxpRUFBMEQ7QUFrQjFELE1BQXFCLElBQUk7SUFZeEI7UUFWQSxhQUFRLEdBQWEsSUFBSSxDQUFDO1FBQzFCLGVBQVUsR0FBa0IsSUFBSSxDQUFDO1FBRWpDLGFBQVEsR0FBRyxpQkFBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsYUFBUSxHQUFHLGlCQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxVQUFLLEdBQUcsaUJBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXhDLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBSTdCLENBQUM7SUFFRCxPQUFPLENBQUMsRUFBMEI7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUV4QixFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEQsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILElBQUksQ0FBQyxDQUFTLEVBQUUsQ0FBYSxFQUFFLGFBQXFCOztRQUVuRCxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQzVCLE1BQU0sRUFBRSxHQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDZixNQUFNLEtBQUssR0FBRSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3JCLE1BQU0sUUFBUSxHQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFFM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFekIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVoQixRQUFRLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDdEIsS0FBSyx1QkFBWSxDQUFDLFVBQVU7Z0JBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUU7b0JBQy9ELE1BQU0sRUFBRSxRQUFRO29CQUNoQixNQUFNLFFBQUUsQ0FBQyxDQUFDLE9BQU8sbUNBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDO29CQUMxRCxLQUFLO29CQUNMLGFBQWE7b0JBQ2IsWUFBWSxFQUFFLENBQUMsQ0FBQyxZQUFZO2lCQUM1QixFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNiLE1BQU07WUFDUCxLQUFLLHVCQUFZLENBQUMsVUFBVTtnQkFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRTtvQkFDL0QsTUFBTSxFQUFFLFFBQVE7b0JBQ2hCLE1BQU0sUUFBRSxDQUFDLENBQUMsT0FBTyxtQ0FBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUM7b0JBQzFELEtBQUs7b0JBQ0wsYUFBYTtvQkFDYixZQUFZLEVBQUUsQ0FBQyxDQUFDLFlBQVk7aUJBQzVCLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2IsTUFBTTtZQUNQLEtBQUssdUJBQVksQ0FBQyxPQUFPO2dCQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRTtvQkFDdEQsTUFBTSxFQUFFLFFBQVE7b0JBQ2hCLEVBQUU7b0JBQ0YsTUFBTSxRQUFFLENBQUMsQ0FBQyxPQUFPLG1DQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQztvQkFDMUQsS0FBSztvQkFDTCxhQUFhO29CQUNiLFlBQVksRUFBRSxDQUFDLENBQUMsWUFBWTtpQkFDNUIsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDYixNQUFNO1lBQ1AsS0FBSyx1QkFBWSxDQUFDLGdCQUFnQjtnQkFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRTtvQkFDN0QsTUFBTSxFQUFFLFFBQVE7b0JBQ2hCLEVBQUU7b0JBQ0YsTUFBTSxRQUFFLENBQUMsQ0FBQyxPQUFPLG1DQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQztvQkFDMUQsS0FBSztvQkFDTCxhQUFhO29CQUNiLFlBQVksRUFBRSxDQUFDLENBQUMsWUFBWTtpQkFDNUIsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDYixNQUFNO1lBQ1AsS0FBSyx1QkFBWSxDQUFDLE1BQU07Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFO29CQUNyRCxNQUFNLEVBQUUsUUFBUTtvQkFDaEIsRUFBRTtvQkFDRixLQUFLO29CQUNMLGFBQWE7aUJBQ2IsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDYixNQUFNO1lBQ1AsS0FBSyx1QkFBWSxDQUFDLEtBQUs7Z0JBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDekYsTUFBTTtZQUNQO2dCQUNDLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDdkQ7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFFRCxNQUFNLENBQUMsQ0FBUyxFQUFFLFFBQXNCLEVBQUUsRUFBZ0I7UUFFekQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNoQixFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0QsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekQsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0QsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9FLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25ELEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVPLGVBQWUsQ0FBQyxRQUFzQixFQUFFLEtBQW1CO1FBQ2xFLE1BQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDNUIsTUFBTSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM1QixNQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzVCLE1BQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDNUIsTUFBTSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM1QixNQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTVCLElBQUksT0FBTyxHQUFpQixJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFOUQsSUFBSSxLQUFLLEVBQUU7WUFFVixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6QyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTdCLGlCQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLGlCQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLGlCQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXJFLGlCQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3hCLGlCQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRXhCLGlCQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTO2dCQUVwQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFCO1NBRUQ7YUFBTTtZQUVOLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBRSxDQUFDLEVBQUU7Z0JBQ3ZDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBRTtnQkFDZixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVsQixpQkFBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRSxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRSxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVyRSxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QixpQkFBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUV4QixpQkFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUztnQkFFcEMsT0FBTyxDQUFDLEdBQUcsQ0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixPQUFPLENBQUMsR0FBRyxDQUFLLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtTQUNEO1FBRUQsYUFBYTtRQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0MsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqSCxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BCO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDaEIsQ0FBQztJQUVELGVBQWU7UUFFZCwrQkFBK0I7UUFDL0IsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3hCLGlCQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztTQUM1QjtRQUVELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBRUQsTUFBTSxDQUFDLENBQVM7UUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELGVBQWUsQ0FBQyxDQUFTLEVBQUUsTUFBb0IsRUFBRSxZQUFvQjtRQUVwRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVoQixJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsV0FBVztRQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUztRQUNSLE9BQU8sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxLQUFLLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVELFdBQVcsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7UUFDMUMsaUJBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVELFlBQVksQ0FBQyxDQUFvQjtRQUNoQyxpQkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVELFdBQVc7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdEIsQ0FBQztJQUVELFFBQVEsQ0FBQyxDQUFTO1FBQ2pCLGlCQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFDRCxFQUFFO0lBQ0YscUVBQXFFO0lBQ3JFLHlGQUF5RjtJQUN6RixFQUFFO0lBQ0YsOENBQThDO0lBQzlDLGlDQUFpQztJQUNqQyxFQUFFO0lBQ0YsK0JBQStCO0lBQy9CLGFBQWE7SUFDYiwwQkFBMEI7SUFDMUIsa0NBQWtDO0lBQ2xDLDZCQUE2QjtJQUM3QixFQUFFO0lBQ0YsSUFBSTtJQUVKLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFTLEVBQUUsQ0FBbUI7O1FBQ3JELE1BQU0sSUFBSSxHQUFHLElBQUksMkJBQWlCLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEYsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLGtDQUNwQixJQUFJLEtBQ1AsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQ3BCLFlBQVksRUFBRSxJQUFJLFdBQ2hCLENBQUMsQ0FBQyxhQUFhLG1DQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBUyxFQUFFLENBQW1COztRQUM3RCxNQUFNLElBQUksR0FBRyxJQUFJLDJCQUFpQixFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXhFLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxrQ0FDcEIsSUFBSSxLQUNQLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUNwQixZQUFZLEVBQUUsQ0FBQyxDQUFDLFlBQVksV0FDMUIsQ0FBQyxDQUFDLGFBQWEsbUNBQUksQ0FBQyxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNEO0FBcFNELHVCQW9TQzs7Ozs7QUMzVEQsdUNBQXNEO0FBQ3RELG1EQUE0QztBQWlCNUMsTUFBcUIsT0FBTztJQU8zQixZQUFZLENBQVMsRUFBRSxHQUFzQjtRQUxyQyxnQkFBVyxHQUFxQixJQUFJLENBQUM7UUFDckMsaUJBQVksR0FBc0IsSUFBSSxDQUFDO1FBQ3ZDLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFJaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRU8sVUFBVSxDQUFDLENBQVM7UUFFM0IsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVoQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM1QyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFFLFVBQVUsQ0FBQyxFQUFFO1lBRWpELElBQUksVUFBVSxDQUFDLGtCQUFrQixJQUFFLEVBQUUsQ0FBQyxpQkFBaUIsSUFBSSxVQUFVLENBQUMsa0JBQWtCLElBQUUsRUFBRSxDQUFDLGtCQUFrQixFQUFFO2dCQUVoSCwrQ0FBK0M7Z0JBQy9DLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7Z0JBQzNELFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7Z0JBRTdELElBQUksQ0FBQyxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUVyRSxFQUFFLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFDckMsVUFBVSxDQUFDLGtCQUFrQixFQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQ3hCLENBQUMsQ0FBQyxDQUFDO2FBRUo7aUJBQU07Z0JBRU4sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDdkMsRUFBRSxDQUFDLDhCQUE4QixDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUN2QixVQUFVLENBQUMsMEJBQTBCLEVBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN6QjtxQkFBTTtvQkFDTixFQUFFLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLFlBQVksRUFDckMsVUFBVSxDQUFDLDBCQUEwQixFQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDekI7Z0JBRUQsRUFBRSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzlHO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFHLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLG9CQUFvQixFQUFFO1lBQ3hFLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUMzQztRQUVELEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQscUJBQXFCLENBQUMsQ0FBUztRQUU5QixNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2hCLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELHNCQUFzQixDQUFDLENBQVM7UUFFL0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLGtCQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3RCLENBQUM7Q0FDRDtBQWhGRCwwQkFnRkM7Ozs7QUNuR0Q7Ozs7OztHQU1HOztBQW9CSDs7O0dBR0c7QUFDSCxNQUFxQixPQUFPO0lBTzNCO1FBTEEsZUFBVSxHQUFpQixJQUFJLENBQUM7UUFDaEMsVUFBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1gsV0FBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1osV0FBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBR1osQ0FBQztJQUVELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUEwQixFQUFFLFFBQTRCO1FBQ2hGLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQzNCO1lBQ0MsTUFBTSxFQUFFLEVBQUUsQ0FBQyxnQkFBZ0I7WUFDM0IsT0FBTyxFQUFFLFFBQVE7WUFDakIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxhQUFhO1lBQzNCLFNBQVMsRUFBRSxFQUFFLENBQUMsTUFBTTtZQUNwQixlQUFlLEVBQUUsRUFBRSxDQUFDLElBQUk7WUFDeEIsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJO1NBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBMEIsRUFBRSxJQUF3QjtRQUVyRSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUcsS0FBSyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQzVCO1FBRUQsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXRDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUV4QyxNQUFNLFNBQVMsR0FBb0IsSUFBSSxDQUFDLE1BQU0sS0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTdFLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBRyxLQUFLLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7U0FDL0I7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUcsS0FBSyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQ25DO1FBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztTQUM3QjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUVqQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNoQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUcsRUFBRSxDQUFDLGdCQUFnQixFQUFFO29CQUV0QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDbkMsRUFBRSxDQUFDLFVBQVUsQ0FDWixFQUFFLENBQUMsMkJBQTJCLEdBQUcsS0FBSyxFQUN0QyxDQUFDLEVBQ0QsSUFBSSxDQUFDLGVBQWUsRUFDcEIsR0FBRyxDQUFDLEtBQUssRUFDVCxHQUFHLENBQUMsTUFBTSxFQUNWLENBQUMsRUFDRCxJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxJQUFJLEVBQ1QsR0FBRyxDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDLENBQUM7aUJBQ0g7cUJBQU07b0JBQ04sTUFBSyxDQUFDLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUMsQ0FBQztpQkFDbkU7YUFFRDtpQkFBTTtnQkFFTixZQUFZO2dCQUNaLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBRTdCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUM3QixFQUFFLENBQUMsVUFBVSxDQUNaLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQ2YsSUFBSSxDQUFDLGVBQWUsRUFDcEIsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsTUFBTSxFQUNYLENBQUMsRUFDRCxJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxJQUFJLEVBQ1QsT0FBTyxDQUFDLENBQUM7YUFDVjtTQUNEO2FBQU07WUFDTixFQUFFLENBQUMsVUFBVSxDQUNaLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQ2YsSUFBSSxDQUFDLGVBQWUsRUFDcEIsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsTUFBTSxFQUNYLENBQUMsRUFDRCxJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxJQUFJLEVBQ1QsU0FBUyxDQUFDLENBQUM7U0FDWjtRQUVELE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFFOUIsT0FBTyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDaEMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM3QixPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFN0IsZ0NBQWdDO1FBQ2hDLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBRyxLQUFLLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDM0I7UUFFRCw2QkFBNkI7UUFDN0IsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFHLEVBQUUsQ0FBQyxzQkFBc0I7WUFDN0MsSUFBSSxDQUFDLFNBQVMsS0FBRyxFQUFFLENBQUMscUJBQXFCO1lBQ3pDLElBQUksQ0FBQyxTQUFTLEtBQUcsRUFBRSxDQUFDLHFCQUFxQjtZQUN6QyxJQUFJLENBQUMsU0FBUyxLQUFHLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRTtZQUUxQyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBRyxLQUFLLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDM0I7UUFFRCxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRSxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVyRSxvQkFBb0I7UUFDcEIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFHLEtBQUssQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztTQUNsQztRQUNELEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRSxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakUsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN0QyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDakU7UUFFRCxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFckMsT0FBTyxPQUFPLENBQUM7SUFDaEIsQ0FBQztJQUVELGtCQUFrQjtJQUVsQixDQUFDO0lBRUQsSUFBSSxDQUFDLEVBQTBCO1FBQzlCLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELE9BQU8sQ0FBQyxFQUEwQjtRQUNqQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsWUFBWSxDQUFDLEVBQTBCLEVBQUUsSUFBWTtRQUNwRCxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBRUQ7QUEvSkQsMEJBK0pDOzs7Ozs7QUM3TEQsa0NBQTJCO0FBSWQsUUFBQSxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUM7SUFDNUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRztJQUNmLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRztJQUNoQixDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHO0lBQ2YsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUc7SUFDZCxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztJQUNkLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUc7SUFDZixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUNkLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztDQUNiLENBQUMsQ0FBQztBQUVILE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVqRSxRQUFBLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQztJQUMxQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDaEIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2hCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNoQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDaEIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2hCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztDQUNoQixDQUFDLENBQUM7QUFFSCxNQUFhLElBQUssU0FBUSxjQUFJO0lBRzdCLFlBQVksQ0FBUyxFQUFFLFFBQWtCLEVBQUUsT0FBZ0IsRUFBRSxhQUFzQjtRQUNsRixLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksT0FBTyxFQUFFO1lBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQzlDO2FBQU07WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDdkM7SUFDRixDQUFDO0lBRU8sWUFBWSxDQUFDLENBQVMsRUFBRSxRQUFrQixFQUFFLGFBQXNCO1FBRXpFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ1osUUFBUSxFQUFFLG9CQUFZO1lBQ3RCLEVBQUUsRUFBRSxFQUFFO1lBQ04sS0FBSyxFQUFFLG1CQUFXO1lBQ2xCLFFBQVE7U0FDUixFQUFFLGFBQWEsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRU8sS0FBSyxDQUFDLENBQVMsRUFBRSxRQUFrQixFQUFFLGFBQXNCO1FBQ2xFLE1BQU0sUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDO1lBRWpDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUc7WUFDZixHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRztZQUNkLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztZQUNiLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztZQUNiLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO1lBQ2QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRztZQUVmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO1lBQ2QsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztZQUNmLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRztZQUNoQixDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUc7WUFDaEIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRztZQUNmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO1lBRWQsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHO1lBQ2hCLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUc7WUFDZixHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRztZQUNkLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHO1lBQ2QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRztZQUNmLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRztZQUVoQixHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHO1lBQ2YsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUc7WUFDZCxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7WUFDYixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7WUFDYixHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRztZQUNkLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUc7WUFFZixHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztZQUNkLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUc7WUFDZixDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUc7WUFDaEIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHO1lBQ2hCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUc7WUFDZixHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztZQUdkLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztZQUNiLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHO1lBQ2QsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztZQUNmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUc7WUFDZixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztZQUNkLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztTQUNiLENBQUMsQ0FBQztRQUVILE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxDQUFDO1lBQzNCLEdBQUcsRUFBRSxHQUFHO1lBQ1IsR0FBRyxFQUFFLEdBQUc7WUFDUixHQUFHLEVBQUUsR0FBRztZQUNSLEdBQUcsRUFBRSxHQUFHO1lBQ1IsR0FBRyxFQUFFLEdBQUc7WUFDUixHQUFHLEVBQUUsR0FBRztZQUVSLEdBQUcsRUFBRSxHQUFHO1lBQ1IsR0FBRyxFQUFFLEdBQUc7WUFDUixHQUFHLEVBQUUsR0FBRztZQUNSLEdBQUcsRUFBRSxHQUFHO1lBQ1IsR0FBRyxFQUFFLEdBQUc7WUFDUixHQUFHLEVBQUUsR0FBRztZQUVSLEdBQUcsRUFBRSxHQUFHO1lBQ1IsR0FBRyxFQUFFLEdBQUc7WUFDUixHQUFHLEVBQUUsR0FBRztZQUNSLEdBQUcsRUFBRSxHQUFHO1lBQ1IsR0FBRyxFQUFFLEdBQUc7WUFDUixHQUFHLEVBQUUsR0FBRztZQUVSLEdBQUcsRUFBRSxHQUFHO1lBQ1IsR0FBRyxFQUFFLEdBQUc7WUFDUixHQUFHLEVBQUUsR0FBRztZQUNSLEdBQUcsRUFBRSxHQUFHO1lBQ1IsR0FBRyxFQUFFLEdBQUc7WUFDUixHQUFHLEVBQUUsR0FBRztZQUVSLEdBQUcsRUFBRSxHQUFHO1lBQ1IsR0FBRyxFQUFFLEdBQUc7WUFDUixHQUFHLEVBQUUsR0FBRztZ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QUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSTtZQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBRUQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQVc7UUFDbkMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0IsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0IsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUM1QixNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFFNUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxLQUFHLENBQUMsRUFBRTtZQUNWLGlGQUFpRjtZQUNqRixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQztRQUVELE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDRDtBQXBFRCx3QkFvRUM7QUFTRCxNQUFhLElBQUk7SUFhaEIsWUFBbUIsT0FBZSxFQUFTLE9BQWU7UUFBdkMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFYMUQsT0FBRSxHQUFHLENBQUMsQ0FBQztRQUNQLE9BQUUsR0FBRyxDQUFDLENBQUM7UUFDUCxPQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRVAsZ0JBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNEQUFzRDtRQUNuRSwwQ0FBMEM7UUFFL0MsbUNBQW1DO1FBQ25DLHdCQUF3QjtRQUN4QixnQkFBVyxHQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUUsZ0JBQWdCO0lBR3ZELENBQUM7SUFFRCxjQUFjLENBQUMsQ0FBVztRQUN6QixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ3RCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFFcEIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLEtBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUk7UUFDSCxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEYsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdELENBQUM7Q0FFRDtBQTdCRCxvQkE2QkM7QUFFRDtJQUFBLE1BQWEsU0FBUztRQWNyQixZQUFtQixJQUFVO1lBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtZQVA3QixhQUFRLEdBQWdCLEVBQUUsQ0FBQztZQUUzQiwwQkFBcUIsR0FBRyxDQUFDLENBQUM7WUFDMUIsdUJBQWtCLEdBQWEsRUFBRSxDQUFDO1lBRWxDLE9BQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUdQLElBQUksQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNwQixDQUFDO1FBRUQsSUFBSSxhQUFhO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVELElBQUksV0FBVztZQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVELElBQUksRUFBRTtZQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDMUIsQ0FBQztRQUVELElBQUksRUFBRTtZQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDMUIsQ0FBQztRQUVELElBQUk7WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xCLENBQUM7O0lBcENjLGNBQUksR0FBRyxDQUFDLENBQUM7SUFxQ3pCLGdCQUFDO0tBQUE7QUF2Q1ksOEJBQVM7QUE4Q3RCLE1BQWEsRUFBRTtJQUlkO1FBRkEsUUFBRyxHQUFHLElBQUksR0FBRyxFQUEwQixDQUFDO0lBRXpCLENBQUM7SUFFaEIsTUFBTSxDQUFDLEVBQVUsRUFBRSxFQUFVLEVBQUUsQ0FBSTtRQUVsQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV6QixJQUFJLENBQUMsS0FBRyxTQUFTLEVBQUU7WUFDbEIsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFhLENBQUM7WUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3BCO1FBRUQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRUQsR0FBRyxDQUFDLEVBQVUsRUFBRSxFQUFVOztRQUN6QixhQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQywwQ0FBRSxHQUFHLENBQUMsRUFBRSxFQUFFO0lBQ2xDLENBQUM7SUFFRCxJQUFJLENBQUMsRUFBVSxFQUFFLEVBQVU7O1FBQzFCLG1CQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQywwQ0FBRSxHQUFHLENBQUMsRUFBRSwwQ0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsMENBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRTtJQUMvRCxDQUFDO0lBRUQsS0FBSyxDQUFFLFNBQXNEO1FBQzVELE1BQU0sS0FBSyxHQUFHLElBQUksRUFBRSxFQUFLLENBQUM7UUFFMUIsSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFFLEVBQUU7WUFDekIsSUFBSSxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtnQkFDeEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RCO1FBQ0YsQ0FBQyxDQUFDLENBQUE7UUFFSCxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBVSxFQUFFLEVBQVU7O1FBQzVCLE1BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLDBDQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUU7SUFDOUIsQ0FBQztJQUVELE9BQU8sQ0FBRSxFQUE0QztRQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUM1QixFQUFFLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO2dCQUNyQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQVUsRUFBRSxFQUFVOztRQUM1QixPQUFPLE9BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLDBDQUFFLEdBQUcsQ0FBQyxFQUFFLE9BQUssU0FBUyxDQUFDO0lBQy9DLENBQUM7SUFFRCxPQUFPO1FBQ04sTUFBTSxDQUFDLEdBQVMsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRUQsSUFBSTtRQUNILElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBRSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxDQUFDO0lBQ1YsQ0FBQztDQUNEO0FBakVELGdCQWlFQztBQVdELE1BQU0sR0FBRyxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDN0IsTUFBTSxLQUFLLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMvQixNQUFNLEVBQUUsR0FBRyxvQkFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBVy9CLE1BQXFCLFdBQVc7SUFxQi9CO1FBbkJBLHNDQUFzQztRQUN0QyxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixVQUFLLEdBQUcsSUFBSSxFQUFFLEVBQVEsQ0FBQyxDQUFFLG1CQUFtQjtRQUk1QyxRQUFRO1FBQ1IscUJBQWdCLEdBQWEsRUFBRSxDQUFDO1FBQ2hDLFdBQU0sR0FBYSxFQUFFLENBQUM7UUFDdEIsVUFBSyxHQUFhLEVBQUUsQ0FBQztJQVlyQixDQUFDO0lBRUQsU0FBUyxDQUFDLENBQWtCO1FBRTNCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVuQixNQUFNLEVBQUUsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDcEIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sSUFBSSxDQUFDLENBQUM7UUFFakYsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsQyxPQUFPO2dCQUNOLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7YUFDekIsQ0FBQTtRQUNGLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFFZixPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFFRCxXQUFXLENBQUMsQ0FBb0I7O1FBRS9CLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVuQixJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQzNCLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFFdEMsSUFBSSxDQUFDLFlBQVksU0FBRyxDQUFDLENBQUMsWUFBWSxtQ0FBSSxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxRQUFRLFFBQUUsQ0FBQyxDQUFDLFNBQVMsbUNBQUksSUFBSSxDQUFDLENBQUM7UUFFdkQseURBQXlEO1FBQ3pELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakMsT0FBTyxDQUFDLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDO1FBRXJELFFBQVE7UUFFUixpQ0FBaUM7UUFDakMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDckMsT0FBTyxJQUFJLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQTtRQUVGLCtDQUErQztRQUUvQywrQkFBK0I7UUFDL0IsNERBQTREO1FBQzVELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRCxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzdCO2FBQU07WUFDTixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxJQUFJLENBQUMsQ0FBQztTQUNqRjtRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbEMsT0FBTztnQkFDTixFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2FBQ3pCLENBQUE7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVPLGNBQWMsQ0FBQyxFQUFjO1FBRXBDLE1BQU0sS0FBSyxHQUFlLEVBQUUsQ0FBQztRQUU3QixFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUM7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sUUFBUSxHQUFHLElBQUksRUFBRSxFQUFZLENBQUM7UUFDcEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqQixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDNUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQy9CO1FBQ0YsQ0FBQyxDQUFDLENBQUE7UUFFRixNQUFNLFFBQVEsR0FBZSxFQUFFLENBQUM7UUFDaEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO1FBRUYsT0FBTyxRQUFRLENBQUM7SUFDakIsQ0FBQztJQUVPLGdCQUFnQixDQUFDLFFBQTZCLEVBQUUsU0FBa0I7UUFFekUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRXZCLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUNqQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsS0FBSyxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO1lBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0QsSUFBSSxTQUFTLEVBQUU7WUFDZCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUN6QjtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxPQUFPLENBQUMsU0FBc0I7UUFFN0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxFQUFFLEVBQWEsQ0FBQyxDQUFDLCtCQUErQjtRQUVuRSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3JCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFWCxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUvQixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxTQUFTLEdBQWEsRUFBRSxDQUFDO1FBQy9CLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqRCxNQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBcUIsQ0FBQztRQUNsRCxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpFLE1BQU0sU0FBUyxHQUFnQixFQUFFLENBQUM7UUFDbEMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3QixPQUFPLFlBQVksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBRW5ELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksT0FBTyxHQUFjLElBQUksQ0FBQztZQUM5QixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQzdCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRWxCLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLHNEQUFzRDtnQkFDdEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFO29CQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRTt3QkFDL0MsT0FBTyxHQUFHLENBQUMsQ0FBQzt3QkFDWixLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDYixRQUFRLEdBQUcsT0FBTyxDQUFDO3dCQUNuQixPQUFPLEdBQUcsSUFBSSxDQUFDO3FCQUNmO2dCQUNGLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLE9BQU8sRUFBRTtnQkFFWixNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUV6QyxtRUFBbUU7Z0JBQ25FLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsSUFBSSxFQUFFO29CQUVqQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFekMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDekIsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFeEIsSUFBSSxNQUFNLEVBQUU7d0JBQ1gsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7cUJBQ3hCO2lCQUNEO2dCQUVELFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBRXBDO2lCQUFNO2dCQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQy9CLE1BQU07YUFDTjtTQUNEO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbEIsQ0FBQztJQUVELHlCQUF5QjtJQUN6Qiw2RUFBNkU7SUFDN0UsdUNBQXVDO0lBQ3ZDLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDViw2QkFBNkI7UUFFcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEVBQUUsRUFBYSxDQUFDO1FBRXJDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNqRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDbkIsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQ25CLENBQUM7YUFDRjtpQkFBTTtnQkFDTixXQUFXLEVBQUUsQ0FBQzthQUNkO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGtCQUFrQixXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRTdHLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsV0FBVztRQUVWLE1BQU0sUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPO1lBQ04sUUFBUTtZQUNSLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQy9ELEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDdkIsQ0FBQztJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsRUFBVyxFQUFFLEVBQVc7UUFDbkMsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUU5RCxFQUFFLEdBQUcsRUFBRSxhQUFGLEVBQUUsY0FBRixFQUFFLEdBQUksQ0FBQyxDQUFDO1FBQ2IsRUFBRSxHQUFHLEVBQUUsYUFBRixFQUFFLGNBQUYsRUFBRSxHQUFJLENBQUMsQ0FBQztRQUViLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO1FBRUgsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFFLEVBQUUsQ0FBQyxFQUFFO1lBRTVCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQztZQUNsQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsR0FBQyxFQUFFLEVBQUU7Z0JBQ25FLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDWixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNaO2dCQUNELElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDWixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNaO2dCQUNELElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDWixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNaO2FBQ0Q7WUFFRCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsR0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxFQUFFO2dCQUNuRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0JBQ1osRUFBRSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2Q7Z0JBQ0QsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUNaLEVBQUUsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNkO2dCQUNELElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDWixFQUFFLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDZDthQUNEO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFTyxZQUFZLENBQUMsQ0FBUztRQUM3QixDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFTyxVQUFVLENBQUMsRUFBVSxFQUFFLEVBQVUsRUFBRSxLQUFhO1FBRXZELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3pDLE9BQU87U0FDUDtRQUVELE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZDLENBQUMsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDYixDQUFDLENBQUMsRUFBRSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXpDLE9BQU8sQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVPLG1CQUFtQixDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQUUsR0FBVztRQUNoRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDO1lBQ3hDLFVBQVUsRUFBRSxHQUFHO1lBQ2YsUUFBUSxFQUFFLEdBQUc7WUFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztTQUNoQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDO1lBQ3hDLFVBQVUsRUFBRSxHQUFHO1lBQ2YsUUFBUSxFQUFFLEdBQUc7WUFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztTQUNoQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDO1lBQ3hDLFVBQVUsRUFBRSxHQUFHO1lBQ2YsUUFBUSxFQUFFLEdBQUc7WUFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztTQUNoQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRWhDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyxPQUFPLENBQUMsS0FBYSxFQUFFLEdBQVcsRUFBRSxHQUFXLEVBQUUsR0FBVztRQUVuRSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBRWhDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLE9BQU87U0FDUDtRQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLEtBQUssQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0QjtRQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLEtBQUssQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0QjtRQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLEtBQUssQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0QjtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXZGLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTyxTQUFTLENBQUMsQ0FBTztRQUV4QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QixDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVELEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNiLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNiLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7YUFBTTtZQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUN6QztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM1QyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1RCxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDYixFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDYixFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO2FBQU07WUFDTixPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDekM7SUFFRixDQUFDO0lBRU8sZ0JBQWdCO1FBRXZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDckMsT0FBTyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQTtRQUN6QixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSx3QkFBd0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzQixNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1FBQ3BDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUVPLG9CQUFvQixDQUFDLFNBQXNCLEVBQUUsTUFBYyxFQUFFLFVBQXFCO1FBRXpGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLEtBQUssTUFBTSxJQUFJLENBQUMsQ0FBQyxXQUFXLEtBQUssTUFBTSxDQUFDLENBQUM7UUFDekYsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBRXBCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLENBQUMsYUFBYSxLQUFLLE1BQU0sRUFBRTtvQkFDL0IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNUO2dCQUVELElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtvQkFDeEIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzVCO2dCQUVELENBQUMsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO2dCQUV0QixTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNwQjtRQUNGLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVPLGlCQUFpQjtRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3pCLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVPLHlCQUF5QixDQUFDLEtBQTBCO1FBRTNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLElBQUksR0FBRyxHQUFRLEVBQUUsQ0FBQztRQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ25CLENBQUMsRUFBRSxDQUFDO2dCQUNKLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbkI7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMxQztJQUNGLENBQUM7SUFFTyxxQkFBcUI7UUFFNUIsTUFBTSxXQUFXLEdBQWEsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztRQUU5QixNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQyxDQUFDLG1CQUFtQjtRQUU1RCxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQVUsRUFBRSxFQUFVLEVBQUUsRUFBRTtZQUMxQyxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksRUFBRSxLQUFLLFNBQVMsRUFBRTtnQkFDckIsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDUixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNsQjtZQUVELElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDNUIsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNkO1FBQ0YsQ0FBQyxDQUFBO1FBRUQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFPLEVBQUUsRUFBRTtZQUMxQixPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUE7UUFFRCxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQWUsRUFBRSxFQUFFO1lBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFBO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNyQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV0QyxNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO1FBRTdDLHNCQUFzQjtRQUN0QiwrQkFBK0I7UUFDL0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRTtZQUVsQyxNQUFNLFFBQVEsR0FBRztnQkFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdCLENBQUM7WUFFRixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzdDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUMvQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzdDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDbkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM3QyxHQUFHLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBRW5DLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVoQyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRS9CLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QixTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUU3QixNQUFNLGdCQUFnQixHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUV4QywyRUFBMkU7WUFDM0UsMkRBQTJEO1lBQzNELE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFO2dCQUN0QixFQUFFLEVBQUUsRUFBRTtnQkFDTixNQUFNLEVBQUUsU0FBUztnQkFDakIsS0FBSztnQkFDTCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixtQkFBbUIsRUFBRSxRQUFRO2dCQUM3QixNQUFNO2FBQ04sQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN0QixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25ELENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU8sV0FBVyxDQUFDLG9CQUE2Qjs7UUFFaEQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFeEIsSUFBSSxvQkFBb0IsRUFBRTtZQUN6QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUM3QjtRQUVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXBDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0IsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUN6SjtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNsRixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxZQUFBLElBQUksQ0FBQyxJQUFJLDBDQUFFLE1BQU0sbUNBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFXLEVBQUUsU0FBa0I7UUFDNUQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEMsSUFBSSxTQUFTLEVBQUU7WUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDUixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1IsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNSO1FBRUQsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVPLG9CQUFvQjtRQUUzQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFZLEVBQUUsRUFBWTtRQUM1QyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7O09BR0c7SUFDSyxxQkFBcUIsQ0FBQyxJQUFlO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFxQjtRQUNyQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3pELE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDdkQsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFdkMsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pELFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFeEQsZ0JBQWdCO1FBQ2hCLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTFDLDRCQUE0QjtRQUM1QixJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEQsZ0NBQWdDO1FBQ2hDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU8sK0JBQStCLENBQUMsSUFBZTtRQUV0RCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRWpELE1BQU0sMkJBQTJCLEdBQUcsR0FBRyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN0RSxPQUFPLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBRSxrQkFBa0I7UUFDdEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsMkJBQTJCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzdELE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7UUFFSCxvRkFBb0Y7UUFDcEYsOERBQThEO1FBQzlELElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNqRCxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1NBQ0g7SUFDRixDQUFDO0lBRU8sYUFBYSxDQUFDLEtBQWE7UUFDbEMsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNuRCxzQkFBc0I7UUFDdEIsK0NBQStDO0lBQ2hELENBQUM7SUFFTyxhQUFhO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMzQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNqQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzFCLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMzQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFhO1FBRTFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbEMsT0FBTztnQkFDTixFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2FBQ3pCLENBQUE7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxDQUFTO1FBQ25DLE9BQU8sTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFTyxVQUFVLENBQUMsSUFBZSxFQUFFLEtBQWE7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU8sa0JBQWtCLENBQUMsSUFBZSxFQUFFLEtBQWE7UUFDeEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVqRCxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3RCLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFFdEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxTQUFTLEdBQUcsS0FBSztZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUU1QixNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNyRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsR0FBRyxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFdEMsb0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTyxhQUFhLENBQUMsSUFBZSxFQUFFLEtBQWE7UUFDbkQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRU8sdUJBQXVCLENBQUMsQ0FBWSxFQUFFLElBQVksRUFBRSxFQUFnQjtRQUUzRSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBRXRELFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQWdCLEVBQUUsQ0FBUyxFQUFFLElBQVk7UUFDbEUsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4QixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFeEIsTUFBTSxHQUFHLEdBQUcsb0JBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXpDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Q0FDRDtBQWh6QkQsOEJBZ3pCQzs7Ozs7O0FDdGlDWSxRQUFBLGtCQUFrQixHQUF3QjtJQUN0RCxJQUFJLEVBQUUsWUFBWTtJQUNsQixRQUFRLEVBQUU7UUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDVjtJQUNELEtBQUssRUFBRTtRQUNOLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0tBQ1A7Q0FDRCxDQUFBO0FBRVksUUFBQSxtQkFBbUIsR0FBd0I7SUFFdkQsSUFBSSxFQUFFLGFBQWE7SUFDbkIsUUFBUSxFQUFFO1FBQ1QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2hCLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDekIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztLQUNmO0lBQ0QsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkQsS0FBSyxFQUFFO1FBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNUO0NBQ0QsQ0FBQztBQUVXLFFBQUEsWUFBWSxHQUF3QjtJQUVoRCxJQUFJLEVBQUUsTUFBTTtJQUNaLFFBQVEsRUFBRTtRQUNULENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDbEIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDakIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2hCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUNoQixDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUNqQixDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDaEIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztLQUNmO0lBRUQsS0FBSyxFQUFFO1FBQ0wsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDcEI7SUFFRixLQUFLLEVBQUU7UUFDTixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztLQUNqQjtDQUNELENBQUE7QUFFWSxRQUFBLG1CQUFtQixHQUF3QjtJQUN2RCxJQUFJLEVBQUUsYUFBYTtJQUNuQixRQUFRLEVBQUU7UUFDVCxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUM7UUFDNUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQztRQUMzQixDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUM3QixDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDNUIsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQztRQUMzQixDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDNUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO1FBQzVCLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQzdCLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLENBQUMsVUFBVSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztLQUM3QjtJQUNELEtBQUssRUFBRTtRQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxD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QUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVksRUFBRSxDQUFlO1FBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZLEVBQUUsQ0FBZTtRQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBWSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVU7UUFDakUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQVksRUFBRSxDQUFTO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFZLEVBQUUsRUFBVSxFQUFFLEVBQVU7UUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFZLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVO1FBQ3JELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUks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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgVmVjdG9yMyBmcm9tIFwiLi9WZWN0b3IzXCI7XG5cbmNvbnN0IEVQU0lMT04gPSAuMDAwMDE7XG5cbi8qKlxuICogbWF0cml4NFxuICpcbiAqIFsgYSAgYiAgYyAgMCBdXG4gKiBbIGQgIGUgIGYgIDAgXVxuICogWyBnICBoICBpICAwIF1cbiAqIFsgdHggdHkgdHogMCBdXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdHJpeDQge1xuXG5cdHN0YXRpYyBwZXJzcGVjdGl2ZShvdXQ6IEZsb2F0MzJBcnJheSwgdmVydGljYWxGT1ZJblJhZGlhbnM6IG51bWJlciwgYXNwZWN0OiBudW1iZXIsIHpOZWFyOiBudW1iZXIsIHpGYXI6IG51bWJlcikgOiBGbG9hdDMyQXJyYXkge1xuXG5cdFx0Y29uc3QgZiA9IDEuMCAvIE1hdGgudGFuKHZlcnRpY2FsRk9WSW5SYWRpYW5zIC8gMi4wKTtcblx0XHRvdXRbMF0gPSBmIC8gYXNwZWN0O1xuXHRcdG91dFsxXSA9IDA7XG5cdFx0b3V0WzJdID0gMDtcblx0XHRvdXRbM10gPSAwO1xuXHRcdG91dFs0XSA9IDA7XG5cdFx0b3V0WzVdID0gZjtcblx0XHRvdXRbNl0gPSAwO1xuXHRcdG91dFs3XSA9IDA7XG5cdFx0b3V0WzhdID0gMDtcblx0XHRvdXRbOV0gPSAwO1xuXHRcdG91dFsxMV0gPSAtMS4wO1xuXHRcdG91dFsxMl0gPSAwO1xuXHRcdG91dFsxM10gPSAwO1xuXHRcdG91dFsxNV0gPSAwO1xuXG5cdFx0aWYgKHpGYXIgIT09IEluZmluaXR5KSB7XG5cdFx0XHRjb25zdCBuZiA9IDEgLyAoek5lYXIgLSB6RmFyKTtcblx0XHRcdG91dFsxMF0gPSAoekZhciArIHpOZWFyKSAqIG5mO1xuXHRcdFx0b3V0WzE0XSA9IDIuMCAqIHpGYXIgKiB6TmVhciAqIG5mO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRvdXRbMTBdID0gLTEuMDtcblx0XHRcdG91dFsxNF0gPSAtMi4wICogek5lYXI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dDtcblx0fVxuXG5cdHN0YXRpYyBvcnRobyhvdXQ6IEZsb2F0MzJBcnJheSwgbGVmdDogbnVtYmVyLCByaWdodDogbnVtYmVyLCB0b3A6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIG5lYXI6IG51bWJlciwgZmFyOiBudW1iZXIpIDogRmxvYXQzMkFycmF5IHtcblx0XHRjb25zdCBsciA9IDEuMCAvIChsZWZ0IC0gcmlnaHQpO1xuXHRcdGNvbnN0IGJ0ID0gMS4wIC8gKGJvdHRvbSAtIHRvcCk7XG5cdFx0Y29uc3QgbmYgPSAxLjAgLyAobmVhciAtIGZhcik7XG5cdFx0b3V0WzBdID0gLTIuMCAqIGxyO1xuXHRcdG91dFsxXSA9IDAuMDtcblx0XHRvdXRbMl0gPSAwLjA7XG5cdFx0b3V0WzNdID0gMC4wO1xuXHRcdG91dFs0XSA9IDAuMDtcblx0XHRvdXRbNV0gPSAtMi4wICogYnQ7XG5cdFx0b3V0WzZdID0gMC4wO1xuXHRcdG91dFs3XSA9IDAuMDtcblx0XHRvdXRbOF0gPSAwLjA7XG5cdFx0b3V0WzldID0gMC4wO1xuXHRcdG91dFsxMF0gPSAyLjAgKiBuZjtcblx0XHRvdXRbMTFdID0gMC4wO1xuXHRcdG91dFsxMl0gPSAobGVmdCArIHJpZ2h0KSAqIGxyO1xuXHRcdG91dFsxM10gPSAodG9wICsgYm90dG9tKSAqIGJ0O1xuXHRcdG91dFsxNF0gPSAoZmFyICsgbmVhcikgKiBuZjtcblx0XHRvdXRbMTVdID0gMS4wO1xuXHRcdHJldHVybiBvdXQ7XG5cdH1cblxuXHRzdGF0aWMgbXVsKG91dDogRmxvYXQzMkFycmF5LCBhOiBGbG9hdDMyQXJyYXksIGI6IEZsb2F0MzJBcnJheSkgOiBGbG9hdDMyQXJyYXkge1xuXHRcdGNvbnN0IGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM107XG5cdFx0Y29uc3QgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XTtcblx0XHRjb25zdCBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV07XG5cdFx0Y29uc3QgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV07XG5cblx0XHRsZXQgYjAgPSBiWzBdLCBiMSA9IGJbMV0sIGIyID0gYlsyXSwgYjMgPSBiWzNdO1xuXHRcdG91dFswXSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuXHRcdG91dFsxXSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuXHRcdG91dFsyXSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuXHRcdG91dFszXSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuXG5cdFx0YjAgPSBiWzRdO1xuXHRcdGIxID0gYls1XTtcblx0XHRiMiA9IGJbNl07XG5cdFx0YjMgPSBiWzddO1xuXHRcdG91dFs0XSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuXHRcdG91dFs1XSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuXHRcdG91dFs2XSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuXHRcdG91dFs3XSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuXG5cdFx0YjAgPSBiWzhdO1xuXHRcdGIxID0gYls5XTtcblx0XHRiMiA9IGJbMTBdO1xuXHRcdGIzID0gYlsxMV07XG5cdFx0b3V0WzhdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG5cdFx0b3V0WzldID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG5cdFx0b3V0WzEwXSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuXHRcdG91dFsxMV0gPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcblxuXHRcdGIwID0gYlsxMl07XG5cdFx0YjEgPSBiWzEzXTtcblx0XHRiMiA9IGJbMTRdO1xuXHRcdGIzID0gYlsxNV07XG5cdFx0b3V0WzEyXSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuXHRcdG91dFsxM10gPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcblx0XHRvdXRbMTRdID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XG5cdFx0b3V0WzE1XSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuXG5cdFx0cmV0dXJuIG91dDtcblx0fVxuXG5cdHN0YXRpYyBpbnZlcnNlKG91dDogRmxvYXQzMkFycmF5LCBhOiBGbG9hdDMyQXJyYXkpIHtcblx0fVxuXG5cdHN0YXRpYyBjbG9uZShhOiBGbG9hdDMyQXJyYXkpIDogRmxvYXQzMkFycmF5IHtcblx0XHRjb25zdCBiID0gTWF0cml4NC5jcmVhdGUoKTtcblx0XHRyZXR1cm4gTWF0cml4NC5jb3B5KGIsIGEpO1xuXHR9XG5cblx0c3RhdGljIGNvcHkob3V0OiBGbG9hdDMyQXJyYXksIG06IEZsb2F0MzJBcnJheSkgOiBGbG9hdDMyQXJyYXkge1xuXHRcdG91dC5zZXQobSk7XG5cdFx0cmV0dXJuIG91dDtcblx0fVxuXG5cdHN0YXRpYyBpZGVudGl0eShvdXQ6IEZsb2F0MzJBcnJheSwgb2Zmc2V0PzogbnVtYmVyKSA6IEZsb2F0MzJBcnJheSB7XG5cblx0XHRvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuXHRcdG91dFtvZmZzZXQrMF0gPSAxLjA7XG5cdFx0b3V0W29mZnNldCsxXSA9IDAuMDtcblx0XHRvdXRbb2Zmc2V0KzJdID0gMC4wO1xuXHRcdG91dFtvZmZzZXQrM10gPSAwLjA7XG5cdFx0b3V0W29mZnNldCs0XSA9IDAuMDtcblx0XHRvdXRbb2Zmc2V0KzVdID0gMS4wO1xuXHRcdG91dFtvZmZzZXQrNl0gPSAwLjA7XG5cdFx0b3V0W29mZnNldCs3XSA9IDAuMDtcblx0XHRvdXRbb2Zmc2V0KzhdID0gMC4wO1xuXHRcdG91dFtvZmZzZXQrOV0gPSAwLjA7XG5cdFx0b3V0W29mZnNldCsxMF0gPSAxLjA7XG5cdFx0b3V0W29mZnNldCsxMV0gPSAwLjA7XG5cdFx0b3V0W29mZnNldCsxMl0gPSAwLjA7XG5cdFx0b3V0W29mZnNldCsxM10gPSAwLjA7XG5cdFx0b3V0W29mZnNldCsxNF0gPSAwLjA7XG5cdFx0b3V0W29mZnNldCsxNV0gPSAxLjA7XG5cblx0XHRyZXR1cm4gb3V0O1xuXHR9XG5cblx0c3RhdGljIHZpZXdNYXRyaXgob3V0OiBGbG9hdDMyQXJyYXksIG1pbjogRmxvYXQzMkFycmF5KSA6IEZsb2F0MzJBcnJheSB7XG5cdFx0TWF0cml4NC5pZGVudGl0eShvdXQpO1xuXHRcdG91dFswXSA9IG1pblswXTtcblx0XHRvdXRbMV0gPSBtaW5bMV07XG5cdFx0b3V0WzJdID0gbWluWzJdO1xuXG5cdFx0b3V0WzRdID0gbWluWzRdO1xuXHRcdG91dFs1XSA9IG1pbls1XTtcblx0XHRvdXRbNl0gPSBtaW5bNl07XG5cblx0XHRvdXRbOF0gPSBtaW5bOF07XG5cdFx0b3V0WzldID0gbWluWzldO1xuXHRcdG91dFsxMF0gPSBtaW5bMTBdO1xuXG5cdFx0cmV0dXJuIG91dDtcblx0fVxuXG5cdHN0YXRpYyBsb29rQXQob3V0OiBGbG9hdDMyQXJyYXksIGV5ZTogRmxvYXQzMkFycmF5LCBsb29rQXQ6IEZsb2F0MzJBcnJheSwgdXA6IEZsb2F0MzJBcnJheSkgOiBGbG9hdDMyQXJyYXkge1xuXG5cdFx0Y29uc3QgZXlleCA9IGV5ZVswXTtcblx0XHRjb25zdCBleWV5ID0gZXllWzFdO1xuXHRcdGNvbnN0IGV5ZXogPSBleWVbMl07XG5cdFx0Y29uc3QgdXB4ID0gdXBbMF07XG5cdFx0Y29uc3QgdXB5ID0gdXBbMV07XG5cdFx0Y29uc3QgdXB6ID0gdXBbMl07XG5cdFx0Y29uc3QgbG9va0F0WCA9IGxvb2tBdFswXTtcblx0XHRjb25zdCBsb29rQXRZID0gbG9va0F0WzFdO1xuXHRcdGNvbnN0IGxvb2tBdFogPSBsb29rQXRbMl07XG5cblx0XHQvLyBleWUgYW5kIGxvb2tBdCBhcmUgbW9zdGx5IHRoZSBzYW1lLlxuXHRcdGlmIChNYXRoLmFicyhleWV4IC0gbG9va0F0WCkgPCBFUFNJTE9OICYmXG5cdFx0XHRNYXRoLmFicyhleWV5IC0gbG9va0F0WSkgPCBFUFNJTE9OICYmXG5cdFx0XHRNYXRoLmFicyhleWV6IC0gbG9va0F0WikgPCBFUFNJTE9OKSB7XG5cdFx0XHRyZXR1cm4gTWF0cml4NC5pZGVudGl0eShvdXQpO1xuXHRcdH1cblxuXHRcdGxldCB4MCwgeDEsIHgyLCB5MCwgeTEsIHkyLCB6MCwgejEsIHoyLCBsZW47XG5cblx0XHQvLyBmb3J3YXJkIHZlY3RvclxuXHRcdHowID0gZXlleCAtIGxvb2tBdFg7XG5cdFx0ejEgPSBleWV5IC0gbG9va0F0WTtcblx0XHR6MiA9IGV5ZXogLSBsb29rQXRaO1xuXG5cdFx0Ly8gbm9ybWFsaXplZFxuXHRcdGxlbiA9IDEgLyBNYXRoLmh5cG90KHowLCB6MSwgejIpO1xuXHRcdHowICo9IGxlbjtcblx0XHR6MSAqPSBsZW47XG5cdFx0ejIgKj0gbGVuO1xuXG5cdFx0Ly8gY3Jvc3MgdmVjdG9yIGJldHdlZW4gdXAgYW5kIGZvcndhcmQgKHJpZ2h0IHZlY3Rvcilcblx0XHR4MCA9IHVweSAqIHoyIC0gdXB6ICogejE7XG5cdFx0eDEgPSB1cHogKiB6MCAtIHVweCAqIHoyO1xuXHRcdHgyID0gdXB4ICogejEgLSB1cHkgKiB6MDtcblx0XHRsZW4gPSBNYXRoLmh5cG90KHgwLCB4MSwgeDIpO1xuXHRcdGlmICghbGVuKSB7XG5cdFx0XHR4MCA9IDAuMDtcblx0XHRcdHgxID0gMC4wO1xuXHRcdFx0eDIgPSAwLjA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlbiA9IDEgLyBsZW47XG5cdFx0XHR4MCAqPSBsZW47XG5cdFx0XHR4MSAqPSBsZW47XG5cdFx0XHR4MiAqPSBsZW47XG5cdFx0fVxuXG5cdFx0Ly8gY3Jvc3MgcmlnaHQvZm9yd2FyZCAodXApXG5cdFx0eTAgPSB6MSAqIHgyIC0gejIgKiB4MTtcblx0XHR5MSA9IHoyICogeDAgLSB6MCAqIHgyO1xuXHRcdHkyID0gejAgKiB4MSAtIHoxICogeDA7XG5cblx0XHRsZW4gPSBNYXRoLmh5cG90KHkwLCB5MSwgeTIpO1xuXHRcdGlmIChsZW49PT0wKSB7XG5cdFx0XHR5MCA9IDAuMDtcblx0XHRcdHkxID0gMC4wO1xuXHRcdFx0eTIgPSAwLjA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlbiA9IDEuMCAvIGxlbjtcblx0XHRcdHkwICo9IGxlbjtcblx0XHRcdHkxICo9IGxlbjtcblx0XHRcdHkyICo9IGxlbjtcblx0XHR9XG5cblx0XHRvdXRbMF0gPSB4MDtcblx0XHRvdXRbMV0gPSB5MDtcblx0XHRvdXRbMl0gPSB6MDtcblx0XHRvdXRbM10gPSAwLjA7XG5cdFx0b3V0WzRdID0geDE7XG5cdFx0b3V0WzVdID0geTE7XG5cdFx0b3V0WzZdID0gejE7XG5cdFx0b3V0WzddID0gMC4wO1xuXHRcdG91dFs4XSA9IHgyO1xuXHRcdG91dFs5XSA9IHkyO1xuXHRcdG91dFsxMF0gPSB6Mjtcblx0XHRvdXRbMTFdID0gMC4wO1xuXHRcdG91dFsxMl0gPSAtKHgwICogZXlleCArIHgxICogZXlleSArIHgyICogZXlleik7XG5cdFx0b3V0WzEzXSA9IC0oeTAgKiBleWV4ICsgeTEgKiBleWV5ICsgeTIgKiBleWV6KTtcblx0XHRvdXRbMTRdID0gLSh6MCAqIGV5ZXggKyB6MSAqIGV5ZXkgKyB6MiAqIGV5ZXopO1xuXHRcdG91dFsxNV0gPSAxLjA7XG5cblx0XHRyZXR1cm4gb3V0O1xuXHR9XG5cblx0c3RhdGljIHRyYW5zcG9zZShvdXQ6IEZsb2F0MzJBcnJheSwgbTogRmxvYXQzMkFycmF5KSA6IEZsb2F0MzJBcnJheSB7XG5cdFx0aWYgKG91dD09PW0pIHtcblx0XHRcdGNvbnN0IGEwMSA9IG1bMV0sIGEwMiA9IG1bMl0sIGEwMyA9IG1bM107XG5cdFx0XHRjb25zdCBhMTIgPSBtWzZdLCBhMTMgPSBtWzddO1xuXHRcdFx0Y29uc3QgYTIzID0gbVsxMV07XG5cblx0XHRcdG91dFsxXSA9IG1bNF07XG5cdFx0XHRvdXRbMl0gPSBtWzhdO1xuXHRcdFx0b3V0WzNdID0gbVsxMl07XG5cdFx0XHRvdXRbNF0gPSBhMDE7XG5cdFx0XHRvdXRbNl0gPSBtWzldO1xuXHRcdFx0b3V0WzddID0gbVsxM107XG5cdFx0XHRvdXRbOF0gPSBhMDI7XG5cdFx0XHRvdXRbOV0gPSBhMTI7XG5cdFx0XHRvdXRbMTFdID0gbVsxNF07XG5cdFx0XHRvdXRbMTJdID0gYTAzO1xuXHRcdFx0b3V0WzEzXSA9IGExMztcblx0XHRcdG91dFsxNF0gPSBhMjM7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG91dFswXSA9IG1bMF07XG5cdFx0XHRvdXRbMV0gPSBtWzRdO1xuXHRcdFx0b3V0WzJdID0gbVs4XTtcblx0XHRcdG91dFszXSA9IG1bMTJdO1xuXHRcdFx0b3V0WzRdID0gbVsxXTtcblx0XHRcdG91dFs1XSA9IG1bNV07XG5cdFx0XHRvdXRbNl0gPSBtWzldO1xuXHRcdFx0b3V0WzddID0gbVsxM107XG5cdFx0XHRvdXRbOF0gPSBtWzJdO1xuXHRcdFx0b3V0WzldID0gbVs2XTtcblx0XHRcdG91dFsxMF0gPSBtWzEwXTtcblx0XHRcdG91dFsxMV0gPSBtWzE0XTtcblx0XHRcdG91dFsxMl0gPSBtWzNdO1xuXHRcdFx0b3V0WzEzXSA9IG1bN107XG5cdFx0XHRvdXRbMTRdID0gbVsxMV07XG5cdFx0XHRvdXRbMTVdID0gbVsxNV07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dDtcblx0fVxuXG5cdHN0YXRpYyB0cmFuc2xhdGUob3V0OiBGbG9hdDMyQXJyYXksIG06IEZsb2F0MzJBcnJheSwgdjogRmxvYXQzMkFycmF5KSA6IEZsb2F0MzJBcnJheSB7XG5cdFx0Y29uc3QgeCA9IHZbMF0sIHkgPSB2WzFdLCB6ID0gdlsyXTtcblxuXHRcdGlmIChtID09PSBvdXQpIHtcblx0XHRcdG91dFsxMl0gPSBtWzBdICogeCArIG1bNF0gKiB5ICsgbVs4XSAqIHogKyBtWzEyXTtcblx0XHRcdG91dFsxM10gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXTtcblx0XHRcdG91dFsxNF0gPSBtWzJdICogeCArIG1bNl0gKiB5ICsgbVsxMF0gKiB6ICsgbVsxNF07XG5cdFx0XHRvdXRbMTVdID0gbVszXSAqIHggKyBtWzddICogeSArIG1bMTFdICogeiArIG1bMTVdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBhMDAgPSBtWzBdLCBhMDEgPSBtWzFdLCBhMDIgPSBtWzJdLCBhMDMgPSBtWzNdO1xuXHRcdFx0Y29uc3QgYTEwID0gbVs0XSwgYTExID0gbVs1XSwgYTEyID0gbVs2XSwgYTEzID0gbVs3XTtcblx0XHRcdGNvbnN0IGEyMCA9IG1bOF0sIGEyMSA9IG1bOV0sIGEyMiA9IG1bMTBdLCBhMjMgPSBtWzExXTtcblxuXHRcdFx0b3V0WzBdID0gYTAwO1xuXHRcdFx0b3V0WzFdID0gYTAxO1xuXHRcdFx0b3V0WzJdID0gYTAyO1xuXHRcdFx0b3V0WzNdID0gYTAzO1xuXHRcdFx0b3V0WzRdID0gYTEwO1xuXHRcdFx0b3V0WzVdID0gYTExO1xuXHRcdFx0b3V0WzZdID0gYTEyO1xuXHRcdFx0b3V0WzddID0gYTEzO1xuXHRcdFx0b3V0WzhdID0gYTIwO1xuXHRcdFx0b3V0WzldID0gYTIxO1xuXHRcdFx0b3V0WzEwXSA9IGEyMjtcblx0XHRcdG91dFsxMV0gPSBhMjM7XG5cblx0XHRcdG91dFsxMl0gPSBhMDAgKiB4ICsgYTEwICogeSArIGEyMCAqIHogKyBtWzEyXTtcblx0XHRcdG91dFsxM10gPSBhMDEgKiB4ICsgYTExICogeSArIGEyMSAqIHogKyBtWzEzXTtcblx0XHRcdG91dFsxNF0gPSBhMDIgKiB4ICsgYTEyICogeSArIGEyMiAqIHogKyBtWzE0XTtcblx0XHRcdG91dFsxNV0gPSBhMDMgKiB4ICsgYTEzICogeSArIGEyMyAqIHogKyBtWzE1XTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0O1xuXHR9XG5cblx0c3RhdGljIHJvdGF0ZShvdXQ6IEZsb2F0MzJBcnJheSwgbTogRmxvYXQzMkFycmF5LCBldWxlcjogVmVjdG9yMykge1xuXG5cdFx0Y29uc3QgeHkgPSBldWxlclsyXTtcblx0XHRjb25zdCB4eiA9IGV1bGVyWzFdO1xuXHRcdGNvbnN0IHl6ID0gZXVsZXJbMF07XG5cblx0XHRjb25zdCBzeHk9IE1hdGguc2luKCB4eSApO1xuXHRcdGNvbnN0IHN4ej0gTWF0aC5zaW4oIHh6ICk7XG5cdFx0Y29uc3Qgc3l6PSBNYXRoLnNpbiggeXogKTtcblx0XHRjb25zdCBjeHk9IE1hdGguY29zKCB4eSApO1xuXHRcdGNvbnN0IGN4ej0gTWF0aC5jb3MoIHh6ICk7XG5cdFx0Y29uc3QgY3l6PSBNYXRoLmNvcyggeXogKTtcblxuXHRcdG0wWyAgMCBdPWN4eipjeHk7XG5cdFx0bTBbICAxIF09LWN4eipzeHk7XG5cdFx0bTBbICAyIF09c3h6O1xuXHRcdG0wWyAgMyBdPSAwO1xuXHRcdG0wWyAgNCBdPXN5eipzeHoqY3h5K3N4eSpjeXo7XG5cdFx0bTBbICA1IF09Y3l6KmN4eS1zeXoqc3h6KnN4eTtcblx0XHRtMFsgIDYgXT0tc3l6KmN4ejtcblx0XHRtMFsgIDcgXT0gMDtcblx0XHRtMFsgIDggXT1zeXoqc3h5LWN5eipzeHoqY3h5O1xuXHRcdG0wWyAgOSBdPWN5eipzeHoqc3h5K3N5eipjeHk7XG5cdFx0bTBbICAxMF09Y3l6KmN4ejtcblx0XHRtMFsgMTEgXT0gMDtcblx0XHRtMFsgMTIgXT0gMDtcblx0XHRtMFsgMTMgXT0gMDtcblx0XHRtMFsgMTQgXT0gMDtcblx0XHRtMFsgMTUgXT0gMTtcblxuXHRcdE1hdHJpeDQubXVsKG91dCwgbSwgbTApO1xuXHR9XG5cblx0LyoqXG5cdCAqIHNjYWxlIG1hdHJpeCBtIGJ5IHZlY3RvciB2LlxuXHQgKi9cblx0c3RhdGljIHNjYWxlKG91dDogRmxvYXQzMkFycmF5LCBtOiBGbG9hdDMyQXJyYXksIHY6IEZsb2F0MzJBcnJheSkgOiBGbG9hdDMyQXJyYXkge1xuXHRcdGNvbnN0IHggPSB2WzBdLCB5ID0gdlsxXSwgeiA9IHZbMl07XG5cblx0XHRvdXRbMF0gPSBtWzBdICogeDtcblx0XHRvdXRbMV0gPSBtWzFdICogeDtcblx0XHRvdXRbMl0gPSBtWzJdICogeDtcblx0XHRvdXRbM10gPSBtWzNdICogeDtcblx0XHRvdXRbNF0gPSBtWzRdICogeTtcblx0XHRvdXRbNV0gPSBtWzVdICogeTtcblx0XHRvdXRbNl0gPSBtWzZdICogeTtcblx0XHRvdXRbN10gPSBtWzddICogeTtcblx0XHRvdXRbOF0gPSBtWzhdICogejtcblx0XHRvdXRbOV0gPSBtWzldICogejtcblx0XHRvdXRbMTBdID0gbVsxMF0gKiB6O1xuXHRcdG91dFsxMV0gPSBtWzExXSAqIHo7XG5cdFx0b3V0WzEyXSA9IG1bMTJdO1xuXHRcdG91dFsxM10gPSBtWzEzXTtcblx0XHRvdXRbMTRdID0gbVsxNF07XG5cdFx0b3V0WzE1XSA9IG1bMTVdO1xuXHRcdHJldHVybiBvdXQ7XG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlKCkgOiBGbG9hdDMyQXJyYXkge1xuXHRcdGNvbnN0IHJldCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuXHRcdHJldFsgMF0gPSAxLjA7XG5cdFx0cmV0WyA1XSA9IDEuMDtcblx0XHRyZXRbMTBdID0gMS4wO1xuXHRcdHJldFsxNV0gPSAxLjA7XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0c3RhdGljIG1vZGVsTWF0cml4KG91dDogRmxvYXQzMkFycmF5LCBwb3NpdGlvbjogRmxvYXQzMkFycmF5LCByb3RhdGlvbjogRmxvYXQzMkFycmF5LCBzY2FsZTogRmxvYXQzMkFycmF5KSA6IEZsb2F0MzJBcnJheSB7XG5cdFx0TWF0cml4NC5pZGVudGl0eShvdXQpO1xuXHRcdE1hdHJpeDQudHJhbnNsYXRlKG91dCwgb3V0LCBwb3NpdGlvbik7XG5cdFx0TWF0cml4NC5yb3RhdGUob3V0LCBvdXQsIHJvdGF0aW9uKTtcblx0XHRNYXRyaXg0LnNjYWxlKG91dCwgb3V0LCBzY2FsZSk7XG5cblx0XHRyZXR1cm4gb3V0O1xuXHR9XG59XG5cbmNvbnN0IG0wID0gTWF0cml4NC5jcmVhdGUoKTsiLCJpbXBvcnQgVmVjdG9yMyBmcm9tIFwiLi9WZWN0b3IzXCI7XG5cbi8qKlxuICogYSBxdWF0ZXJuaW9uIHJlcHJlc2VudGF0aW9uIHdvdWxkIGJlIGEgZmxvYXRbNF0sIHdoZXJlXG4gKiAwLDEsMiA9IGksaixrXG4gKiAzID0gd1xuICovXG5cbmNvbnN0IHcgPSAzO1xuY29uc3QgaSA9IDA7XG5jb25zdCBqID0gMTtcbmNvbnN0IGsgPSAyO1xuXG5jb25zdCBfdjAgPSBWZWN0b3IzLmNyZWF0ZSgpO1xuY29uc3QgX3YxID0gVmVjdG9yMy5jcmVhdGUoKTtcbmNvbnN0IF92MiA9IFZlY3RvcjMuY3JlYXRlKCk7XG5jb25zdCBfdjMgPSBWZWN0b3IzLmNyZWF0ZSgpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWF0ZXJuaW9uIHtcblxuXHQvKipcblx0ICogcmV0dXJuIGEgZGVmYXVsdCBxdWF0ZXJuaW9uXG5cdCAqL1xuXHRzdGF0aWMgY3JlYXRlKCk6IEZsb2F0MzJBcnJheSB7XG5cdFx0Y29uc3QgciA9IG5ldyBGbG9hdDMyQXJyYXkoNCk7XG5cdFx0clt3XSA9IDEuMDtcblxuXHRcdHJldHVybiByO1xuXHR9XG5cblx0c3RhdGljIGNyZWF0ZUZyb21BeGlzQW5kQW5nbGUoYXhpczogRmxvYXQzMkFycmF5LCB0aGV0YTogbnVtYmVyKTogRmxvYXQzMkFycmF5IHtcblx0XHRyZXR1cm4gUXVhdGVybmlvbi5mcm9tQXhpc0FuZEFuZ2xlKFF1YXRlcm5pb24uY3JlYXRlKCksIGF4aXMsIHRoZXRhKTtcblx0fVxuXG5cdHN0YXRpYyBmcm9tQXhpc0FuZEFuZ2xlKG91dDogRmxvYXQzMkFycmF5LCBheGlzOiBGbG9hdDMyQXJyYXksIHRoZXRhOiBudW1iZXIpOiBGbG9hdDMyQXJyYXkge1xuXHRcdGNvbnN0IHMgPSBNYXRoLnNpbih0aGV0YSAvIDIpO1xuXHRcdG91dFtpXSA9IGF4aXNbMF0gKiBzO1xuXHRcdG91dFtqXSA9IGF4aXNbMV0gKiBzO1xuXHRcdG91dFtrXSA9IGF4aXNbMl0gKiBzO1xuXHRcdG91dFt3XSA9IE1hdGguY29zKHRoZXRhIC8gMik7XG5cblx0XHRyZXR1cm4gb3V0O1xuXHR9XG5cblx0c3RhdGljIGlkZW50aXR5KG91dDogRmxvYXQzMkFycmF5KTogRmxvYXQzMkFycmF5IHtcblxuXHRcdG91dFtpXSA9IDAuMDtcblx0XHRvdXRbal0gPSAwLjA7XG5cdFx0b3V0W2tdID0gMC4wO1xuXHRcdG91dFt3XSA9IDEuMDtcblxuXHRcdHJldHVybiBvdXQ7XG5cdH1cblxuXHRzdGF0aWMgZnJvbVBvaW50KG91dDogRmxvYXQzMkFycmF5LCBwOiBGbG9hdDMyQXJyYXkpOiBGbG9hdDMyQXJyYXkge1xuXG5cdFx0b3V0W2ldID0gcFswXTtcblx0XHRvdXRbal0gPSBwWzFdO1xuXHRcdG91dFtrXSA9IHBbMl07XG5cdFx0b3V0W3ddID0gMC4wO1xuXG5cdFx0cmV0dXJuIG91dDtcblx0fVxuXG5cdHN0YXRpYyBjb25qdWdhdGUob3V0OiBGbG9hdDMyQXJyYXksIHE6IEZsb2F0MzJBcnJheSk6IEZsb2F0MzJBcnJheSB7XG5cblx0XHRvdXRbaV0gPSBxW2ldICogLTEuMDtcblx0XHRvdXRbal0gPSBxW2pdICogLTEuMDtcblx0XHRvdXRba10gPSBxW2tdICogLTEuMDtcblx0XHRvdXRbd10gPSBxW3ddO1xuXG5cdFx0cmV0dXJuIG91dDtcblx0fVxuXG5cdHN0YXRpYyBpbnZlcnQob3V0OiBGbG9hdDMyQXJyYXksIHE6IEZsb2F0MzJBcnJheSk6IEZsb2F0MzJBcnJheSB7XG5cblx0XHRjb25zdCBkb3QgPSBRdWF0ZXJuaW9uLm1hZ25pdHVkZShxKTtcblx0XHRjb25zdCBpbnZkb3QgPSBkb3QgPT09IDAgPyAwIDogMS4wIC8gZG90O1xuXG5cdFx0b3V0W2ldID0gcVtpXSAqIC1pbnZkb3Q7XG5cdFx0b3V0W2pdID0gcVtqXSAqIC1pbnZkb3Q7XG5cdFx0b3V0W2tdID0gcVtrXSAqIC1pbnZkb3Q7XG5cdFx0b3V0W3ddID0gcVt3XSAqIGludmRvdDtcblxuXHRcdHJldHVybiBvdXQ7XG5cdH1cblxuXHRzdGF0aWMgZG90KHEwOiBGbG9hdDMyQXJyYXksIHExOiBGbG9hdDMyQXJyYXkpOiBudW1iZXIge1xuXHRcdHJldHVybiBxMFt3XSAqIHExW3ddICsgcTBbaV0gKiBxMVtpXSArIHEwW2pdICogcTFbal0gKyBxMFtrXSAqIHExW2tdO1xuXHR9XG5cblx0c3RhdGljIHNxdWFyZWRMZW5ndGgocTogRmxvYXQzMkFycmF5KTogbnVtYmVyIHtcblx0XHRyZXR1cm4gcVt3XSAqIHFbd10gKyBxW2ldICogcVtpXSArIHFbal0gKiBxW2pdICsgcVtrXSAqIHFba107XG5cdH1cblxuXHRzdGF0aWMgbWFnbml0dWRlKHE6IEZsb2F0MzJBcnJheSk6IG51bWJlciB7XG5cdFx0cmV0dXJuIE1hdGguc3FydChRdWF0ZXJuaW9uLnNxdWFyZWRMZW5ndGgocSkpO1xuXHR9XG5cblx0c3RhdGljIG5vcm1hbGl6ZShvdXQ6IEZsb2F0MzJBcnJheSwgcTogRmxvYXQzMkFycmF5KTogRmxvYXQzMkFycmF5IHtcblx0XHRjb25zdCBtID0gUXVhdGVybmlvbi5tYWduaXR1ZGUocSk7XG5cblx0XHRpZiAobSAhPT0gMCkge1xuXHRcdFx0Y29uc3QgaW0gPSAxLjAgLyBtO1xuXG5cdFx0XHRvdXRbaV0gPSBxW2ldICogaW07XG5cdFx0XHRvdXRbal0gPSBxW2pdICogaW07XG5cdFx0XHRvdXRba10gPSBxW2tdICogaW07XG5cdFx0XHRvdXRbd10gPSBxW3ddICogaW07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dDtcblx0fVxuXG5cdC8qKlxuXHQgKiAgICBxLnfCsitxLnjCsitxLnnCsitxLnrCsiAgICAwICAgICAgICAgICAgICAgICAgICAgICAgMCAgICAgICAgICAgICAgICAgICAgICAgIDBcblx0ICogICAgMCAgICAgICAgICAgICAgICAgICAgcS53wrIrcS54wrItcS55wrItcS56wrIgICAgICAgIDIqcS54KnEueSAtIDIqcS53KnEueiAgICAyKnEueCpxLnogKyAyKnEudypxLnlcblx0ICogICAgMCAgICAgICAgICAgICAgICAgICAgMipxLngqcS55ICsgMipxLncqcS56ICAgIHEud8KyLXEueMKyICsgcS55wrItcS56wrIgICAgMipxLnkqcS56IC0gMipxLncqcS54XG5cdCAqICAgIDAgICAgICAgICAgICAgICAgICAgIDIqcS54KnEueiAtIDIqcS53KnEueSAgICAyKnEueSpxLnogKyAyKnEudypxLnggICAgcS53wrItcS54wrItcS55wrIrcS56wrJcblx0ICovXG5cdHN0YXRpYyB0b01hdHJpeChtOiBGbG9hdDMyQXJyYXksIHE6IEZsb2F0MzJBcnJheSkge1xuXG5cdFx0Y29uc3QgdzIgPSBxW3ddICogcVt3XTtcblxuXHRcdGNvbnN0IHggPSBxW2ldO1xuXHRcdGNvbnN0IHgyID0geCAqIHg7XG5cdFx0Y29uc3QgeSA9IHFbal07XG5cdFx0Y29uc3QgeTIgPSB5ICogeTtcblx0XHRjb25zdCB6ID0gcVtrXTtcblx0XHRjb25zdCB6MiA9IHogKiB6O1xuXG5cdFx0Ly8gcm93IDBcblx0XHRtWzBdID0gdzIgKyB4MiArIHkyICsgejI7XG5cdFx0bVsxXSA9IDA7XG5cdFx0bVsyXSA9IDA7XG5cdFx0bVszXSA9IDA7XG5cblx0XHQvLyByb3cgMVxuXHRcdG1bNF0gPSAwO1xuXHRcdG1bNV0gPSB3MiArIHgyIC0geTIgLSB6Mjtcblx0XHRtWzZdID0gMiAqIHggKiB5IC0gMiAqIHcgKiB6O1xuXHRcdG1bN10gPSAyICogeCAqIHogKyAyICogdyAqIHk7XG5cblx0XHQvLyByb3cgMlxuXHRcdG1bOF0gPSAwO1xuXHRcdG1bOV0gPSAyICogeCAqIHkgKyAyICogdyAqIHo7XG5cdFx0bVsxMF0gPSB3MiAtIHgyICsgeTIgLSB6Mjtcblx0XHRtWzExXSA9IDIgKiB5ICogeiAtIDIgKiB3ICogeDtcblxuXHRcdC8vIHJvdyAzXG5cdFx0bVsxMl0gPSAwO1xuXHRcdG1bMTNdID0gMiAqIHggKiB6IC0gMiAqIHcgKiB5O1xuXHRcdG1bMTRdID0gMiAqIHkgKiB6ICsgMiAqIHcgKiB4O1xuXHRcdG1bMTVdID0gdzIgLSB4MiAtIHkyICsgejI7XG5cblx0XHRyZXR1cm4gbTtcblx0fVxuXG5cdC8qKlxuXHQgKiByb3RhdGUgcG9pbnQgdiBieSBxdWF0ZXJuaW9uIHEuXG5cdCAqIHN0b3JlIHRoZSByZXN1bHQgYSBhIHF1YXRlcm5pb24gaW4gb3V0LlxuXHQgKi9cblx0c3RhdGljIHJvdGF0ZShxOiBGbG9hdDMyQXJyYXksIHY6IEZsb2F0MzJBcnJheSk6IEZsb2F0MzJBcnJheSB7XG5cblx0XHRyZXR1cm4gUXVhdGVybmlvbi5tdWwoXG5cdFx0XHRfcTAsXG5cdFx0XHRRdWF0ZXJuaW9uLm11bChcblx0XHRcdFx0X3EwLFxuXHRcdFx0XHRxLFxuXHRcdFx0XHRRdWF0ZXJuaW9uLmZyb21Qb2ludChfcTEsIHYpKSxcblx0XHRcdFF1YXRlcm5pb24uY29uanVnYXRlKF9xMiwgcSlcblx0XHQpO1xuXHR9XG5cblx0c3RhdGljIGNsb25lKG91dDogRmxvYXQzMkFycmF5LCBxOiBGbG9hdDMyQXJyYXkpOiBGbG9hdDMyQXJyYXkge1xuXG5cdFx0b3V0W2ldID0gcVtpXTtcblx0XHRvdXRbal0gPSBxW2pdO1xuXHRcdG91dFtrXSA9IHFba107XG5cdFx0b3V0W3ddID0gcVt3XTtcblxuXHRcdHJldHVybiBvdXQ7XG5cdH1cblxuXHRzdGF0aWMgdG9KU09OKHE6IEZsb2F0MzJBcnJheSk6IGFueSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHc6IHFbd10sXG5cdFx0XHR2OiB7XG5cdFx0XHRcdHg6IHFbaV0sXG5cdFx0XHRcdHk6IHFbal0sXG5cdFx0XHRcdHo6IHFba10sXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGFkZChvdXQ6IEZsb2F0MzJBcnJheSwgYTogRmxvYXQzMkFycmF5LCBiOiBGbG9hdDMyQXJyYXkpOiBGbG9hdDMyQXJyYXkge1xuXG5cdFx0b3V0W2ldID0gYVtpXSArIGJbaV07XG5cdFx0b3V0W2pdID0gYVtqXSArIGJbal07XG5cdFx0b3V0W2tdID0gYVtrXSArIGJba107XG5cdFx0b3V0W3ddID0gYVt3XSArIGJbd107XG5cblx0XHRyZXR1cm4gb3V0O1xuXHR9XG5cblx0c3RhdGljIHN1YihvdXQ6IEZsb2F0MzJBcnJheSwgYTogRmxvYXQzMkFycmF5LCBiOiBGbG9hdDMyQXJyYXkpOiBGbG9hdDMyQXJyYXkge1xuXG5cdFx0b3V0W2ldID0gYVtpXSAtIGJbaV07XG5cdFx0b3V0W2pdID0gYVtqXSAtIGJbal07XG5cdFx0b3V0W2tdID0gYVtrXSAtIGJba107XG5cdFx0b3V0W3ddID0gYVt3XSAtIGJbd107XG5cblx0XHRyZXR1cm4gb3V0O1xuXHR9XG5cblx0c3RhdGljIG11bChvdXQ6IEZsb2F0MzJBcnJheSwgYTogRmxvYXQzMkFycmF5LCBiOiBGbG9hdDMyQXJyYXkpOiBGbG9hdDMyQXJyYXkge1xuXG5cdFx0Y29uc3QgYncgPSBiW3ddO1xuXHRcdGNvbnN0IGJ4ID0gYltpXTtcblx0XHRjb25zdCBieSA9IGJbal07XG5cdFx0Y29uc3QgYnogPSBiW2tdO1xuXG5cdFx0Y29uc3QgYXcgPSBhW3ddO1xuXHRcdGNvbnN0IGF4ID0gYVtpXTtcblx0XHRjb25zdCBheSA9IGFbal07XG5cdFx0Y29uc3QgYXogPSBhW2tdO1xuXG5cdFx0b3V0W2ldID0gYXcgKiBieCArIGF4ICogYncgKyBheSAqIGJ6IC0gYXogKiBieTtcblx0XHRvdXRbal0gPSBhdyAqIGJ5IC0gYXggKiBieiArIGF5ICogYncgKyBheiAqIGJ4O1xuXHRcdG91dFtrXSA9IGF3ICogYnogKyBheCAqIGJ5IC0gYXkgKiBieCArIGF6ICogYnc7XG5cdFx0b3V0W3ddID0gYXcgKiBidyAtIGF4ICogYnggLSBheSAqIGJ5IC0gYXogKiBiejtcblxuXHRcdHJldHVybiBvdXQ7XG5cdH1cblxuXHRzdGF0aWMgZGl2KG91dDogRmxvYXQzMkFycmF5LCBxMTogRmxvYXQzMkFycmF5LCBxMjogRmxvYXQzMkFycmF5KTogRmxvYXQzMkFycmF5IHtcblxuXHRcdC8vIC1xMS52IFggcTIudlxuXHRcdGNvbnN0IHYwID0gVmVjdG9yMy5jcm9zcyhcblx0XHRcdF92MCxcblx0XHRcdFZlY3RvcjMuc2V0KF92MywgLXExW2ldLCAtcTFbal0sIC1xMVtrXSksXG5cdFx0XHRxMlx0Ly8ganVzdCB0YWtlIGZpcnN0IDMgY29vcmRzOiAoeCx5LHopXG5cdFx0KTtcblxuXHRcdC8vIHEyLnYgKiBxMS53XG5cdFx0Y29uc3QgdjEgPSBWZWN0b3IzLm11bChfdjEsIHEyLCBxMVt3XSk7XG5cblx0XHRjb25zdCB2MiA9IFZlY3RvcjMubXVsKF92MiwgcTEsIHEyW3ddKTtcblxuXHRcdFZlY3RvcjMuYWRkKF92MywgVmVjdG9yMy5zdWIoX3YzLCB2MCwgdjEpLCB2Mik7XG5cblx0XHRvdXRbaV0gPSBfdjNbaV07XG5cdFx0b3V0W2pdID0gX3YzW2pdO1xuXHRcdG91dFtrXSA9IF92M1trXTtcblx0XHRvdXRbd10gPSBxMVt3XSAqIHEyW3ddICsgcTFbaV0gKiBxMltpXSArIHExW2pdICogcTJbal0gKyBxMVtrXSAqIHEyW2tdO1xuXG5cdFx0cmV0dXJuIG91dDtcblx0fVxuXG5cdHN0YXRpYyBUZXN0KCkge1xuXG5cdFx0Y29uc3QgcDAgPSBWZWN0b3IzLmNyZWF0ZUZyb21Db29yZHMoMS4wLCAwLjAsIDAuMCk7XG5cdFx0Y29uc3QgcTAgPSBRdWF0ZXJuaW9uLmNyZWF0ZUZyb21BeGlzQW5kQW5nbGUoXG5cdFx0XHRWZWN0b3IzLmNyZWF0ZUZyb21Db29yZHMoMC4wLCAxLjAsIDAuMCksIE1hdGguUEkgLyA0KTtcblx0XHRjb25zdCBxMSA9IFF1YXRlcm5pb24uY3JlYXRlRnJvbUF4aXNBbmRBbmdsZShcblx0XHRcdFZlY3RvcjMuY3JlYXRlRnJvbUNvb3JkcygwLjAsIDAuMCwgMS4wKSwgTWF0aC5QSSAvIDQpO1xuXG5cdFx0Y29uc3QgcnAwID0gUXVhdGVybmlvbi5yb3RhdGUocTAsIHAwKTtcblxuXHRcdGNvbnNvbGUubG9nKFxuXHRcdFx0UXVhdGVybmlvbi50b0pTT04oXG5cdFx0XHRcdFF1YXRlcm5pb24ucm90YXRlKFxuXHRcdFx0XHRcdHExLFxuXHRcdFx0XHRcdHJwMCkpKTtcblxuXHRcdGNvbnN0IHEyID0gUXVhdGVybmlvbi5tdWwoUXVhdGVybmlvbi5jcmVhdGUoKSwgcTEsIHEwKTtcblx0XHRjb25zb2xlLmxvZyhcblx0XHRcdFF1YXRlcm5pb24udG9KU09OKFxuXHRcdFx0XHRRdWF0ZXJuaW9uLnJvdGF0ZShcblx0XHRcdFx0XHRxMixcblx0XHRcdFx0XHRwMFxuXHRcdFx0XHQpXG5cdFx0XHQpKTtcblx0fVxufVxuXG5jb25zdCBfcTAgPSBRdWF0ZXJuaW9uLmNyZWF0ZSgpO1xuY29uc3QgX3ExID0gUXVhdGVybmlvbi5jcmVhdGUoKTtcbmNvbnN0IF9xMiA9IFF1YXRlcm5pb24uY3JlYXRlKCk7IiwiaW1wb3J0IHtDdWJlSW5kaWNlcywgQ3ViZVZlcnRpY2VzfSBmcm9tIFwiLi4vcmVuZGVyL2dlb21ldHJ5L0N1YmVcIjtcblxuZXhwb3J0IGNsYXNzIFZlY3RvcjNUIHtcblxuXHRpbmRleCA9IC0xO1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyB4OiBudW1iZXIsIHB1YmxpYyB5OiBudW1iZXIsIHB1YmxpYyB6OiBudW1iZXIpe1xuXG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlKGE6IEZsb2F0MzJBcnJheSwgb2Zmc2V0OiBudW1iZXIpOiBWZWN0b3IzVCB7XG5cdFx0cmV0dXJuIG5ldyBWZWN0b3IzVChhW29mZnNldF0sIGFbb2Zmc2V0KzFdLCBhW29mZnNldCsyXSk7XG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlQyh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XG5cdFx0cmV0dXJuIG5ldyBWZWN0b3IzVCh4LHkseik7XG5cdH1cblxuXHRzdGF0aWMgbm9ybWFsaXplKGI6IEZsb2F0MzJBcnJheSwgb2Zmc2V0OiBudW1iZXIsIHJhZGl1czogbnVtYmVyKSB7XG5cdFx0Y29uc3QgeCA9IGJbb2Zmc2V0XTtcblx0XHRjb25zdCB5ID0gYltvZmZzZXQrMV07XG5cdFx0Y29uc3QgeiA9IGJbb2Zmc2V0KzJdO1xuXG5cdFx0Y29uc3QgbCA9IE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xuXG5cdFx0aWYgKGwhPT0wLjApIHtcblx0XHRcdGJbb2Zmc2V0XSA9IHgvbCAqIHJhZGl1cztcblx0XHRcdGJbb2Zmc2V0KzFdID0geS9sICogcmFkaXVzO1xuXHRcdFx0YltvZmZzZXQrMl0gPSB6L2wgKiByYWRpdXM7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIG1pZGRsZSh2MDogVmVjdG9yM1QsIHYxOiBWZWN0b3IzVCkge1xuXHRcdHJldHVybiBWZWN0b3IzVC5jcmVhdGVDKFxuXHRcdFx0djAueCArICh2MS54LXYwLngpLzIuLFxuXHRcdFx0djAueSArICh2MS55LXYwLnkpLzIuLFxuXHRcdFx0djAueiArICh2MS56LXYwLnopLzIuLFxuXHRcdCk7XG5cdH1cblxuXHR3cml0ZShiOiBudW1iZXJbXSkge1xuXHRcdGIucHVzaCh0aGlzLngpO1xuXHRcdGIucHVzaCh0aGlzLnkpO1xuXHRcdGIucHVzaCh0aGlzLnopO1xuXHR9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3ViZGl2aXNpb25SZXN1bHQge1xuXHRudW1UcmlhbmdsZXM6IG51bWJlcjtcblx0dmVydGljZXM6IEZsb2F0MzJBcnJheTtcdC8vIDMqbnVtVHJpYW5nbGVzXG5cdHV2OiBGbG9hdDMyQXJyYXk7XHRcdC8vIDIqbnVtVHJpYW5nbGVzXG5cdGluZGV4OiBVaW50MTZBcnJheTtcblx0bm9ybWFsczogRmxvYXQzMkFycmF5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGhlcmUge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdH1cblxuXHR0ZXNzZWxsYXRlRnJvbUN1YmUoc3ViZGl2aXNpb25zOiBudW1iZXIpOiBTdWJkaXZpc2lvblJlc3VsdCB7XG5cdFx0Y29uc3QgdDogbnVtYmVyW10gPSBbXTtcblxuXHRcdGNvbnN0IHYgPSBDdWJlVmVydGljZXM7XG5cdFx0Y29uc3QgaW5kZXggPSBDdWJlSW5kaWNlcztcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXgubGVuZ3RoOyBpKyspIHtcblx0XHRcdHQucHVzaCh2W2luZGV4W2ldICogM10pO1xuXHRcdFx0dC5wdXNoKHZbaW5kZXhbaV0gKiAzICsgMV0pO1xuXHRcdFx0dC5wdXNoKHZbaW5kZXhbaV0gKiAzICsgMl0pO1xuXHRcdH1cblxuXHRcdGxldCBkYXRhID0gdGhpcy5zdWJkaXZpZGVUcmlhbmdsZXMobmV3IEZsb2F0MzJBcnJheSh0KSwgMTIsIHN1YmRpdmlzaW9ucyk7XG5cdFx0dGhpcy5leHBhbmQoZGF0YSwgMSk7XG5cdFx0ZGF0YSA9IHRoaXMuY2FsY3VsYXRlVVYoZGF0YSk7XG5cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxuXG5cdHRlc3NlbGxhdGVGcm9tVGV0cmFoZWRyb24oc3ViZGl2aXNpb25zOiBudW1iZXIpOiBTdWJkaXZpc2lvblJlc3VsdCB7XG5cblx0XHRjb25zdCBQMSA9IFZlY3RvcjNULmNyZWF0ZUMoIDAuMCwgLTEuMCwgMi4wICk7XG5cdFx0Y29uc3QgUDIgPSBWZWN0b3IzVC5jcmVhdGVDKCAxLjczMjA1MDgxLCAtMS4wLCAtMS4wICk7XG5cdFx0Y29uc3QgUDMgPSBWZWN0b3IzVC5jcmVhdGVDKCAtMS43MzIwNTA4MSwgLTEuMCwgLTEuMCApO1xuXHRcdGNvbnN0IFA0ID0gVmVjdG9yM1QuY3JlYXRlQyggIDAuMCwgMi4wLCAwLjAgKTtcblxuXHRcdGNvbnN0IHQ6IG51bWJlcltdID0gW107XG5cblx0XHRQMS53cml0ZSh0KTtcblx0XHRQMy53cml0ZSh0KTtcblx0XHRQMi53cml0ZSh0KTtcblxuXHRcdFAxLndyaXRlKHQpO1xuXHRcdFA0LndyaXRlKHQpO1xuXHRcdFAzLndyaXRlKHQpO1xuXG5cdFx0UDEud3JpdGUodCk7XG5cdFx0UDIud3JpdGUodCk7XG5cdFx0UDQud3JpdGUodCk7XG5cblx0XHRQMi53cml0ZSh0KTtcblx0XHRQMy53cml0ZSh0KTtcblx0XHRQNC53cml0ZSh0KTtcblxuXHRcdGxldCBkYXRhID0gdGhpcy5zdWJkaXZpZGVUcmlhbmdsZXMobmV3IEZsb2F0MzJBcnJheSh0KSwgNCwgc3ViZGl2aXNpb25zKTtcblx0XHR0aGlzLmV4cGFuZChkYXRhLCAxKTtcblx0XHRkYXRhID0gdGhpcy5jYWxjdWxhdGVVVihkYXRhKTtcblxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG5cblx0cHJvdGVjdGVkIGNhbGN1bGF0ZVVWKGRhdGE6IFN1YmRpdmlzaW9uUmVzdWx0KSB7XG5cdFx0Y29uc3QgdXYgPSBuZXcgRmxvYXQzMkFycmF5KGRhdGEubnVtVHJpYW5nbGVzKjMqMik7XG5cblx0XHRsZXQgdXZJbmRleCA9IDBcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgZGF0YS5udW1UcmlhbmdsZXMqMzsgaSsrICkge1xuXHRcdFx0dXZbdXZJbmRleF0gPSBNYXRoLmF0YW4yKGRhdGEudmVydGljZXNbaSozXSwgZGF0YS52ZXJ0aWNlc1tpKjMrMl0pO1xuXHRcdFx0dXZbdXZJbmRleF0gPSAuNSArIE1hdGguYXRhbjIoZGF0YS52ZXJ0aWNlc1tpKjNdLCBkYXRhLnZlcnRpY2VzW2kqMysyXSkvKDIqTWF0aC5QSSk7XG5cdFx0XHR1dlt1dkluZGV4KzFdID0gLjUgLSBNYXRoLmFzaW4oZGF0YS52ZXJ0aWNlc1tpKjMrMV0pL01hdGguUEk7XG5cdFx0XHR1dkluZGV4ICs9IDI7XG5cdFx0fVxuXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGRhdGEubnVtVHJpYW5nbGVzKjM7IGkrPTMgKSB7XG5cdFx0XHRjb25zdCB1MCA9IHV2W2kqMl07XG5cdFx0XHRjb25zdCB2MCA9IHV2W2kqMisxXTtcblx0XHRcdGNvbnN0IHUxID0gdXZbaSoyKzJdO1xuXHRcdFx0Y29uc3QgdjEgPSB1dltpKjIrM107XG5cdFx0XHRjb25zdCB1MiA9IHV2W2kqMis0XTtcblx0XHRcdGNvbnN0IHYyID0gdXZbaSoyKzVdO1xuXG5cdFx0XHRpZiAoTWF0aC5hYnModTAtdTEpPi41IHx8IE1hdGguYWJzKHUyLXUwKT4uNSB8fCBNYXRoLmFicyh1Mi11MSk+LjUpIHtcblx0XHRcdFx0aWYgKHUwIDwgLjUpIHtcblx0XHRcdFx0XHR1dltpKjJdICs9IDE7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHUxIDwgLjUpIHtcblx0XHRcdFx0XHR1dltpKjIrMl0gKz0gMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodTIgPCAuNSkge1xuXHRcdFx0XHRcdHV2W2kqMis0XSArPSAxO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChNYXRoLmFicyh2MC12MSk+LjUgfHwgTWF0aC5hYnModjItdjApPi41IHx8IE1hdGguYWJzKHYyLXYxKT4uNSkge1xuXHRcdFx0XHRpZiAodjAgPCAuNSkge1xuXHRcdFx0XHRcdHV2W2kqMisxXSArPSAxO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh2MSA8IC41KSB7XG5cdFx0XHRcdFx0dXZbaSoyKzNdICs9IDE7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHYyIDwgLjUpIHtcblx0XHRcdFx0XHR1dltpKjIrNV0gKz0gMTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHQuLi5kYXRhLFxuXHRcdFx0dXYsXG5cdFx0XHRub3JtYWxzOiBkYXRhLnZlcnRpY2VzLFxuXHRcdH07XG5cdH1cblxuXHRwcm90ZWN0ZWQgZXhwYW5kKGRhdGE6U3ViZGl2aXNpb25SZXN1bHQsIHJhZGl1czogbnVtYmVyKSB7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGRhdGEubnVtVHJpYW5nbGVzKjM7IGkrKykge1xuXHRcdFx0VmVjdG9yM1Qubm9ybWFsaXplKGRhdGEudmVydGljZXMsIGkqMywgcmFkaXVzKTtcblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgc3ViZGl2aWRlVHJpYW5nbGVzKGRhdGE6IEZsb2F0MzJBcnJheSxcblx0XHRcdFx0XHRcdFx0XHQgbnVtVHJpYW5nbGVzOiBudW1iZXIsXG5cdFx0XHRcdFx0XHRcdFx0IHN1YmRpdmlzaW9uczogbnVtYmVyKTogU3ViZGl2aXNpb25SZXN1bHQge1xuXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHN1YmRpdmlzaW9uczsgaSsrKSB7XG5cdFx0XHRkYXRhID0gdGhpcy5zdWJkaXZpZGVUcmlhbmdsZXNJbXBsKGRhdGEsIG51bVRyaWFuZ2xlcyk7XG5cdFx0XHRudW1UcmlhbmdsZXMgPSBudW1UcmlhbmdsZXMgKiA0O1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR2ZXJ0aWNlczogZGF0YSxcblx0XHRcdG51bVRyaWFuZ2xlcyxcblx0XHRcdHV2OiBudWxsLFxuXHRcdFx0aW5kZXg6IG51bGwsXG5cdFx0XHRub3JtYWxzOiBudWxsLFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTdWJkaXZpZGUgbnVtVHJpYW5nbGVzLlxuXHQgKiBkYXRhIGlzIGF0IGxlYXN0IG51bVRyaWFuZ2xlcyozIGxlbmd0aFxuXHQgKiBAcGFyYW0gZGF0YVxuXHQgKiBAcGFyYW0gbnVtVHJpYW5nbGVzXG5cdCAqL1xuXHRwcm90ZWN0ZWQgc3ViZGl2aWRlVHJpYW5nbGVzSW1wbChkYXRhOiBGbG9hdDMyQXJyYXksIG51bVRyaWFuZ2xlczogbnVtYmVyKTogRmxvYXQzMkFycmF5IHtcblxuXHRcdGlmIChkYXRhLmxlbmd0aCA8IG51bVRyaWFuZ2xlcyozKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYE5vdCBlbm91Z2ggaW5wdXQgZGF0YWApO1xuXHRcdH1cblxuXHRcdGNvbnN0IG5ld0J1ZmZlcjogbnVtYmVyW10gPSBbXTtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGk8bnVtVHJpYW5nbGVzOyBpKyspIHtcblx0XHRcdGNvbnN0IG9mZnNldCA9IGkqOTtcdFx0Ly8gZWFjaCB0cmkgaGFzIDMgdmVydGljZXMgb2YgeHl6XG5cblx0XHRcdGNvbnN0IHYwID0gVmVjdG9yM1QuY3JlYXRlKGRhdGEsIG9mZnNldCk7XG5cdFx0XHRjb25zdCB2MSA9IFZlY3RvcjNULmNyZWF0ZShkYXRhLCBvZmZzZXQrMyk7XG5cdFx0XHRjb25zdCB2MiA9IFZlY3RvcjNULmNyZWF0ZShkYXRhLCBvZmZzZXQrNik7XG5cblx0XHRcdGNvbnN0IG12MHYxID0gVmVjdG9yM1QubWlkZGxlKHYwLCB2MSk7XG5cdFx0XHRjb25zdCBtdjF2MiA9IFZlY3RvcjNULm1pZGRsZSh2MSwgdjIpO1xuXHRcdFx0Y29uc3QgbXYydjAgPSBWZWN0b3IzVC5taWRkbGUodjIsIHYwKTtcblxuXHRcdFx0djAud3JpdGUobmV3QnVmZmVyKTtcblx0XHRcdG12MHYxLndyaXRlKG5ld0J1ZmZlcik7XG5cdFx0XHRtdjJ2MC53cml0ZShuZXdCdWZmZXIpO1xuXG5cdFx0XHRtdjB2MS53cml0ZShuZXdCdWZmZXIpO1xuXHRcdFx0djEud3JpdGUobmV3QnVmZmVyKTtcblx0XHRcdG12MXYyLndyaXRlKG5ld0J1ZmZlcik7XG5cblx0XHRcdG12MXYyLndyaXRlKG5ld0J1ZmZlcik7XG5cdFx0XHRtdjJ2MC53cml0ZShuZXdCdWZmZXIpO1xuXHRcdFx0bXYwdjEud3JpdGUobmV3QnVmZmVyKTtcblxuXHRcdFx0bXYydjAud3JpdGUobmV3QnVmZmVyKTtcblx0XHRcdG12MXYyLndyaXRlKG5ld0J1ZmZlcik7XG5cdFx0XHR2Mi53cml0ZShuZXdCdWZmZXIpO1xuXHRcdH1cblxuXHRcdHJldHVybiBuZXcgRmxvYXQzMkFycmF5KG5ld0J1ZmZlcik7XG5cdH1cblxuXHR0ZXNzZWxsYXRlRnJvbVRldHJhaGVkcm9uUmVjKHN1YmRpdmlzaW9uczogbnVtYmVyKTogU3ViZGl2aXNpb25SZXN1bHQge1xuXG5cdFx0Y29uc3QgcDEgPSBWZWN0b3IzVC5jcmVhdGVDKCAwLjAsIC0xLjAsIDIuMCApO1xuXHRcdGNvbnN0IHAyID0gVmVjdG9yM1QuY3JlYXRlQyggMS43MzIwNTA4MSwgLTEuMCwgLTEuMCApO1xuXHRcdGNvbnN0IHAzID0gVmVjdG9yM1QuY3JlYXRlQyggLTEuNzMyMDUwODEsIC0xLjAsIC0xLjAgKTtcblx0XHRjb25zdCBwNCA9IFZlY3RvcjNULmNyZWF0ZUMoICAwLjAsIDIuMCwgMC4wICk7XG5cblx0XHRjb25zdCBzdG9yZTogVmVjdG9yM1RbXSA9IFtdO1xuXHRcdGNvbnN0IGluZGV4OiBudW1iZXJbXSA9IFtdO1xuXG5cdFx0dGhpcy5zdWJkaXZpZGVUcmlhbmdsZXNSKHN0b3JlLCBpbmRleCwgc3ViZGl2aXNpb25zLCBwMSwgcDMsIHAyKTtcblx0XHR0aGlzLnN1YmRpdmlkZVRyaWFuZ2xlc1Ioc3RvcmUsIGluZGV4LCBzdWJkaXZpc2lvbnMsIHAxLCBwNCwgcDMpO1xuXHRcdHRoaXMuc3ViZGl2aWRlVHJpYW5nbGVzUihzdG9yZSwgaW5kZXgsIHN1YmRpdmlzaW9ucywgcDEsIHAyLCBwNCk7XG5cdFx0dGhpcy5zdWJkaXZpZGVUcmlhbmdsZXNSKHN0b3JlLCBpbmRleCwgc3ViZGl2aXNpb25zLCBwMiwgcDMsIHA0KTtcblxuXHRcdGNvbnN0IHZlcnRpY2VzID0gbmV3IEZsb2F0MzJBcnJheShzdG9yZS5sZW5ndGgqMyk7XG5cdFx0c3RvcmUuZm9yRWFjaCggKHYsaSkgPT4ge1xuXHRcdFx0Y29uc3QgbCA9IE1hdGguc3FydCh2Lngqdi54ICsgdi55KnYueSArIHYueip2LnopO1xuXHRcdFx0dmVydGljZXNbaSozXSA9IHYueC9sO1xuXHRcdFx0dmVydGljZXNbaSozKzFdID0gdi55L2w7XG5cdFx0XHR2ZXJ0aWNlc1tpKjMrMl0gPSB2LnovbDtcblx0XHR9KTtcblxuXHRcdGxldCBkYXRhID0ge1xuXHRcdFx0dmVydGljZXMsXG5cdFx0XHRpbmRleDogbmV3IFVpbnQxNkFycmF5KGluZGV4KSxcblx0XHRcdHV2OiBudWxsLFxuXHRcdFx0bm9ybWFsczogdmVydGljZXMsXG5cdFx0XHRudW1UcmlhbmdsZXM6IGluZGV4Lmxlbmd0aC8zLFxuXHRcdH07XG5cblx0XHRkYXRhID0gdGhpcy5jYWxjdWxhdGVVVkluZGV4ZWQoZGF0YSk7XG5cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxuXG5cdHByb3RlY3RlZCBjYWxjdWxhdGVVVkluZGV4ZWQoZGF0YTogU3ViZGl2aXNpb25SZXN1bHQpIHtcblx0XHRjb25zdCB1diA9IG5ldyBGbG9hdDMyQXJyYXkoZGF0YS52ZXJ0aWNlcy5sZW5ndGggLyAzICogMik7XG5cblx0XHRsZXQgdXZJbmRleCA9IDBcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEudmVydGljZXMubGVuZ3RoLzM7IGkrKykge1xuXHRcdFx0dXZbdXZJbmRleF0gPSAuNSArIE1hdGguYXRhbjIoZGF0YS52ZXJ0aWNlc1tpICogM10sIGRhdGEudmVydGljZXNbaSAqIDMgKyAyXSkgLyAoMiAqIE1hdGguUEkpO1xuXHRcdFx0dXZbdXZJbmRleCArIDFdID0gLjUgLSBNYXRoLmFzaW4oZGF0YS52ZXJ0aWNlc1tpICogMyArIDFdKSAvIE1hdGguUEk7XG5cdFx0XHR1dkluZGV4ICs9IDI7XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLm51bVRyaWFuZ2xlczsgaSArKykge1xuXHRcdFx0Y29uc3QgdTAgPSB1dltkYXRhLmluZGV4W2kgKiAzXSoyICAgICAgICBdO1xuXHRcdFx0Y29uc3QgdjAgPSB1dltkYXRhLmluZGV4W2kgKiAzXSoyICAgICArIDFdO1xuXHRcdFx0Y29uc3QgdTEgPSB1dltkYXRhLmluZGV4W2kgKiAzICsgMV0qMiAgICBdO1xuXHRcdFx0Y29uc3QgdjEgPSB1dltkYXRhLmluZGV4W2kgKiAzICsgMV0qMiArIDFdXG5cdFx0XHRjb25zdCB1MiA9IHV2W2RhdGEuaW5kZXhbaSAqIDMgKyAyXSoyICAgIF07XG5cdFx0XHRjb25zdCB2MiA9IHV2W2RhdGEuaW5kZXhbaSAqIDMgKyAyXSoyICsgMV07XG5cblx0XHRcdGlmIChNYXRoLmFicyh1MCAtIHUxKSA+IC41IHx8IE1hdGguYWJzKHUyIC0gdTApID4gLjUgfHwgTWF0aC5hYnModTIgLSB1MSkgPiAuNSkge1xuXHRcdFx0XHRpZiAodTAgPCAuNSkge1xuXHRcdFx0XHRcdHV2W2RhdGEuaW5kZXhbaSAqIDNdKjIgICAgICAgIF0gKz0gMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodTEgPCAuNSkge1xuXHRcdFx0XHRcdHV2W2RhdGEuaW5kZXhbaSAqIDMgKyAxXSoyICAgIF0gKz0gMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodTIgPCAuNSkge1xuXHRcdFx0XHRcdHV2W2RhdGEuaW5kZXhbaSAqIDMgKyAyXSoyICAgIF0gKz0gMTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoTWF0aC5hYnModjAgLSB2MSkgPiAuNSB8fCBNYXRoLmFicyh2MiAtIHYwKSA+IC41IHx8IE1hdGguYWJzKHYyIC0gdjEpID4gLjUpIHtcblx0XHRcdFx0aWYgKHYwIDwgLjUpIHtcblx0XHRcdFx0XHR1dltkYXRhLmluZGV4W2kgKiAzXSoyICAgICArIDFdICs9IDE7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHYxIDwgLjUpIHtcblx0XHRcdFx0XHR1dltkYXRhLmluZGV4W2kgKiAzICsgMV0qMiArIDFdICs9IDE7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHYyIDwgLjUpIHtcblx0XHRcdFx0XHR1dltkYXRhLmluZGV4W2kgKiAzICsgMl0qMiArIDFdICs9IDE7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4uZGF0YSxcblx0XHRcdHV2LFxuXHRcdFx0bm9ybWFsczogZGF0YS52ZXJ0aWNlcyxcblx0XHR9O1xuXHR9XG5cblx0cHJvdGVjdGVkIHN1YmRpdmlkZVRyaWFuZ2xlc1Ioc3RvcmU6IFZlY3RvcjNUW10sIGluZGV4OiBudW1iZXJbXSwgbGV2ZWw6IG51bWJlciwgdjA6IFZlY3RvcjNULCB2MTogVmVjdG9yM1QsIHYyOiBWZWN0b3IzVCkge1xuXG5cdFx0aWYgKGxldmVsPT09MCkge1xuXHRcdFx0aWYgKHYwLmluZGV4PT09LTEpIHtcblx0XHRcdFx0djAuaW5kZXggPSBzdG9yZS5sZW5ndGg7XG5cdFx0XHRcdHN0b3JlLnB1c2godjApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHYxLmluZGV4PT09LTEpIHtcblx0XHRcdFx0djEuaW5kZXggPSBzdG9yZS5sZW5ndGg7XG5cdFx0XHRcdHN0b3JlLnB1c2godjEpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHYyLmluZGV4PT09LTEpIHtcblx0XHRcdFx0djIuaW5kZXggPSBzdG9yZS5sZW5ndGg7XG5cdFx0XHRcdHN0b3JlLnB1c2godjIpO1xuXHRcdFx0fVxuXG5cdFx0XHRpbmRleC5wdXNoKHYwLmluZGV4LCB2MS5pbmRleCwgdjIuaW5kZXgpO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgbXYwdjEgPSBWZWN0b3IzVC5taWRkbGUodjAsIHYxKTtcblx0XHRjb25zdCBtdjF2MiA9IFZlY3RvcjNULm1pZGRsZSh2MSwgdjIpO1xuXHRcdGNvbnN0IG12MnYwID0gVmVjdG9yM1QubWlkZGxlKHYyLCB2MCk7XG5cblx0XHR0aGlzLnN1YmRpdmlkZVRyaWFuZ2xlc1Ioc3RvcmUsIGluZGV4LCBsZXZlbC0xLCB2MCwgbXYwdjEsIG12MnYwKTtcblx0XHR0aGlzLnN1YmRpdmlkZVRyaWFuZ2xlc1Ioc3RvcmUsIGluZGV4LCBsZXZlbC0xLCBtdjB2MSwgdjEsIG12MXYyKTtcblx0XHR0aGlzLnN1YmRpdmlkZVRyaWFuZ2xlc1Ioc3RvcmUsIGluZGV4LCBsZXZlbC0xLCBtdjF2MiwgbXYydjAsIG12MHYxKTtcblx0XHR0aGlzLnN1YmRpdmlkZVRyaWFuZ2xlc1Ioc3RvcmUsIGluZGV4LCBsZXZlbC0xLCBtdjJ2MCwgbXYxdjIsIHYyKTtcblxuXHR9XG59IiwiLyoqXG4gKiBBIHZlY3RvciAzIGlzIGFuIEZsb2F0MzJBcnJheVszXVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IzIHtcblxuXHRzdGF0aWMgY3JlYXRlKCkgOiBGbG9hdDMyQXJyYXkge1xuXHRcdHJldHVybiBuZXcgRmxvYXQzMkFycmF5KDMpO1xuXHR9XG5cblx0c3RhdGljIGNyZWF0ZUZyb21Db29yZHMoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikgOiBGbG9hdDMyQXJyYXkge1xuXHRcdHJldHVybiBWZWN0b3IzLnNldChWZWN0b3IzLmNyZWF0ZSgpLCB4LCB5LCB6KTtcblx0fVxuXG5cdHN0YXRpYyBjbG9uZSh2aW46IEZsb2F0MzJBcnJheSkgOiBGbG9hdDMyQXJyYXkge1xuXHRcdHJldHVybiBWZWN0b3IzLmNyZWF0ZUZyb21Db29yZHModmluWzBdLCB2aW5bMV0sIHZpblsyXSk7XG5cdH1cblxuXHRzdGF0aWMgc2V0KG91dDogRmxvYXQzMkFycmF5LCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSA6IEZsb2F0MzJBcnJheSB7XG5cdFx0b3V0WzBdID0geDtcblx0XHRvdXRbMV0gPSB5O1xuXHRcdG91dFsyXSA9IHo7XG5cblx0XHRyZXR1cm4gb3V0O1xuXHR9XG5cblx0c3RhdGljIGFkZChvdXQ6IEZsb2F0MzJBcnJheSwgdjA6IEZsb2F0MzJBcnJheSwgdjE6IEZsb2F0MzJBcnJheSkgOiBGbG9hdDMyQXJyYXl7XG5cblx0XHRvdXRbMF0gPSB2MFswXSArIHYxWzBdO1xuXHRcdG91dFsxXSA9IHYwWzFdICsgdjFbMV07XG5cdFx0b3V0WzJdID0gdjBbMl0gKyB2MVsyXTtcblxuXHRcdHJldHVybiBvdXQ7XG5cdH1cblxuXHQvKipcblx0ICogb3V0ID0gdjAgLSB2MVxuXHQgKiBAcGFyYW0gb3V0XG5cdCAqIEBwYXJhbSB2MFxuXHQgKiBAcGFyYW0gdjFcblx0ICovXG5cdHN0YXRpYyBzdWIob3V0OiBGbG9hdDMyQXJyYXksIHYwOiBGbG9hdDMyQXJyYXksIHYxOiBGbG9hdDMyQXJyYXkpIDogRmxvYXQzMkFycmF5IHtcblxuXHRcdG91dFswXSA9IHYwWzBdIC0gdjFbMF07XG5cdFx0b3V0WzFdID0gdjBbMV0gLSB2MVsxXTtcblx0XHRvdXRbMl0gPSB2MFsyXSAtIHYxWzJdO1xuXG5cdFx0cmV0dXJuIG91dDtcblx0fVxuXG5cdHN0YXRpYyBtYWduaXR1ZGUodjogRmxvYXQzMkFycmF5KSA6IG51bWJlciB7XG5cdFx0cmV0dXJuIE1hdGguc3FydCh2WzBdICogdlswXSArIHZbMV0gKiB2WzFdICsgdlsyXSAqIHZbMl0pO1xuXHR9XG5cblx0c3RhdGljIGNvcHkob3V0OiBGbG9hdDMyQXJyYXksIHY6IEFycmF5TGlrZTxudW1iZXI+KSA6IEZsb2F0MzJBcnJheSB7XG5cdFx0b3V0WzBdID0gdlswXTtcblx0XHRvdXRbMV0gPSB2WzFdO1xuXHRcdG91dFsyXSA9IHZbMl07XG5cblx0XHRyZXR1cm4gb3V0O1xuXHR9XG5cblx0c3RhdGljIG5vcm1hbGl6ZShvdXQ6IEZsb2F0MzJBcnJheSwgdjogRmxvYXQzMkFycmF5KSA6IEZsb2F0MzJBcnJheSB7XG5cblx0XHRjb25zdCBsID0gVmVjdG9yMy5tYWduaXR1ZGUodik7XG5cdFx0aWYgKGwgIT09IDApIHtcblx0XHRcdGNvbnN0IGxsID0gMS9sO1xuXHRcdFx0b3V0WzBdID0gdlswXSAqIGxsO1xuXHRcdFx0b3V0WzFdID0gdlsxXSAqIGxsO1xuXHRcdFx0b3V0WzJdID0gdlsyXSAqIGxsO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXQ7XG5cdH1cblxuXHRzdGF0aWMgbXVsKG91dDogRmxvYXQzMkFycmF5LCB2OiBGbG9hdDMyQXJyYXksIGw6IG51bWJlcikgOiBGbG9hdDMyQXJyYXkge1xuXHRcdG91dFswXSA9IHZbMF0gKiBsO1xuXHRcdG91dFsxXSA9IHZbMV0gKiBsO1xuXHRcdG91dFsyXSA9IHZbMl0gKiBsO1xuXG5cdFx0cmV0dXJuIG91dDtcblx0fVxuXG5cdC8qKlxuXHQgKiBhc3N1bWVzIG5vcm1hbGl6ZWQgdmVjdG9ycy5cblx0ICovXG5cdHN0YXRpYyBkb3QodjA6IEZsb2F0MzJBcnJheSwgdjE6IEZsb2F0MzJBcnJheSkgOiBudW1iZXIge1xuXHRcdHJldHVybiB2MFswXSAqIHYxWzBdICsgdjBbMV0gKiB2MVsxXSArIHYwWzJdICogdjFbMl07XG5cdH1cblxuXHRzdGF0aWMgaW52ZXJ0KG91dDogRmxvYXQzMkFycmF5LCB2OiBGbG9hdDMyQXJyYXkpIHtcblxuXHRcdG91dFswXSA9IHZbMF0gKiAtMS4wO1xuXHRcdG91dFsxXSA9IHZbMV0gKiAtMS4wO1xuXHRcdG91dFsyXSA9IHZbMl0gKiAtMS4wO1xuXHR9XG5cblx0c3RhdGljIGNyb3NzKG91dDogRmxvYXQzMkFycmF5LCBhOiBGbG9hdDMyQXJyYXksIGI6IEZsb2F0MzJBcnJheSkgOiBGbG9hdDMyQXJyYXkge1xuXG5cdFx0b3V0WzBdID0gYVsxXSpiWzJdIC0gYVsyXSpiWzFdO1xuXHRcdG91dFsxXSA9IGFbMl0qYlswXSAtIGFbMF0qYlsyXTtcblx0XHRvdXRbMl0gPSBhWzBdKmJbMV0gLSBhWzFdKmJbMF07XG5cblx0XHRyZXR1cm4gb3V0O1xuXHR9XG59IiwiZXhwb3J0IGludGVyZmFjZSBSZXNvdXJjZSB7XG5cdGlkIDogc3RyaW5nO1xuXHR0eXBlIDogUmVzb3VyY2VUeXBlO1xuXG5cdGxvYWQoKTtcblx0Z2V0KCkgOiBhbnk7XG59XG5cbmV4cG9ydCB0eXBlIExvYWRlZENhbGxiYWNrID0gKHI6IFJlc291cmNlKSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgRXJyb3JlZENhbGxiYWNrID0gKHI6IFJlc291cmNlKSA9PiB2b2lkO1xuXG5leHBvcnQgZW51bSBSZXNvdXJjZVR5cGUge1xuXHRJbWFnZSxcblx0VGV4dFxufVxuXG5leHBvcnQgY2xhc3MgSW1hZ2VSZXNvdXJjZSBpbXBsZW1lbnRzIFJlc291cmNlIHtcblxuXHRyZWFkb25seSBpZDogc3RyaW5nO1xuXHRyZWFkb25seSB0eXBlID0gUmVzb3VyY2VUeXBlLkltYWdlO1xuXHRwcml2YXRlIHJlYWRvbmx5IHVybDogc3RyaW5nO1xuXHRwcml2YXRlIHJlYWRvbmx5IGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKGlkXzogc3RyaW5nLCB1cmw6IHN0cmluZywgb25Mb2FkZWQ6IExvYWRlZENhbGxiYWNrLCBvbkVycm9yZWQ6IEVycm9yZWRDYWxsYmFjaykge1xuXG5cblx0XHRjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuXG5cdFx0aW1nLm9ubG9hZCA9IChlOiBFdmVudCkgPT4ge1xuXHRcdFx0b25Mb2FkZWQodGhpcyk7XG5cdFx0fTtcblxuXHRcdGltZy5vbmVycm9yID0gKGU6IEV2ZW50KSA9PiB7XG5cdFx0XHRvbkVycm9yZWQodGhpcyk7XG5cdFx0fTtcblxuXHRcdHRoaXMuaWQgPSBpZF87XG5cdFx0dGhpcy51cmwgPSB1cmw7XG5cdFx0dGhpcy5pbWFnZSA9IGltZztcblx0fVxuXG5cdGxvYWQoKSB7XG5cdFx0dGhpcy5pbWFnZS5zcmMgPSB0aGlzLnVybDtcblx0fVxuXG5cdGdldCgpIHtcblx0XHRyZXR1cm4gdGhpcy5pbWFnZTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIFRleHRSZXNvdXJjZSBpbXBsZW1lbnRzIFJlc291cmNlIHtcblxuXHRyZWFkb25seSBpZDogc3RyaW5nO1xuXHRyZWFkb25seSB0eXBlID0gUmVzb3VyY2VUeXBlLlRleHQ7XG5cdHByaXZhdGUgcmVhZG9ubHkgdXJsOiBzdHJpbmc7XG5cblx0cHJpdmF0ZSByZWFkb25seSB4aHI6IFhNTEh0dHBSZXF1ZXN0O1xuXG5cdHByaXZhdGUgdGV4dDogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKGlkXzogc3RyaW5nLCB1cmw6IHN0cmluZywgb25Mb2FkZWQ6IExvYWRlZENhbGxiYWNrLCBvbkVycm9yZWQ6IEVycm9yZWRDYWxsYmFjaykge1xuXHRcdHRoaXMuaWQgPSBpZF87XG5cdFx0dGhpcy51cmwgPSB1cmw7XG5cblx0XHR0aGlzLnhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdHRoaXMueGhyLm9wZW4oXCJHRVRcIiwgdGhpcy51cmwsIHRydWUpO1xuXHRcdHRoaXMueGhyLm9ubG9hZCA9IChldjogYW55KSA9PiB7XG5cdFx0XHRpZiAodGhpcy54aHIuc3RhdHVzICE9IDIwMCkge1xuXHRcdFx0XHR0aGlzLnRleHQgPSBcIlwiO1xuXHRcdFx0XHRvbkVycm9yZWQodGhpcyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnRleHQgPSBldi5jdXJyZW50VGFyZ2V0ID8gZXYuY3VycmVudFRhcmdldC5yZXNwb25zZVRleHQgOiBldi50YXJnZXQucmVzcG9uc2VUZXh0O1xuXHRcdFx0XHRvbkxvYWRlZCh0aGlzKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy54aHIub25lcnJvciA9IChldjogYW55KSA9PiB7XG5cdFx0XHR0aGlzLnRleHQgPSBcIlwiO1xuXHRcdFx0b25FcnJvcmVkKHRoaXMpO1xuXHRcdH07XG5cdH1cblxuXHRsb2FkKCkge1xuXHRcdGNvbnNvbGUubG9nKGBsb2FkaW5nICR7dGhpcy51cmx9YCk7XG5cdFx0dGhpcy54aHIuc2VuZCgpO1xuXHR9XG5cblx0Z2V0KCkge1xuXHRcdHJldHVybiB0aGlzLnRleHQ7XG5cdH1cbn1cblxuZW51bSBMb2FkZXJTdGF0dXMge1xuXHRDUkVBVElORyxcblx0TE9BRElORyxcblx0RE9ORVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZEltYWdlcyB7XG5cdGlkOiBzdHJpbmc7XG5cdGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xufVxuXG5leHBvcnQgdHlwZSBMb2FkZXJFbmRlZCA9IChsb2FkZXI6IExvYWRlcikgPT4gdm9pZDtcblxuZXhwb3J0IGNsYXNzIExvYWRlciB7XG5cblx0cHJpdmF0ZSBudW1SZXNvdXJjZXNUb0xvYWQgPSAwO1xuXHRwcml2YXRlIHJlc291cmNlczoge1trZXk6c3RyaW5nXTpSZXNvdXJjZX0gPSB7fTtcblx0cHJpdmF0ZSBzdGF0dXMgPSBMb2FkZXJTdGF0dXMuQ1JFQVRJTkc7XG5cdHByaXZhdGUgY3VycmVudExvYWRlZFJlc291cmNlcyA9IDA7XG5cdHByaXZhdGUgZXJyb3JlZFJlc291cmNlcyA9IDA7XG5cdHByaXZhdGUgb25Mb2FkRW5kZWQ6IExvYWRlckVuZGVkID0gbnVsbDtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0fVxuXG5cdGFkZEltYWdlKHVybDogc3RyaW5nfHN0cmluZ1tdKSB7XG5cdFx0aWYgKHR5cGVvZiB1cmw9PT0nc3RyaW5nJykge1xuXHRcdFx0dGhpcy5hZGRJbWFnZUltcGwodXJsIGFzIHN0cmluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHVybHMgPSB1cmwgYXMgc3RyaW5nW107XG5cdFx0XHR1cmxzLmZvckVhY2goIHUgPT4gdGhpcy5hZGRJbWFnZUltcGwodSkgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZFRleHQodXJsOiBzdHJpbmd8c3RyaW5nW10pIHtcblx0XHRpZiAodHlwZW9mIHVybD09PSdzdHJpbmcnKSB7XG5cdFx0XHR0aGlzLmFkZFRleHRJbXBsKHVybCBhcyBzdHJpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB1cmxzID0gdXJsIGFzIHN0cmluZ1tdO1xuXHRcdFx0dXJscy5mb3JFYWNoKCB1ID0+IHRoaXMuYWRkVGV4dEltcGwodSkgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHByb3RlY3RlZCBhZGRUZXh0SW1wbCh1cmw6IHN0cmluZykge1xuXHRcdGlmICh0aGlzLnN0YXR1cz09PUxvYWRlclN0YXR1cy5DUkVBVElORykge1xuXG5cdFx0XHRsZXQgaW5kZXggPSB1cmwubGFzdEluZGV4T2YoJy8nKTtcblx0XHRcdGxldCBpZCA9IHVybC5zdWJzdHJpbmcoaW5kZXgrMSk7XHQvLyBhY2NvdW50cyBmb3IgbGFzdEluZGV4T2Y9PT0tMVxuXHRcdFx0bGV0IGVuZGluZGV4ID0gaWQubGFzdEluZGV4T2YoJz8nKTtcblx0XHRcdGlmIChlbmRpbmRleCE9PS0xKSB7XG5cdFx0XHRcdGlkID0gdXJsLnN1YnN0cmluZygwLGVuZGluZGV4KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMucmVzb3VyY2VzW2lkXSE9PXZvaWQgMCkge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oYCR7aWR9IGhhcyBhbHJlYWR5IGJlZW4gYWRkZWQgdG8gZG93bmxvYWQgbGlzdC4gU2tpcHBpbmdgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMucmVzb3VyY2VzW2lkXSA9IG5ldyBUZXh0UmVzb3VyY2UoaWQsIHVybCwgdGhpcy5vbkxvYWRlZC5iaW5kKHRoaXMpLCB0aGlzLm9uRXJyb3JlZC5iaW5kKHRoaXMpKTtcblx0XHRcdFx0dGhpcy5udW1SZXNvdXJjZXNUb0xvYWQrKztcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgVGV4dCBSZXNvdXJjZSBub3QgYWRkZWQ6ICR7dXJsfS4gQmFkIHN0YXRlLmApO1xuXHRcdH1cblx0fVxuXG5cdHByb3RlY3RlZCBhZGRJbWFnZUltcGwodXJsOiBzdHJpbmcpIHtcblx0XHRpZiAodGhpcy5zdGF0dXM9PT1Mb2FkZXJTdGF0dXMuQ1JFQVRJTkcpIHtcblxuXHRcdFx0bGV0IGluZGV4ID0gdXJsLmxhc3RJbmRleE9mKCcvJyk7XG5cdFx0XHRsZXQgaWQgPSB1cmwuc3Vic3RyaW5nKGluZGV4KzEpO1x0Ly8gYWNjb3VudHMgZm9yIGxhc3RJbmRleE9mPT09LTFcblx0XHRcdGxldCBlbmRpbmRleCA9IGlkLmxhc3RJbmRleE9mKCc/Jyk7XG5cdFx0XHRpZiAoZW5kaW5kZXghPT0tMSkge1xuXHRcdFx0XHRpZCA9IHVybC5zdWJzdHJpbmcoMCxlbmRpbmRleCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLnJlc291cmNlc1tpZF0hPT12b2lkIDApIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKGAke2lkfSBoYXMgYWxyZWFkeSBiZWVuIGFkZGVkIHRvIGRvd25sb2FkIGxpc3QuIFNraXBwaW5nYCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnJlc291cmNlc1tpZF0gPSBuZXcgSW1hZ2VSZXNvdXJjZShpZCwgdXJsLCB0aGlzLm9uTG9hZGVkLmJpbmQodGhpcyksIHRoaXMub25FcnJvcmVkLmJpbmQodGhpcykpO1xuXHRcdFx0XHR0aGlzLm51bVJlc291cmNlc1RvTG9hZCsrO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGBIVE1MSW1hZ2VFbGVtZW50IFJlc291cmNlIG5vdCBhZGRlZDogJHt1cmx9LiBCYWQgc3RhdGUuYCk7XG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIG9uTG9hZGVkKHI6IFJlc291cmNlKSB7XG5cdFx0dGhpcy5sb2FkZWQocik7XG5cdH1cblxuXHRwcm90ZWN0ZWQgb25FcnJvcmVkKHI6IFJlc291cmNlKSB7XG5cdFx0dGhpcy5lcnJvcmVkUmVzb3VyY2VzKys7XG5cdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgbG9hZGluZyByZXNvdXJjZSAke3IuaWR9YCk7XG5cdFx0dGhpcy5sb2FkZWQocik7XG5cdH1cblxuXHRwcm90ZWN0ZWQgbG9hZGVkKHI6IFJlc291cmNlKSB7XG5cdFx0dGhpcy5jdXJyZW50TG9hZGVkUmVzb3VyY2VzKys7XG5cdFx0aWYgKHRoaXMuY3VycmVudExvYWRlZFJlc291cmNlcz09PXRoaXMubnVtUmVzb3VyY2VzVG9Mb2FkKSB7XG5cdFx0XHR0aGlzLm9uTG9hZEVuZGVkKCB0aGlzICk7XG5cdFx0XHR0aGlzLnN0YXR1cyA9IExvYWRlclN0YXR1cy5ET05FO1xuXHRcdH1cblxuXHRcdGNvbnNvbGUuaW5mbyhgbG9hZGVkICR7ci5pZH0gLSAke3RoaXMuY3VycmVudExvYWRlZFJlc291cmNlc30vJHt0aGlzLm51bVJlc291cmNlc1RvTG9hZH0uIEVycm9yZWQ6ICR7dGhpcy5lcnJvcmVkUmVzb3VyY2VzfWApO1xuXHR9XG5cblx0bG9hZChjYjogTG9hZGVyRW5kZWQpIHtcblx0XHR0aGlzLnN0YXR1cyA9IExvYWRlclN0YXR1cy5MT0FESU5HO1xuXHRcdHRoaXMub25Mb2FkRW5kZWQgPSBjYjtcblx0XHRjb25zb2xlLmluZm8oYEFib3V0IHRvIGxvYWQgJHt0aGlzLm51bVJlc291cmNlc1RvTG9hZH0gZWxlbWVudHNgKVxuXHRcdE9iamVjdC5rZXlzKHRoaXMucmVzb3VyY2VzKS5mb3JFYWNoKCBrID0+IHRoaXMucmVzb3VyY2VzW2tdLmxvYWQoKSApO1xuXHR9XG5cblx0Z2V0IGlzRXJyb3IoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZXJyb3JlZFJlc291cmNlcyE9PTA7XG5cdH1cblxuXHRnZXRUZXh0KGlkOiBzdHJpbmcpIDogc3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy5yZXNvdXJjZXNbaWRdLmdldCgpIGFzIHN0cmluZztcblx0fVxuXG5cdGdldEltYWdlKGlkOiBzdHJpbmcpIDogSFRNTEltYWdlRWxlbWVudCB7XG5cdFx0cmV0dXJuIHRoaXMucmVzb3VyY2VzW2lkXS5nZXQoKTtcblx0fVxuXG5cdGdldEltYWdlc1dpdGgoaWRzOiBzdHJpbmdbXSkgOiBIVE1MSW1hZ2VFbGVtZW50W10ge1xuXG5cdFx0Y29uc3QgcmV0OiBIVE1MSW1hZ2VFbGVtZW50W10gPSBbXTtcblx0XHRpZHMuZm9yRWFjaCggaWQgPT4ge1xuXHRcdFx0Y29uc3QgciA9IHRoaXMucmVzb3VyY2VzW2lkXTtcblx0XHRcdGlmIChyIT09dm9pZCAwKSB7XG5cdFx0XHRcdHJldC5wdXNoKHIuZ2V0KCkgYXMgSFRNTEltYWdlRWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0Z2V0SW1hZ2VzKCkgOiBMb2FkZWRJbWFnZXNbXSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VCeVR5cGUoUmVzb3VyY2VUeXBlLkltYWdlKS5tYXAoIChlKSA9PiB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRpbWFnZTogZS5nZXQoKSBhcyBIVE1MSW1hZ2VFbGVtZW50LFxuXHRcdFx0XHRpZDogZS5pZFxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHJvdGVjdGVkIGdldFJlc291cmNlQnlUeXBlKHQ6IFJlc291cmNlVHlwZSkgOiBSZXNvdXJjZVtdIHtcblx0XHRjb25zdCByZXQ6IFJlc291cmNlW10gPSBbXTtcblx0XHRPYmplY3Qua2V5cyh0aGlzLnJlc291cmNlcykuZm9yRWFjaCggayA9PiB7XG5cdFx0XHRjb25zdCByID0gdGhpcy5yZXNvdXJjZXNba107XG5cdFx0XHRpZiAoIHIudHlwZT09PXQgKSB7XG5cdFx0XHRcdHJldC5wdXNoKHIpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJldDtcblx0fVxufSIsIi8qKlxuICogSW5pdGlhbGl6ZSBzeXN0ZW0uXG4gKiBDcmVhdGUgY2FudmFzLCBnZXQgZ2wyIGNvbnRleHQsIGV0Yy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxhdGZvcm0ge1xuXG5cdHN0YXRpYyBnbENvbnRleHQ6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgPSBudWxsO1xuXHRzdGF0aWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IG51bGw7XG5cblx0c3RhdGljIGluaXRpYWxpemUodzogbnVtYmVyLCBoOiBudW1iZXIpIHtcblx0XHRjb25zdCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cdFx0Yy53aWR0aCA9IHc7XG5cdFx0Yy5oZWlnaHQgPSBoO1xuXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjKTtcblxuXHRcdGNvbnN0IGN0eCA9IGMuZ2V0Q29udGV4dChcIndlYmdsMlwiLCB7XG5cdFx0XHRkZXB0aDogdHJ1ZSxcblx0XHRcdGFscGhhOiBmYWxzZSxcblx0XHRcdGFudGlhbGlhczogZmFsc2UsXG5cdFx0XHRwcmVtdWx0aXBsaWVkQWxwaGE6IGZhbHNlLFxuXHRcdH0pO1xuXG5cdFx0aWYgKGN0eCkge1xuXHRcdFx0UGxhdGZvcm0uZ2xDb250ZXh0ID0gY3R4O1xuXHRcdFx0UGxhdGZvcm0uY2FudmFzID0gYztcblx0XHR9IGVsc2Uge1xuXHRcdFx0YWxlcnQoXCJXZWJnbDIgZW5hYmxlZCBwbGVhc2UuXCIpO1xuXHRcdH1cblx0fVxufSIsImltcG9ydCBWZWN0b3IzIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjNcIjtcbmltcG9ydCBNYXRyaXg0IGZyb20gXCIuLi9tYXRoL01hdHJpeDRcIjtcblxuY29uc3QgdjAgPSBWZWN0b3IzLmNyZWF0ZSgpO1xuY29uc3QgdjEgPSBWZWN0b3IzLmNyZWF0ZSgpO1xuXG5mdW5jdGlvbiByYWRpYW5zKHYpIDogbnVtYmVyIHtcblx0cmV0dXJuIHYqTWF0aC5QSS8xODA7XG59XG5cbmV4cG9ydCB0eXBlIFBvaW50RGVmaW5pdGlvbiA9IG51bWJlcltdO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhbWVyYURlZmluaXRpb24ge1xuXHRwb3NpdGlvbjogUG9pbnREZWZpbml0aW9uO1xuXHRmb3J3YXJkOiBQb2ludERlZmluaXRpb247XG5cdHVwOiBQb2ludERlZmluaXRpb247XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbWVyYSB7XG5cblx0cmVhZG9ubHkgcG9zaXRpb246IEZsb2F0MzJBcnJheTtcblx0cHJpdmF0ZSByZWFkb25seSBmb3J3YXJkIDogRmxvYXQzMkFycmF5O1xuXHRwcml2YXRlIHJlYWRvbmx5IHVwOiBGbG9hdDMyQXJyYXk7XG5cblx0bWF0cml4ID0gTWF0cml4NC5jcmVhdGUoKTtcblx0dmlld01hdHJpeCA9IE1hdHJpeDQuY3JlYXRlKCk7XG5cblx0YWR2YW5jZUFtb3VudCA9IDA7XG5cdHN0cmFmZUFtb3VudCA9IDA7XG5cdHVwQW1vdW50ID0gMDtcblxuXHRwcml2YXRlIHlhdyA9IDA7XG5cdHByaXZhdGUgcGl0Y2ggPSAwO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMucG9zaXRpb24gPSBWZWN0b3IzLmNyZWF0ZUZyb21Db29yZHMoMCwwLDMpO1xuXHRcdHRoaXMuZm9yd2FyZCA9IFZlY3RvcjMuY3JlYXRlRnJvbUNvb3JkcygwLDAsMCk7XG5cdFx0dGhpcy51cCA9IFZlY3RvcjMuY3JlYXRlRnJvbUNvb3JkcygwLDEsMCk7XG5cdH1cblxuXHRzdGF0aWMgZnJvbShjOiBDYW1lcmFEZWZpbml0aW9uKSA6IENhbWVyYSB7XG5cdFx0cmV0dXJuIG5ldyBDYW1lcmEoKS5zZXR1cChjLnBvc2l0aW9uLCBjLmZvcndhcmQsIGMudXApO1xuXHR9XG5cblx0c2V0dXAocG9zOiBBcnJheUxpa2U8bnVtYmVyPiwgZm9yd2FyZDogQXJyYXlMaWtlPG51bWJlcj4sIHVwOiBBcnJheUxpa2U8bnVtYmVyPikge1xuXHRcdFZlY3RvcjMuY29weSh0aGlzLnBvc2l0aW9uLCBwb3MpO1xuXHRcdFZlY3RvcjMuY29weSh0aGlzLmZvcndhcmQsIGZvcndhcmQpO1xuXHRcdFZlY3RvcjMuY29weSh0aGlzLnVwLCB1cCk7XG5cblx0XHRWZWN0b3IzLm5vcm1hbGl6ZSh2MCwgVmVjdG9yMy5jb3B5KHYwLCB0aGlzLmZvcndhcmQpKTtcblxuXHRcdHRoaXMueWF3ID0gMTgwL01hdGguUEkqTWF0aC5hdGFuMih2MFsyXSwgdjBbMF0pO1xuXHRcdHRoaXMucGl0Y2ggPVxuXHRcdFx0MTgwL01hdGguUEkqTWF0aC5hc2luKHYwWzFdKTtcblx0XHR0aGlzLnN5bmMoKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c3luYygpIHtcblx0XHRpZiAodGhpcy5hZHZhbmNlQW1vdW50IT09MCkge1xuXHRcdFx0dGhpcy5hZHZhbmNlKHRoaXMuYWR2YW5jZUFtb3VudCouMjUpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5zdHJhZmVBbW91bnQhPT0wKSB7XG5cdFx0XHR0aGlzLnN0cmFmZSh0aGlzLnN0cmFmZUFtb3VudCouMjUpO1xuXHRcdH1cblx0XHRpZiAodGhpcy51cEFtb3VudCE9PTApIHtcblx0XHRcdHRoaXMubW92ZVVwKHRoaXMudXBBbW91bnQqLjI1KTtcblx0XHR9XG5cdFx0TWF0cml4NC5sb29rQXQodGhpcy5tYXRyaXgsIHRoaXMucG9zaXRpb24sIFZlY3RvcjMuYWRkKHYwLCB0aGlzLnBvc2l0aW9uLCB0aGlzLmZvcndhcmQpLCB0aGlzLnVwKTtcblx0XHRNYXRyaXg0LnZpZXdNYXRyaXgodGhpcy52aWV3TWF0cml4LCB0aGlzLm1hdHJpeCk7XG5cdH1cblxuXHRsb29rQXQoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xuXHRcdFZlY3RvcjMubm9ybWFsaXplKHRoaXMuZm9yd2FyZCxcblx0XHRcdFZlY3RvcjMuc3ViKFxuXHRcdFx0XHR0aGlzLmZvcndhcmQsXG5cdFx0XHRcdFZlY3RvcjMuY3JlYXRlRnJvbUNvb3Jkcyh4LCB5LCB6KSxcblx0XHRcdFx0dGhpcy5wb3NpdGlvbikpO1xuXHRcdHRoaXMuc2V0dXAodGhpcy5wb3NpdGlvbiwgdGhpcy5mb3J3YXJkLCB0aGlzLnVwKTtcblx0fVxuXG5cdGFkdmFuY2UoYW1vdW50OiBudW1iZXIpIHtcblx0XHRWZWN0b3IzLmFkZChcblx0XHRcdHRoaXMucG9zaXRpb24sXG5cdFx0XHR0aGlzLnBvc2l0aW9uLFxuXHRcdFx0VmVjdG9yMy5tdWwodjAsIHRoaXMuZm9yd2FyZCwgYW1vdW50KSk7XG5cdH1cblxuXHRzdHJhZmUoYW1vdW50OiBudW1iZXIpIHtcblx0XHRWZWN0b3IzLmFkZChcblx0XHRcdHRoaXMucG9zaXRpb24sXG5cdFx0XHR0aGlzLnBvc2l0aW9uLFxuXHRcdFx0VmVjdG9yMy5tdWwoXG5cdFx0XHRcdHYwLFxuXHRcdFx0XHRWZWN0b3IzLm5vcm1hbGl6ZShcblx0XHRcdFx0XHR2MCxcblx0XHRcdFx0XHRWZWN0b3IzLmNyb3NzKHYwLCB0aGlzLmZvcndhcmQsIHRoaXMudXApKSxcblx0XHRcdFx0YW1vdW50KSk7XG5cdH1cblxuXHRtb3ZlVXAoYW1vdW50OiBudW1iZXIpIHtcblxuXHRcdC8vIHJpZ2h0XG5cdFx0VmVjdG9yMy5ub3JtYWxpemUoXG5cdFx0XHR2MCxcblx0XHRcdFZlY3RvcjMuY3Jvc3ModjAsIHRoaXMuZm9yd2FyZCwgdGhpcy51cCkpO1xuXG5cdFx0Ly8gdXBcblx0XHRWZWN0b3IzLm5vcm1hbGl6ZShcblx0XHRcdHYxLFxuXHRcdFx0VmVjdG9yMy5jcm9zcyh2MSwgdGhpcy5mb3J3YXJkLCB2MCkpO1xuXG5cdFx0VmVjdG9yMy5hZGQoXG5cdFx0XHR0aGlzLnBvc2l0aW9uLFxuXHRcdFx0dGhpcy5wb3NpdGlvbixcblx0XHRcdFZlY3RvcjMubXVsKHYxLCB2MSwgYW1vdW50KSk7XG5cdH1cblxuXHRhbmdsZXNGcm9tKGl4OiBudW1iZXIsIGl5OiBudW1iZXIpIHtcblxuXHRcdHRoaXMueWF3ICs9IGl4O1xuXHRcdHRoaXMucGl0Y2ggLT0gaXk7XG5cblx0XHRpZiAodGhpcy5waXRjaD44OSkgeyB0aGlzLnBpdGNoPTg5OyB9XG5cdFx0aWYgKHRoaXMucGl0Y2g8LTg5KSB7IHRoaXMucGl0Y2g9LTg5OyB9XG5cblx0XHR2MFswXSA9IE1hdGguY29zKHJhZGlhbnModGhpcy5waXRjaCkpICogTWF0aC5jb3MocmFkaWFucyh0aGlzLnlhdykpO1xuXHRcdHYwWzFdID0gTWF0aC5zaW4ocmFkaWFucyh0aGlzLnBpdGNoKSk7XG5cdFx0djBbMl0gPSBNYXRoLmNvcyhyYWRpYW5zKHRoaXMucGl0Y2gpKSAqIE1hdGguc2luKHJhZGlhbnModGhpcy55YXcpKTtcblxuXHRcdFZlY3RvcjMubm9ybWFsaXplKHRoaXMuZm9yd2FyZCwgdjApO1xuXHRcdHRoaXMuc3luYygpO1xuXHR9XG59IiwiaW1wb3J0IFBsYXRmb3JtIGZyb20gXCIuLi9wbGF0Zm9ybS9QbGF0Zm9ybVwiO1xuaW1wb3J0IFNoYWRlciBmcm9tIFwiLi9zaGFkZXIvU2hhZGVyXCI7XG5pbXBvcnQgTnVsbFNoYWRlciBmcm9tIFwiLi9zaGFkZXIvTnVsbFNoYWRlclwiO1xuaW1wb3J0IE1hdHJpeDQgZnJvbSBcIi4uL21hdGgvTWF0cml4NFwiO1xuaW1wb3J0IFRleHR1cmUgZnJvbSBcIi4vVGV4dHVyZVwiO1xuaW1wb3J0IFRleHR1cmVTaGFkZXIgZnJvbSBcIi4vc2hhZGVyL1RleHR1cmVTaGFkZXJcIjtcbmltcG9ydCBWZWN0b3IzIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjNcIjtcbmltcG9ydCBDYW1lcmEgZnJvbSBcIi4vQ2FtZXJhXCI7XG5pbXBvcnQgU2t5Ym94U2hhZGVyIGZyb20gXCIuL3NoYWRlci9Ta3lib3hTaGFkZXJcIjtcbmltcG9ydCB7Q3ViZX0gZnJvbSBcIi4vZ2VvbWV0cnkvQ3ViZVwiO1xuaW1wb3J0IFJlbmRlckNvbXBvbmVudCBmcm9tIFwiLi9SZW5kZXJDb21wb25lbnRcIjtcbmltcG9ydCB7RW52aXJvbm1lbnRNYXBTaGFkZXJ9IGZyb20gXCIuL3NoYWRlci9FbnZpcm9ubWVudE1hcFNoYWRlclwiO1xuaW1wb3J0IE1hdGVyaWFsIGZyb20gXCIuL01hdGVyaWFsXCI7XG5pbXBvcnQgU3VyZmFjZSBmcm9tIFwiLi9TdXJmYWNlXCI7XG5pbXBvcnQgTWVzaCBmcm9tIFwiLi9NZXNoXCI7XG5pbXBvcnQgTGlnaHQsIHtQb2ludExpZ2h0fSBmcm9tIFwiLi9MaWdodFwiO1xuaW1wb3J0IE15cmlhaGVkcmFsLCB7R2VvbWV0cnlJbmZvSW5kZXhlZH0gZnJvbSBcIi4vZ2VvbWV0cnkvTXlyaWFoZWRyYWxcIjtcbmltcG9ydCB7XG5cdEN1YmVHZW9tZXRyeSxcblx0SWNvc2FoZWRyb25HZW9tZXRyeSxcblx0TXlyaWFoZWRyb25HZW9tZXRyeSxcblx0T2N0YWhlZHJvbkdlb21ldHJ5LFxuXHRUZXRyYWhlZHJvbkdlb21ldHJ5XG59IGZyb20gXCIuL2dlb21ldHJ5L1NvbGlkc1wiO1xuaW1wb3J0IHtHcmF0aWN1bGVQYXJhbXMsIEdyYXRpY3VsZXN9IGZyb20gXCIuL2dlb21ldHJ5L0dyYXRpY3VsZVwiO1xuXG5jb25zdCBNYXhVbmZvbGRTY2FsZSA9IDkwO1xuY29uc3QgTiA9IDY0O1xubGV0IHBvcyA9IDA7XG5cbmludGVyZmFjZSBHcmF0aWN1bGVEYXRhIHtcblx0bWVzaDogTWVzaDtcblx0bXlyaWFoZWRyYWw6IE15cmlhaGVkcmFsO1xuXG5cdG91dGxpbmU/OiBNZXNoO1xuXHRub3JtYWxzPzogTWVzaDtcblx0Zm9sZFBvaW50cz86IE1lc2g7XG5cdGZvbGRMaW5lcz86IE1lc2g7XG5cdGN1dFBvaW50cz86IE1lc2g7XG5cdGN1dExpbmVzPzogTWVzaDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5naW5lIHtcblxuXHRyZW5kZXJXaWR0aDogbnVtYmVyO1xuXHRyZW5kZXJIZWlnaHQ6IG51bWJlcjtcblxuXHRyZWFkb25seSBnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dDtcblx0cHJpdmF0ZSBzaGFkZXIgOiB7W2tleTogc3RyaW5nXTpTaGFkZXJ9ID0ge307XG5cdHByaXZhdGUgdGV4dHVyZToge1trZXk6IHN0cmluZ106VGV4dHVyZX0gPSB7fTtcblx0cHJpdmF0ZSBzdXJmYWNlOiB7W2tleTogc3RyaW5nXTpTdXJmYWNlfSA9IHt9O1xuXHRwcml2YXRlIGNhbWVyYToge1trZXk6IHN0cmluZ106Q2FtZXJhfSA9IHt9O1xuXHRwcml2YXRlIG1lc2g6IHtba2V5OiBzdHJpbmddOlJlbmRlckNvbXBvbmVudH0gPSB7fTtcblx0bGlnaHQ6IHtba2V5OiBzdHJpbmddOkxpZ2h0fSA9IHt9O1xuXG5cdHByaXZhdGUgcGVyc3BlY3RpdmUgPSBNYXRyaXg0LmNyZWF0ZSgpO1xuXHRwcml2YXRlIGN1cnJlbnRDYW1lcmE6IENhbWVyYTtcblxuXHR0aW1lID0gMDtcblxuXHRwcml2YXRlIG1hdHJpY2VzID0gbmV3IEZsb2F0MzJBcnJheSgxNipOKk4pO1xuXHRwcml2YXRlIG1hdHJpeCA9IE1hdHJpeDQuY3JlYXRlKCk7XG5cdHByaXZhdGUgcG9zaXRpb24gPSBWZWN0b3IzLmNyZWF0ZSgpO1xuXHRwcml2YXRlIHJvdGF0aW9uPSBWZWN0b3IzLmNyZWF0ZSgpO1xuXHRwcml2YXRlIHNjYWxlID0gVmVjdG9yMy5jcmVhdGVGcm9tQ29vcmRzKDEsMSwxKTtcblxuXHRleHkgPSAwO1xuXHRleHogPSAwO1xuXHRleXogPSAwO1xuXG5cdHVuZm9sZFNjYWxlID0gMDtcblx0bXlyaWFoZWRyYWw6IE15cmlhaGVkcmFsO1xuXG5cdG5vcm1hbHMgPSBmYWxzZTtcblx0Y3V0cyA9IGZhbHNlO1xuXHRmb2xkcyA9IGZhbHNlO1xuXHRvdXRsaW5lID0gZmFsc2U7XG5cdGFjdGlvbiA9IDA7XG5cblx0Y29uc3RydWN0b3IodzogbnVtYmVyLCBoOiBudW1iZXIpIHtcblx0XHRQbGF0Zm9ybS5pbml0aWFsaXplKHcsIGgpO1xuXG5cdFx0dGhpcy5nbCA9IFBsYXRmb3JtLmdsQ29udGV4dDtcblxuXHRcdHRoaXMucmVzaXplKHcsIGgsIHRydWUpO1xuXG5cdFx0Ly8gYWhlbWhlbVxuXHRcdCh3aW5kb3cgYXMgYW55KS5lbmdpbmUgPSB0aGlzO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHRjb25zdCBnbCA9IHRoaXMuZ2w7XG5cblx0XHR0aGlzLmN1cnJlbnRDYW1lcmEgPSBuZXcgQ2FtZXJhKCk7XG5cblx0XHR0aGlzLmNhbWVyYVtcImNhbWVyYTBcIl0gPSB0aGlzLmN1cnJlbnRDYW1lcmE7XG5cblx0XHR0aGlzLnNoYWRlcltcIm51bGxcIl0gPSBuZXcgTnVsbFNoYWRlcihnbCk7XG5cdFx0dGhpcy5zaGFkZXJbXCJ0ZXh0dXJlXCJdID0gbmV3IFRleHR1cmVTaGFkZXIoZ2wpO1xuXHRcdHRoaXMuc2hhZGVyW1widGV4dHVyZU5vTGlnaHRcIl0gPSBuZXcgVGV4dHVyZVNoYWRlcihnbCwge30pO1xuXG5cdFx0dGhpcy5zaGFkZXJbXCJza3lib3hcIl0gPSBuZXcgU2t5Ym94U2hhZGVyKGdsKTtcblx0XHR0aGlzLnNoYWRlcltcInJlZmxlY3RpdmVFbnZNYXBcIl0gPSBuZXcgRW52aXJvbm1lbnRNYXBTaGFkZXIoZ2wpO1xuXHRcdHRoaXMuc2hhZGVyW1wicmVmcmFjdGl2ZUVudk1hcFwiXSA9IG5ldyBFbnZpcm9ubWVudE1hcFNoYWRlcihnbCwgdHJ1ZSk7XG5cblx0XHR0aGlzLnN1cmZhY2VbXCJzdXJmYWNlMFwiXSA9IG5ldyBTdXJmYWNlKHRoaXMsIHtcblx0XHRcdHdpZHRoOiAyNTYsXG5cdFx0XHRoZWlnaHQ6IDI1Nixcblx0XHRcdGF0dGFjaG1lbnRzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZW5kZXJCdWZmZXJUYXJnZXQ6IGdsLkRFUFRIX1NURU5DSUxfQVRUQUNITUVOVCxcblx0XHRcdFx0XHRyZW5kZXJCdWZmZXJJbnRlcm5hbEZvcm1hdDogZ2wuREVQVEgyNF9TVEVOQ0lMOFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVuZGVyQnVmZmVyVGFyZ2V0OiBnbC5DT0xPUl9BVFRBQ0hNRU5UMCxcblx0XHRcdFx0XHR0ZXh0dXJlRGVmaW5pdGlvbjoge1xuXHRcdFx0XHRcdFx0Ly8gZGVmYXVsdC4gc2l6ZSB3aWxsIGJlIHNldCBhcyBTdXJmYWNlIHNpemUuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSk7XG5cblx0XHR0aGlzLm1lc2hbXCJjdWJlMlwiXSA9IG5ldyBDdWJlKHRoaXMsIE1hdGVyaWFsLlRleHR1cmUoXG5cdFx0XHR0aGlzLmdldFRleHR1cmUoXCJkaWZmdXNlXCIpLFxuXHRcdFx0dGhpcy5nZXRUZXh0dXJlKFwic3BlY3VsYXJcIiksXG5cdFx0XHQuMSxcblx0XHRcdDMyXG5cdFx0KSwgZmFsc2UsIE4qTik7XG5cdFx0dGhpcy51cGRhdGVJbnN0YW5jaW5nTWF0cmljZXMoKTtcblxuXHRcdHRoaXMubWVzaFtcImxpZ2h0cHJvYmVcIl0gPSBuZXcgQ3ViZSh0aGlzLCBNYXRlcmlhbC5Db2xvcihuZXcgRmxvYXQzMkFycmF5KFsxLjAsIDAuMCwgMC4wLCAxLjBdKSksIGZhbHNlKTtcblxuXHRcdHRoaXMubWVzaFtcImN1YmVcIl0gPSBuZXcgQ3ViZSh0aGlzLFxuXHRcdFx0TWF0ZXJpYWwuVGV4dHVyZSh0aGlzLnN1cmZhY2VbXCJzdXJmYWNlMFwiXS50ZXh0dXJlLCB0aGlzLnN1cmZhY2VbXCJzdXJmYWNlMFwiXS50ZXh0dXJlLCAuMiwgMzIpLCBmYWxzZSwgTipOKTtcblx0XHR0aGlzLm1lc2hbXCJza3lib3hcIl0gPSBuZXcgQ3ViZSh0aGlzLCBNYXRlcmlhbC5Ta3lib3godGhpcy5nZXRUZXh0dXJlKFwiY3ViZW1hcFwiKSksIHRydWUpO1xuXG5cdFx0dGhpcy5idWlsZEdyYXRpY3VsZXMoKTtcblx0XHR0aGlzLmJ1aWxkTXlyaWFoZWRyb25zKCk7XG5cdFx0dGhpcy5zZWxlY3RHcmF0aWN1bGUoMCk7XG5cblx0XHR0aGlzLmN1cnJlbnRDYW1lcmEuc2V0dXAoXG5cdFx0XHRbLTExNi4xNTk4ODE1OTE3OTY4OCwgNi42Nzc3MjA1NDY3MjI0MTIsIC01Ljg3MDMyMTI3MzgwMzcxMV0sXG5cdFx0XHRbMC45OTc3OTU4Nzk4NDA4NTA4LCAtMC4wMTY5NzI3NTYwMTMyNzQxOTMsIDAuMDY0MTUwNjM4ODc4MzQ1NDldLFxuXHRcdFx0WzAsMSwwXVxuXHRcdCk7XG5cblx0XHR0aGlzLmN1cnJlbnRDYW1lcmEubG9va0F0KDAsMCwwKTtcblx0XHR0aGlzLmxpZ2h0W1wic3VuXCJdID0gTGlnaHQuRGlyZWN0aW9uYWwoe1xuXHRcdFx0YW1iaWVudDogWy4xLCAuMSwgLjFdLFxuXHRcdFx0ZGlmZnVzZTogWy41LCAuNSwgLjVdLFxuXHRcdFx0c3BlY3VsYXI6IFsxLCAxLCAxXSxcblx0XHRcdGRpcmVjdGlvbjogWzAsIC0xLCAxXVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5saWdodFtcInBvaW50XCJdID0gTGlnaHQuUG9pbnQoe1xuXHRcdFx0YW1iaWVudDogWy4xLCAuMSwgLjFdLFxuXHRcdFx0ZGlmZnVzZTogWzEsMSwxXSxcblx0XHRcdHNwZWN1bGFyOiBbMSwgMSwgMV0sXG5cdFx0XHRwb3NpdGlvbjogWzAsIDAsIC0zXVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5pbml0aWFsaXplR3JhcGhpY3MoKTtcblxuXHRcdFBsYXRmb3JtLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgKGU6IFRvdWNoRXZlbnQpID0+IHtcblxuXHRcdFx0Y29uc3QgbXVsdCA9IChlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIDwgd2luZG93LmlubmVyV2lkdGgvMikgPyAxIDogLTE7XG5cdFx0XHRwb3MrPS4wMSAqIG11bHQ7XG5cblx0XHRcdHRoaXMuY3VycmVudENhbWVyYS5sb29rQXQoXG5cdFx0XHRcdDMwKk1hdGguY29zKHBvcyksXG5cdFx0XHRcdC0yMCxcblx0XHRcdFx0MzAqTWF0aC5zaW4ocG9zKSk7XG5cblx0XHRcdGNvbnNvbGUubG9nKHBvcyk7XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIGJ1aWxkRm9sZHNDdXRzTGluZXMoZGF0YTogR2VvbWV0cnlJbmZvSW5kZXhlZCwgczE6IG51bWJlciwgczI6IG51bWJlciwgZ2Q6IEdyYXRpY3VsZURhdGEpIHtcblxuXHRcdGNvbnN0IGdsID0gdGhpcy5nbDtcblxuXHRcdC8qKioqKi9cblx0XHRjb25zdCBjZW50ZXJzOiBudW1iZXJbXSA9IFtdO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5pbmRleC5sZW5ndGg7IGkgKz0gMykge1xuXG5cdFx0XHRjb25zdCB2MHggPSBkYXRhLnZlcnRpY2VzW2RhdGEuaW5kZXhbaV0gKiAzXTtcblx0XHRcdGNvbnN0IHYweSA9IGRhdGEudmVydGljZXNbZGF0YS5pbmRleFtpXSAqIDMgKyAxXTtcblx0XHRcdGNvbnN0IHYweiA9IGRhdGEudmVydGljZXNbZGF0YS5pbmRleFtpXSAqIDMgKyAyXTtcblxuXHRcdFx0Y29uc3QgdjF4ID0gZGF0YS52ZXJ0aWNlc1tkYXRhLmluZGV4W2kgKyAxXSAqIDNdO1xuXHRcdFx0Y29uc3QgdjF5ID0gZGF0YS52ZXJ0aWNlc1tkYXRhLmluZGV4W2kgKyAxXSAqIDMgKyAxXTtcblx0XHRcdGNvbnN0IHYxeiA9IGRhdGEudmVydGljZXNbZGF0YS5pbmRleFtpICsgMV0gKiAzICsgMl07XG5cblx0XHRcdGNvbnN0IHYyeCA9IGRhdGEudmVydGljZXNbZGF0YS5pbmRleFtpICsgMl0gKiAzXTtcblx0XHRcdGNvbnN0IHYyeSA9IGRhdGEudmVydGljZXNbZGF0YS5pbmRleFtpICsgMl0gKiAzICsgMV07XG5cdFx0XHRjb25zdCB2MnogPSBkYXRhLnZlcnRpY2VzW2RhdGEuaW5kZXhbaSArIDJdICogMyArIDJdO1xuXG5cdFx0XHRjZW50ZXJzLnB1c2goKHYweCArIHYxeCArIHYyeCkgLyAzKTtcblx0XHRcdGNlbnRlcnMucHVzaCgodjB5ICsgdjF5ICsgdjJ5KSAvIDMpO1xuXHRcdFx0Y2VudGVycy5wdXNoKCh2MHogKyB2MXogKyB2MnopIC8gMyk7XG5cdFx0fVxuXHRcdGNvbnN0IGluZGljZXM6IG51bWJlcltdID0gW107XG5cdFx0ZGF0YS5mb2xkcy5mb3JFYWNoKGZvbGQgPT4ge1xuXHRcdFx0aW5kaWNlcy5wdXNoKGZvbGQuZjApO1xuXHRcdFx0aW5kaWNlcy5wdXNoKGZvbGQuZjEpO1xuXHRcdH0pO1xuXG5cdFx0aWYgKHRoaXMuZm9sZHMpIHtcblx0XHRcdGNvbnN0IG1jID0gTWF0ZXJpYWwuQ29sb3IobmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMSwgMV0pKTtcblx0XHRcdG1jLnJlbmRlck1vZGUgPSBnbC5QT0lOVFM7XG5cdFx0XHRnZC5mb2xkUG9pbnRzID0gbmV3IE1lc2goKS5mcm9tKHRoaXMsIHtcblx0XHRcdFx0bWF0ZXJpYWw6IG1jLFxuXHRcdFx0XHRpbmRleDogbmV3IFVpbnQxNkFycmF5KGluZGljZXMpLFxuXHRcdFx0XHR2ZXJ0aWNlczogbmV3IEZsb2F0MzJBcnJheShjZW50ZXJzKSxcblx0XHRcdFx0Y3VsbERpc2FibGVkOiB0cnVlLFxuXHRcdFx0XHR1djogbnVsbCxcblx0XHRcdFx0bm9ybWFsczogbnVsbCxcblx0XHRcdH0sIDEpLnNldFNjYWxlKHMyKTtcblxuXHRcdFx0Y29uc3QgbWMyID0gTWF0ZXJpYWwuQ29sb3IobmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMSwgMV0pKTtcblx0XHRcdG1jMi5yZW5kZXJNb2RlID0gZ2wuTElORVM7XG5cdFx0XHRnZC5mb2xkTGluZXMgPSBuZXcgTWVzaCgpLmZyb20odGhpcywge1xuXHRcdFx0XHRtYXRlcmlhbDogbWMyLFxuXHRcdFx0XHRpbmRleDogbmV3IFVpbnQxNkFycmF5KGluZGljZXMpLFxuXHRcdFx0XHR2ZXJ0aWNlczogbmV3IEZsb2F0MzJBcnJheShjZW50ZXJzKSxcblx0XHRcdFx0Y3VsbERpc2FibGVkOiB0cnVlLFxuXHRcdFx0XHR1djogbnVsbCxcblx0XHRcdFx0bm9ybWFsczogbnVsbCxcblx0XHRcdH0sIDEpLnNldFNjYWxlKHMyKTtcblx0XHR9XG5cblx0XHQvLy8gY3V0c1xuXHRcdGNvbnN0IGluZGljZXNjdXQ6IG51bWJlcltdID0gW107XG5cdFx0ZGF0YS5jdXRzLmZvckVhY2goKGN1dCkgPT4ge1xuXHRcdFx0aW5kaWNlc2N1dC5wdXNoKGN1dC52ZXJ0ZXgwKTtcblx0XHRcdGluZGljZXNjdXQucHVzaChjdXQudmVydGV4MSk7XG5cdFx0fSk7XG5cblx0XHRpZiAodGhpcy5jdXRzKSB7XG5cdFx0XHRjb25zdCBtYzMgPSBNYXRlcmlhbC5Db2xvcihuZXcgRmxvYXQzMkFycmF5KFswLCAxLCAxLCAxXSkpO1xuXHRcdFx0bWMzLnJlbmRlck1vZGUgPSBnbC5MSU5FUztcblx0XHRcdGdkLmN1dExpbmVzID0gbmV3IE1lc2goKS5mcm9tKHRoaXMsIHtcblx0XHRcdFx0bWF0ZXJpYWw6IG1jMyxcblx0XHRcdFx0aW5kZXg6IG5ldyBVaW50MTZBcnJheShpbmRpY2VzY3V0KSxcblx0XHRcdFx0dmVydGljZXM6IG5ldyBGbG9hdDMyQXJyYXkoZGF0YS52ZXJ0aWNlcyksXG5cdFx0XHRcdGN1bGxEaXNhYmxlZDogdHJ1ZSxcblx0XHRcdFx0dXY6IG51bGwsXG5cdFx0XHRcdG5vcm1hbHM6IG51bGwsXG5cdFx0XHR9LCAxKS5zZXRTY2FsZShzMik7XG5cblx0XHRcdGNvbnN0IG1jNCA9IE1hdGVyaWFsLkNvbG9yKG5ldyBGbG9hdDMyQXJyYXkoWzAsIDEsIDEsIDFdKSk7XG5cdFx0XHRtYzQucmVuZGVyTW9kZSA9IGdsLlBPSU5UUztcblx0XHRcdGdkLmN1dFBvaW50cyA9IG5ldyBNZXNoKCkuZnJvbSh0aGlzLCB7XG5cdFx0XHRcdG1hdGVyaWFsOiBtYzQsXG5cdFx0XHRcdGluZGV4OiBuZXcgVWludDE2QXJyYXkoaW5kaWNlc2N1dCksXG5cdFx0XHRcdHZlcnRpY2VzOiBuZXcgRmxvYXQzMkFycmF5KGRhdGEudmVydGljZXMpLFxuXHRcdFx0XHRjdWxsRGlzYWJsZWQ6IHRydWUsXG5cdFx0XHRcdHV2OiBudWxsLFxuXHRcdFx0XHRub3JtYWxzOiBudWxsLFxuXHRcdFx0fSwgMSkuc2V0U2NhbGUoczIpO1xuXHRcdH1cblx0XHQvKioqKiovXG5cblx0XHRpZiAodGhpcy5ub3JtYWxzKSB7XG5cdFx0XHQvLy8gbm9ybWFsc1xuXHRcdFx0Y29uc3Qgbm9ybWFsczogbnVtYmVyW10gPSBbXTtcblx0XHRcdGNvbnN0IGluZGljZXNub3JtYWxzOiBudW1iZXJbXSA9IFtdO1xuXHRcdFx0bGV0IGluZGV4bm9ybWFscyA9IDA7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuaW5kZXgubGVuZ3RoOyBpICs9IDMpIHtcblx0XHRcdFx0Y29uc3QgeDAgPSBkYXRhLnZlcnRpY2VzW2RhdGEuaW5kZXhbaSArIDFdICogM10gLSBkYXRhLnZlcnRpY2VzW2RhdGEuaW5kZXhbaV0gKiAzXTtcblx0XHRcdFx0Y29uc3QgeTAgPSBkYXRhLnZlcnRpY2VzW2RhdGEuaW5kZXhbaSArIDFdICogMyArIDFdIC0gZGF0YS52ZXJ0aWNlc1tkYXRhLmluZGV4W2ldICogMyArIDFdO1xuXHRcdFx0XHRjb25zdCB6MCA9IGRhdGEudmVydGljZXNbZGF0YS5pbmRleFtpICsgMV0gKiAzICsgMl0gLSBkYXRhLnZlcnRpY2VzW2RhdGEuaW5kZXhbaV0gKiAzICsgMl07XG5cblx0XHRcdFx0Y29uc3QgeDEgPSBkYXRhLnZlcnRpY2VzW2RhdGEuaW5kZXhbaSArIDJdICogM10gLSBkYXRhLnZlcnRpY2VzW2RhdGEuaW5kZXhbaV0gKiAzXTtcblx0XHRcdFx0Y29uc3QgeTEgPSBkYXRhLnZlcnRpY2VzW2RhdGEuaW5kZXhbaSArIDJdICogMyArIDFdIC0gZGF0YS52ZXJ0aWNlc1tkYXRhLmluZGV4W2ldICogMyArIDFdO1xuXHRcdFx0XHRjb25zdCB6MSA9IGRhdGEudmVydGljZXNbZGF0YS5pbmRleFtpICsgMl0gKiAzICsgMl0gLSBkYXRhLnZlcnRpY2VzW2RhdGEuaW5kZXhbaV0gKiAzICsgMl07XG5cblx0XHRcdFx0Y29uc3QgeCA9IHkwICogejEgLSB6MCAqIHkxO1xuXHRcdFx0XHRjb25zdCB5ID0gejAgKiB4MSAtIHgwICogejE7XG5cdFx0XHRcdGNvbnN0IHogPSB4MCAqIHkxIC0geTAgKiB4MTtcblxuXHRcdFx0XHRsZXQgbCA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xuXHRcdFx0XHRub3JtYWxzLnB1c2goeCAvIGwsIHkgLyBsLCB6IC8gbCk7XG5cdFx0XHRcdGNvbnN0IGYgPSAxLjE7XG5cdFx0XHRcdG5vcm1hbHMucHVzaCh4IC8gbCAqIGYsIHkgLyBsICogZiwgeiAvIGwgKiBmKTtcblxuXHRcdFx0XHRpbmRpY2Vzbm9ybWFscy5wdXNoKGluZGV4bm9ybWFscysrKTtcblx0XHRcdFx0aW5kaWNlc25vcm1hbHMucHVzaChpbmRleG5vcm1hbHMrKyk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IG1hdG5vcm1hbHMgPSBNYXRlcmlhbC5Db2xvcihuZXcgRmxvYXQzMkFycmF5KFsxLCAxLCAxLCAxXSkpO1xuXHRcdFx0bWF0bm9ybWFscy5yZW5kZXJNb2RlID0gZ2wuTElORVM7XG5cdFx0XHRnZC5ub3JtYWxzID0gbmV3IE1lc2goKS5mcm9tKHRoaXMsIHtcblx0XHRcdFx0bWF0ZXJpYWw6IG1hdG5vcm1hbHMsXG5cdFx0XHRcdGluZGV4OiBuZXcgVWludDE2QXJyYXkoaW5kaWNlc25vcm1hbHMpLFxuXHRcdFx0XHR2ZXJ0aWNlczogbmV3IEZsb2F0MzJBcnJheShub3JtYWxzKSxcblx0XHRcdFx0Y3VsbERpc2FibGVkOiB0cnVlLFxuXHRcdFx0XHR1djogbnVsbCxcblx0XHRcdFx0bm9ybWFsczogbnVsbCxcblx0XHRcdH0sIDEpLnNldFNjYWxlKHMxKTtcblx0XHR9XG5cdH1cblxuXHRyZXNpemUodzogbnVtYmVyLCBoOiBudW1iZXIsIGZvcmNlPzogYm9vbGVhbikge1xuXHRcdGlmIChmb3JjZSB8fCBQbGF0Zm9ybS5jYW52YXMud2lkdGghPT13IHx8IFBsYXRmb3JtLmNhbnZhcy5oZWlnaHQhPT1oKSB7XG5cdFx0XHRQbGF0Zm9ybS5jYW52YXMud2lkdGggPSB3O1xuXHRcdFx0UGxhdGZvcm0uY2FudmFzLmhlaWdodCA9IGg7XG5cdFx0XHR0aGlzLnJlbmRlclN1cmZhY2VTaXplKHcsIGgpO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlclN1cmZhY2VTaXplKHc6IG51bWJlciwgaDogbnVtYmVyKSB7XG5cdFx0dGhpcy5yZW5kZXJXaWR0aCA9IHc7XG5cdFx0dGhpcy5yZW5kZXJIZWlnaHQgPSBoO1xuXHRcdHRoaXMucGVyc3BlY3RpdmUgPSBNYXRyaXg0LnBlcnNwZWN0aXZlKHRoaXMucGVyc3BlY3RpdmUsIDcwICogTWF0aC5QSSAvIDE4MCwgdyAvIGgsIDEsIDIwMDApO1xuXHRcdHRoaXMuZ2wudmlld3BvcnQoMCwwLHcsaCk7XG5cdH1cblxuXHRnZXRTaGFkZXIoczogc3RyaW5nKSA6IFNoYWRlciB7XG5cdFx0cmV0dXJuIHRoaXMuc2hhZGVyW3NdO1xuXHR9XG5cblx0Z2V0VGV4dHVyZShzOiBzdHJpbmcpIDogVGV4dHVyZSB7XG5cdFx0cmV0dXJuIHRoaXMudGV4dHVyZVtzXTtcblx0fVxuXG5cdGFkZFRleHR1cmUobmFtZTogc3RyaW5nLCB0OiBUZXh0dXJlKSB7XG5cdFx0dGhpcy50ZXh0dXJlW25hbWVdID0gdDtcblx0fVxuXG5cdHByb2plY3Rpb25NYXRyaXgoKSA6IEZsb2F0MzJBcnJheSB7XG5cdFx0cmV0dXJuIHRoaXMucGVyc3BlY3RpdmU7XG5cdH1cblxuXHRjYW1lcmFNYXRyaXgoKSA6IEZsb2F0MzJBcnJheSB7XG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudENhbWVyYS5tYXRyaXg7XG5cdH1cblxuXHRjYW1lcmFQb3NpdGlvbigpIDogRmxvYXQzMkFycmF5IHtcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50Q2FtZXJhLnBvc2l0aW9uO1xuXHR9XG5cblx0dmlld01hdHJpeCgpIDogRmxvYXQzMkFycmF5IHtcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50Q2FtZXJhLnZpZXdNYXRyaXg7XG5cdH1cblxuXHRwcml2YXRlIGluaXRpYWxpemVHcmFwaGljcygpIHtcblx0XHR0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpO1xuXHRcdHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuQ1VMTF9GQUNFKTtcblx0XHR0aGlzLmdsLmNsZWFyQ29sb3IoMCwwLDAsMSk7XG5cdFx0dGhpcy5nbC5jbGVhckRlcHRoKDEuMCk7XG5cblx0XHR0aGlzLmdsLmN1bGxGYWNlKHRoaXMuZ2wuQkFDSyk7XG5cdFx0dGhpcy5nbC5mcm9udEZhY2UodGhpcy5nbC5DQ1cpO1xuXG5cdFx0dGhpcy5nbC5lbmFibGUodGhpcy5nbC5CTEVORCk7XG5cdFx0dGhpcy5nbC5ibGVuZEZ1bmModGhpcy5nbC5TUkNfQUxQSEEsIHRoaXMuZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG5cdH1cblxuXHRyZW5kZXIoZGVsdGE6IG51bWJlcikge1xuXG5cdFx0Ly8gY3ViZW1hcCBhbWJpZW50XG5cdFx0Ly8gdGhpcy5zdXJmYWNlW1wic3VyZmFjZTBcIl0uZW5hYmxlQXNUZXh0dXJlVGFyZ2V0KHRoaXMpO1xuXHRcdC8vIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUIHwgdGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUKTtcblx0XHQvL1xuXHRcdC8vIHRoaXMubWVzaFtcImN1YmUyXCJdLnJlbmRlcih0aGlzKTtcblx0XHQvLyB0aGlzLm1lc2hbXCJza3lib3hcIl0ucmVuZGVyKHRoaXMpO1xuXHRcdC8vXG5cdFx0Ly8gdGhpcy5zdXJmYWNlW1wic3VyZmFjZTBcIl0uZGlzYWJsZUFzVGV4dHVyZVRhcmdldCh0aGlzKTtcblxuXHRcdGNvbnN0IGdsID0gdGhpcy5nbDtcblxuXHRcdGdsLmRpc2FibGUoZ2wuQkxFTkQpO1xuXG5cdFx0dGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQgfCB0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQgfCB0aGlzLmdsLlNURU5DSUxfQlVGRkVSX0JJVCk7XG5cblx0XHR0aGlzLmN1cnJlbnRDYW1lcmEgPSB0aGlzLmNhbWVyYVtcImNhbWVyYTBcIl07XG5cdFx0dGhpcy5jdXJyZW50Q2FtZXJhLnN5bmMoKTtcblxuXHRcdHRoaXMudXBkYXRlSW5zdGFuY2luZ01hdHJpY2VzKCk7XG5cdFx0Ly8gdGhpcy5tZXNoW1wiY3ViZVwiXS5yZW5kZXJJbnN0YW5jZWQodGhpcywgdGhpcy5tYXRyaWNlcywgTipOKTtcblxuXHRcdGNvbnN0IGxpZ2h0ID0gdGhpcy5saWdodFsncG9pbnQnXSBhcyBQb2ludExpZ2h0O1xuXHRcdGxpZ2h0LnNldFBvc2l0aW9uKC0xMDAsNTAsNDApO1xuXG5cdFx0Y29uc3QgY2cgPSB0aGlzLmN1cnJlbnRHcmF0aWN1bGU7XG5cdFx0Y2cubWVzaC5ldWxlcih0aGlzLmV4eSwgdGhpcy5leHosIHRoaXMuZXl6KTtcblx0XHRjZy5vdXRsaW5lPy5ldWxlcih0aGlzLmV4eSwgdGhpcy5leHosIHRoaXMuZXl6KTtcblx0XHRjZy5ub3JtYWxzPy5ldWxlcih0aGlzLmV4eSwgdGhpcy5leHosIHRoaXMuZXl6KTtcblx0XHRjZy5jdXRMaW5lcz8uZXVsZXIodGhpcy5leHksIHRoaXMuZXh6LCB0aGlzLmV5eik7XG5cdFx0Y2cuY3V0UG9pbnRzPy5ldWxlcih0aGlzLmV4eSwgdGhpcy5leHosIHRoaXMuZXl6KTtcblx0XHRjZy5mb2xkTGluZXM/LmV1bGVyKHRoaXMuZXh5LCB0aGlzLmV4eiwgdGhpcy5leXopO1xuXHRcdGNnLmZvbGRQb2ludHM/LmV1bGVyKHRoaXMuZXh5LCB0aGlzLmV4eiwgdGhpcy5leXopO1xuXG5cdFx0Y2cubWVzaC5yZW5kZXIodGhpcyk7XG5cdFx0aWYgKHRoaXMub3V0bGluZSkge1xuXHRcdFx0Y2cub3V0bGluZT8ucmVuZGVyKHRoaXMpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5ub3JtYWxzKSB7XG5cdFx0XHRjZy5ub3JtYWxzPy5yZW5kZXIodGhpcyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmN1dHMpIHtcblx0XHRcdGNnLmN1dExpbmVzPy5yZW5kZXIodGhpcyk7XG5cdFx0XHRjZy5jdXRQb2ludHM/LnJlbmRlcih0aGlzKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZm9sZHMpIHtcblx0XHRcdGNnLmZvbGRMaW5lcz8ucmVuZGVyKHRoaXMpO1xuXHRcdFx0Y2cuZm9sZFBvaW50cz8ucmVuZGVyKHRoaXMpO1xuXHRcdH1cblxuXHRcdC8vIGNvbnN0IG1vb24gPSB0aGlzLm1lc2hbXCJtb29uXCJdO1xuXHRcdC8vIChtb29uIGFzIE1lc2gpLmV1bGVyKDAsICh0aGlzLnRpbWUlMjUwMDApLzI1MDAwKjIqTWF0aC5QSSwgMCApO1xuXHRcdC8vIG1vb24ucmVuZGVyKHRoaXMpO1xuXG5cblx0XHQvLyBsaWdodC5zZXRQb3NpdGlvbihcblx0XHQvLyBcdDI1Kk1hdGguY29zKCh0aGlzLnRpbWUlMTUwMDApLzE1MDAwKjIqTWF0aC5QSSksXG5cdFx0Ly8gXHQ1LFxuXHRcdC8vIFx0MjUqTWF0aC5zaW4oKHRoaXMudGltZSUxNTAwMCkvMTUwMDAqMipNYXRoLlBJKSk7XG5cblx0XHQodGhpcy5tZXNoW1wibGlnaHRwcm9iZVwiXSBhcyBNZXNoKS5zZXRQb3NpdGlvblYobGlnaHQuZ2V0UG9zaXRpb24oKSk7XG5cdFx0KHRoaXMubWVzaFtcImxpZ2h0cHJvYmVcIl0gYXMgTWVzaCkuc2V0U2NhbGUoMyk7XG5cdFx0KHRoaXMubWVzaFtcImxpZ2h0cHJvYmVcIl0gYXMgTWVzaCkuZ2V0TWF0ZXJpYWwoKS5kZWZpbml0aW9uLmNvbG9yLnNldChsaWdodC5nZXREaWZmdXNlKCkpO1xuXHRcdGNvbnN0IGxwID0gdGhpcy5tZXNoW1wibGlnaHRwcm9iZVwiXTtcblx0XHRscC5yZW5kZXIodGhpcyk7XG5cblx0XHR0aGlzLm1lc2hbXCJza3lib3hcIl0ucmVuZGVyKHRoaXMpO1xuXHRcdC8vIGNvbnN0IHAgPSBsaWdodC5nZXRQb3NpdGlvbigpO1xuXHRcdC8vIHRoaXMuY3VycmVudENhbWVyYS5sb29rQXQocFswXSwgLXBbMV0sIHBbMl0pO1xuXG5cblx0XHQvLyBjb25zdCBhbmdsZSA9ICgoRGF0ZS5ub3coKSAlIDMwMDAwKSAvIDMwMDAwKSoyKk1hdGguUEk7XG5cdFx0Ly8gY29uc3QgYW5nbGUyID0gKChEYXRlLm5vdygpICUgNDAwMDApIC8gNDAwMDApKjIqTWF0aC5QSTtcblx0XHQvLyBjb25zdCByID0gMTA7XG5cdFx0Ly8gVmVjdG9yMy5zZXQodGhpcy5jdXJyZW50Q2FtZXJhLnBvc2l0aW9uLFxuXHRcdC8vIFx0MCxNYXRoLnNpbihhbmdsZSkqMy41ICsgNSwwKTtcblx0XHQvLyB0aGlzLmN1cnJlbnRDYW1lcmEubG9va0F0KFxuXHRcdC8vIFx0cipNYXRoLmNvcyhhbmdsZSksTWF0aC5zaW4oYW5nbGUyKSozLjUgKyA1LHIqTWF0aC5zaW4oYW5nbGUpXHRcdC8vIGZyb21cblx0XHQvLyApO1xuXHRcdC8vIHRoaXMuY3VycmVudENhbWVyYS5zeW5jKCk7XG5cblx0XHR0aGlzLnRpbWUgKz0gZGVsdGE7XG5cdH1cblxuXHRwcml2YXRlIHVwZGF0ZUluc3RhbmNpbmdNYXRyaWNlcygpIHtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgTiAqIE47IGkrKykge1xuXHRcdFx0Y29uc3Qgcm93ID0gKGkgLyBOKSB8IDA7XG5cdFx0XHRjb25zdCBjb2wgPSBpICUgTjtcblxuXHRcdFx0Y29uc3QgdHQgPSAxNTAwMDtcblx0XHRcdGNvbnN0IHQgPSAoKHRoaXMudGltZSAlIHR0KSkgLyAodHQgLyAyKSAqIE1hdGguUEk7XG5cdFx0XHRWZWN0b3IzLnNldCh0aGlzLnBvc2l0aW9uLFxuXHRcdFx0XHQoY29sIC0gKChOIC0gMSkgLyAyKSkgKiAzLFxuXHRcdFx0XHQyMCAqIE1hdGguc2luKDIgKiBNYXRoLlBJIC8gTiAqIGNvbCArIHQpICogTWF0aC5jb3MoMiAqIE1hdGguUEkgLyBOICogcm93ICsgdCksXG5cdFx0XHRcdChOLzIgLXJvdykgKiAzKTtcblx0XHRcdFZlY3RvcjMuc2V0KHRoaXMucm90YXRpb24sIHQsIDIqKHQraSkqKGklMj8xOi0xKSwgMCk7XG5cdFx0XHQvLyBWZWN0b3IzLnNldCh0aGlzLnJvdGF0aW9uLCBNYXRoLnJhbmRvbSgpKjIqTWF0aC5QSSwgMCwgTWF0aC5yYW5kb20oKSoyKk1hdGguUEkpO1xuXHRcdFx0Ly8gVmVjdG9yMy5zZXQodGhpcy5wb3NpdGlvbiwgKGNvbCAtICgoTiAtIDEpIC8gMikpICogMywgMCwgKHJvdyAtICgoTi0xKS8yKSkgKiAzKTtcblx0XHRcdFZlY3RvcjMuc2V0KHRoaXMuc2NhbGUsIDIsIDIsIDIpO1xuXHRcdFx0dGhpcy5tYXRyaWNlcy5zZXQoXG5cdFx0XHRcdE1hdHJpeDQubW9kZWxNYXRyaXgoXG5cdFx0XHRcdFx0dGhpcy5tYXRyaXgsXG5cdFx0XHRcdFx0dGhpcy5wb3NpdGlvbixcblx0XHRcdFx0XHR0aGlzLnJvdGF0aW9uLFxuXHRcdFx0XHRcdHRoaXMuc2NhbGUpLFxuXHRcdFx0XHRpICogMTYpO1xuXHRcdH1cblx0fVxuXG5cdG1vdXNlRXZlbnQocGl4ZWxzSW5jcmVtZW50WDogbnVtYmVyLHBpeGVsc0luY3JlbWVudFk6IG51bWJlcikge1xuXHRcdHRoaXMuY2FtZXJhW1wiY2FtZXJhMFwiXS5hbmdsZXNGcm9tKHBpeGVsc0luY3JlbWVudFgscGl4ZWxzSW5jcmVtZW50WSk7XG5cdFx0dGhpcy5jYW1lcmFbXCJjYW1lcmEwXCJdLnN5bmMoKTtcblx0fVxuXG5cdHVwZGF0ZVVuZm9sZGluZ091dGxpbmUoZGF0YTogR2VvbWV0cnlJbmZvSW5kZXhlZCkge1xuXHRcdHRoaXMuY3VycmVudEdyYXRpY3VsZT8ub3V0bGluZT8ucmVtZXNoKHRoaXMsIGRhdGEudmVydGljZXMsIGRhdGEudXYpO1xuXHR9XG5cblx0YnVpbGRVbmZvbGRpbmdPdXRsaW5lKGRhdGE6IEdlb21ldHJ5SW5mb0luZGV4ZWQpOiBNZXNoIHtcblxuXHRcdGNvbnN0IGdsID0gdGhpcy5nbDtcblx0XHRjb25zdCBpbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xuXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGRhdGEuaW5kZXgubGVuZ3RoOyBpKz0zKSB7XG5cdFx0XHRpbmRpY2VzLnB1c2goZGF0YS5pbmRleFtpXSwgZGF0YS5pbmRleFtpICsgMV0pO1xuXHRcdFx0aW5kaWNlcy5wdXNoKGRhdGEuaW5kZXhbaSArIDFdLCBkYXRhLmluZGV4W2kgKyAyXSk7XG5cdFx0XHRpbmRpY2VzLnB1c2goZGF0YS5pbmRleFtpICsgMl0sIGRhdGEuaW5kZXhbaV0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1jID0gTWF0ZXJpYWwuQ29sb3IobmV3IEZsb2F0MzJBcnJheShbMSwgMSwgMSwgMV0pKTtcblx0XHRtYy5yZW5kZXJNb2RlID0gZ2wuTElORVM7XG5cdFx0cmV0dXJuIG5ldyBNZXNoKCkuZnJvbSh0aGlzLCB7XG5cdFx0XHRtYXRlcmlhbDogbWMsXG5cdFx0XHRpbmRleDogbmV3IFVpbnQxNkFycmF5KGluZGljZXMpLFxuXHRcdFx0dmVydGljZXM6IGRhdGEudmVydGljZXMsXG5cdFx0XHRjdWxsRGlzYWJsZWQ6IHRydWUsXG5cdFx0XHR1djogbnVsbCxcblx0XHRcdG5vcm1hbHM6IG51bGwsXG5cdFx0fSwgMSkuc2V0U2NhbGUoMzAuMik7XG5cdH1cblxuXHRsb25naXR1ZGUgPSAwO1xuXHRsYXRpdHVkZSA9IDA7XG5cdHN0YXJ0ID0gMDtcblx0a2V5Ym9hcmRFdmVudChrZXk6IHN0cmluZywgZG93bjogYm9vbGVhbikge1xuXG5cdFx0Y29uc3QgYyA9IHRoaXMuY2FtZXJhW1wiY2FtZXJhMFwiXTtcblx0XHRzd2l0Y2goa2V5KSB7XG5cdFx0XHRjYXNlICd3Jzpcblx0XHRcdFx0Yy5hZHZhbmNlQW1vdW50ID0gZG93biA/IDEgOiAwO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3MnOlxuXHRcdFx0XHRjLmFkdmFuY2VBbW91bnQgPSBkb3duID8gLTEgOiAwO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2EnOlxuXHRcdFx0XHRjLnN0cmFmZUFtb3VudCA9IGRvd24gPyAtMSA6IDA7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnZCc6XG5cdFx0XHRcdGMuc3RyYWZlQW1vdW50ID0gZG93biA/IDEgOiAwO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3EnOlxuXHRcdFx0XHRjLnVwQW1vdW50ID0gZG93biA/IC0xIDogMDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICd6Jzpcblx0XHRcdFx0Yy51cEFtb3VudCA9IGRvd24gPyAxIDogMDtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ2onOlxuXHRcdFx0XHR0aGlzLmV4eiArPSBNYXRoLlBJLzkwO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2wnOlxuXHRcdFx0XHR0aGlzLmV4eiAtPSBNYXRoLlBJLzkwO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ28nOlxuXHRcdFx0XHR0aGlzLmV4eSAtPSBNYXRoLlBJLzkwO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2snOlxuXHRcdFx0XHR0aGlzLmV4eSArPSBNYXRoLlBJLzkwO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2knOlxuXHRcdFx0XHR0aGlzLmV5eiAtPSBNYXRoLlBJLzkwO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3AnOlxuXHRcdFx0XHR0aGlzLmV5eiArPSBNYXRoLlBJLzkwO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnMSc6XG5cdFx0XHRcdHRoaXMuYWN0aW9uKys7XG5cdFx0XHRcdHRoaXMudW5mb2xkU2NhbGUgKz0gMTtcblx0XHRcdFx0aWYgKHRoaXMudW5mb2xkU2NhbGUgPiA5MCkge1xuXHRcdFx0XHRcdHRoaXMudW5mb2xkU2NhbGUgPSA5MDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLnVuZm9sZEltcGwoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJzInOlxuXHRcdFx0XHR0aGlzLmFjdGlvbisrO1xuXHRcdFx0XHR0aGlzLnVuZm9sZFNjYWxlIC09IDE7XG5cdFx0XHRcdGlmICh0aGlzLnVuZm9sZFNjYWxlIDwgMCkge1xuXHRcdFx0XHRcdHRoaXMudW5mb2xkU2NhbGUgPSAwO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMudW5mb2xkSW1wbCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICcwJzpcblx0XHRcdFx0aWYgKCFkb3duKSB7XG5cdFx0XHRcdFx0dGhpcy5ub3JtYWxzID0gIXRoaXMubm9ybWFscztcblx0XHRcdFx0XHR0aGlzLmZvbGRzQ3V0c0luZm8oKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJzgnOlxuXHRcdFx0XHRpZiAoIWRvd24pIHtcblx0XHRcdFx0XHR0aGlzLmZvbGRzID0gIXRoaXMuZm9sZHM7XG5cdFx0XHRcdFx0dGhpcy5mb2xkc0N1dHNJbmZvKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICc5Jzpcblx0XHRcdFx0aWYgKCFkb3duKSB7XG5cdFx0XHRcdFx0dGhpcy5jdXRzID0gIXRoaXMuY3V0cztcblx0XHRcdFx0XHR0aGlzLmZvbGRzQ3V0c0luZm8oKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnMyc6XG5cdFx0XHRcdGlmICghZG93bikge1xuXHRcdFx0XHRcdHRoaXMub3V0bGluZSA9ICF0aGlzLm91dGxpbmU7XG5cdFx0XHRcdFx0dGhpcy5mb2xkc0N1dHNJbmZvKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJzQnOlxuXHRcdFx0XHQvLyBpZiAoIWRvd24pIHtcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5sb25naXR1ZGUrKztcblx0XHRcdFx0dGhpcy5teXJpYWhlZHJhbC51diA9IHRoaXMubXlyaWFoZWRyYWwuY2FsY3VsYXRlVVYodGhpcy5sb25naXR1ZGUgLyAxODAgKiBNYXRoLlBJLCB0aGlzLmxhdGl0dWRlLzE4MCpNYXRoLlBJKTtcblx0XHRcdFx0Y29uc3QgZGF0YSA9IHRoaXMubXlyaWFoZWRyYWwuZ2V0TWVzaERhdGEoKTtcblx0XHRcdFx0dGhpcy5jdXJyZW50R3JhdGljdWxlPy5tZXNoLnJlbWVzaCh0aGlzLCBkYXRhLnZlcnRpY2VzLCBkYXRhLnV2KTtcblx0XHRcdH1cblx0XHRcdFx0Ly8gfVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJzUnOlxuXHRcdFx0XHQvLyBpZiAoIWRvd24pIHtcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5sYXRpdHVkZSsrO1xuXHRcdFx0XHR0aGlzLm15cmlhaGVkcmFsLnV2ID0gdGhpcy5teXJpYWhlZHJhbC5jYWxjdWxhdGVVVih0aGlzLmxvbmdpdHVkZSAvIDE4MCAqIE1hdGguUEksIHRoaXMubGF0aXR1ZGUvMTgwKk1hdGguUEkpO1xuXHRcdFx0XHRjb25zdCBkYXRhID0gdGhpcy5teXJpYWhlZHJhbC5nZXRNZXNoRGF0YSgpO1xuXHRcdFx0XHR0aGlzLmN1cnJlbnRHcmF0aWN1bGU/Lm1lc2gucmVtZXNoKHRoaXMsIGRhdGEudmVydGljZXMsIGRhdGEudXYpO1xuXHRcdFx0fVxuXHRcdFx0XHQvLyB9XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdmJzpcblx0XHRcdFx0aWYgKCFkb3duKSB7XG5cdFx0XHRcdFx0dGhpcy5hY3Rpb24rKztcblx0XHRcdFx0XHR0aGlzLmZvbGQoKCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ2ZvbGRlZCcpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAndSc6XG5cdFx0XHRcdGlmICghZG93bikge1xuXHRcdFx0XHRcdHRoaXMuYWN0aW9uKys7XG5cdFx0XHRcdFx0dGhpcy51bmZvbGQoKCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ3VuZm9sZGVkJyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdnJzpcblx0XHRcdFx0dGhpcy5hY3Rpb24rKztcblx0XHRcdFx0aWYgKCFkb3duKSB7XG5cdFx0XHRcdFx0dGhpcy5uZXh0R3JhdGljdWxlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBncmF0aWN1bGVzOiBHcmF0aWN1bGVEYXRhW10gPSBbXTtcblx0cHJpdmF0ZSBjdXJyZW50R3JhdGljdWxlSW5kZXggPSAtMTtcblx0cHJpdmF0ZSBjdXJyZW50R3JhdGljdWxlOiBHcmF0aWN1bGVEYXRhO1xuXG5cdHByaXZhdGUgYnVpbGRHcmF0aWN1bGVzKCkge1xuXG5cdFx0dGhpcy5idWlsZE1lbnVIZWFkZXIoJ0dyYXRpY3VsZXMnKTtcblxuXHRcdEdyYXRpY3VsZXMuZm9yRWFjaChwID0+IHtcblx0XHRcdHRoaXMuYnVpbGRHcmF0aWN1bGUocCk7XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIGJ1aWxkR3JhdGljdWxlKHA6IEdyYXRpY3VsZVBhcmFtcykge1xuXG5cdFx0Y29uc3QgbXlyaWFoZWRyYWwgPSBuZXcgTXlyaWFoZWRyYWwoKS5ncmF0aWN1bGUocCk7XG5cdFx0Y29uc3QgZGF0YSA9IG15cmlhaGVkcmFsLmdldE1lc2hEYXRhKCk7XG5cblx0XHRjb25zdCBvdXRsaW5lID0gdGhpcy5idWlsZFVuZm9sZGluZ091dGxpbmUoZGF0YSk7XG5cdFx0Y29uc3QgbWVzaCA9IG5ldyBNZXNoKCkuZnJvbSh0aGlzLCB7XG5cdFx0XHQuLi5kYXRhLFxuXHRcdFx0bWF0ZXJpYWw6IE1hdGVyaWFsLlRleHR1cmVOb0xpZ2h0KHRoaXMuZ2V0VGV4dHVyZShcImVhcnRoXCIpLCAuNiksXG5cdFx0XHRjdWxsRGlzYWJsZWQ6IHRydWUsXG5cblx0XHR9LCAxKS5zZXRTY2FsZSgzMCk7XG5cblx0XHRjb25zdCBnciA9IHtcblx0XHRcdG1lc2gsXG5cdFx0XHRteXJpYWhlZHJhbCxcblx0XHRcdG91dGxpbmUsXG5cdFx0fTtcblxuXHRcdHRoaXMuYnVpbGRGb2xkc0N1dHNMaW5lcyhkYXRhLDMwLCAzMC41LCBncik7XG5cdFx0dGhpcy5idWlsZE1lbnVFbnRyeShwLm5hbWUsIHRoaXMuZ3JhdGljdWxlcy5sZW5ndGgpO1xuXG5cdFx0dGhpcy5ncmF0aWN1bGVzLnB1c2goZ3IpO1xuXHR9XG5cblx0cHJpdmF0ZSBidWlsZE1lbnVFbnRyeSh0aXRsZVRleHQ6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xuXHRcdGNvbnN0IG1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbnVcIik7XG5cdFx0Y29uc3QgbWVudUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHR0aXRsZS5pbm5lclRleHQgPSB0aXRsZVRleHQ7XG5cblx0XHR0aXRsZS5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cdFx0dGl0bGUuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuXHRcdHRpdGxlLnN0eWxlLmZvbnRTaXplID0gJzAuOWVtJztcblx0XHR0aXRsZS5zdHlsZS5wYWRkaW5nTGVmdCA9ICcxNXB4JztcblxuXHRcdHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0dGhpcy5zZWxlY3RHcmF0aWN1bGUoaW5kZXgpO1xuXHRcdH0pO1xuXG5cdFx0bWVudUl0ZW0uYXBwZW5kQ2hpbGQodGl0bGUpO1xuXHRcdG1lbnUuYXBwZW5kQ2hpbGQobWVudUl0ZW0pO1xuXHR9XG5cblx0cHJpdmF0ZSBidWlsZE1lbnVIZWFkZXIodGl0bGVUZXh0OiBzdHJpbmcpIHtcblx0XHRjb25zdCBtZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW51XCIpO1xuXHRcdGNvbnN0IG1lbnVJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRjb25zdCBicjAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpO1xuXHRcdGNvbnN0IGJyMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJyk7XG5cdFx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0dGl0bGUuaW5uZXJIVE1MID0gYCR7dGl0bGVUZXh0fWA7XG5cblx0XHR0aXRsZS5zdHlsZS5mb250U2l6ZSA9ICcxLjFlbSc7XG5cdFx0dGl0bGUuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuXG5cdFx0bWVudUl0ZW0uYXBwZW5kQ2hpbGQoYnIwKTtcblx0XHRtZW51SXRlbS5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cdFx0bWVudUl0ZW0uYXBwZW5kQ2hpbGQoYnIxKTtcblx0XHRtZW51LmFwcGVuZENoaWxkKG1lbnVJdGVtKTtcblx0fVxuXG5cdHByaXZhdGUgYnVpbGRNeXJpYWhlZHJvbnMoKSB7XG5cblx0XHR0aGlzLmJ1aWxkTWVudUhlYWRlcignU29saWRzJyk7XG5cblx0XHRjb25zdCBzb2xpZHM6IFtzdHJpbmcsIE15cmlhaGVkcm9uR2VvbWV0cnldW10gPSBbXG5cdFx0XHRbJ1RldHJhaGVkcm9uJywgVGV0cmFoZWRyb25HZW9tZXRyeV0sXG5cdFx0XHRbJ0N1YmUnLCBDdWJlR2VvbWV0cnldLFxuXHRcdFx0WydPY3RhaGVkcm9uJywgT2N0YWhlZHJvbkdlb21ldHJ5XSxcblx0XHRcdFsnSWNvc2FoZWRyb24nLCBJY29zYWhlZHJvbkdlb21ldHJ5XVxuXHRcdF07XG5cblx0XHRzb2xpZHMuZm9yRWFjaCggZyA9PiB7XG5cdFx0XHR0aGlzLmJ1aWxkTXlyaWFoZWRyb24oZyk7XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIGJ1aWxkTXlyaWFoZWRyb24oZ2VvbWV0cnk6IFtzdHJpbmcsIE15cmlhaGVkcm9uR2VvbWV0cnldKSB7XG5cblx0XHR0aGlzLmJ1aWxkTWVudUVudHJ5KGdlb21ldHJ5WzBdLCB0aGlzLmdyYXRpY3VsZXMubGVuZ3RoKTtcblxuXHRcdGNvbnN0IG15cmlhaGVkcmFsID0gbmV3IE15cmlhaGVkcmFsKCkubXlyaWFoZWRyb24oe1xuXHRcdFx0bmFtZTogZ2VvbWV0cnlbMV0ubmFtZSxcblx0XHRcdGdlb21ldHJ5OiBnZW9tZXRyeVsxXSxcblx0XHRcdHN1YmRpdmlzaW9uczogNSxcblx0XHRcdHVuZm9sZDogdHJ1ZSxcblx0XHRcdG5vcm1hbGl6ZTogdHJ1ZSxcblx0XHR9KTtcblxuXHRcdGNvbnN0IGRhdGExID0gbXlyaWFoZWRyYWwuZ2V0TWVzaERhdGEoKTtcblx0XHRjb25zdCBvdXRsaW5lID0gdGhpcy5idWlsZFVuZm9sZGluZ091dGxpbmUoZGF0YTEpO1xuXHRcdGNvbnN0IG1lc2ggPSBuZXcgTWVzaCgpLmZyb20odGhpcywge1xuXHRcdFx0Li4uZGF0YTEsXG5cdFx0XHRtYXRlcmlhbDogTWF0ZXJpYWwuVGV4dHVyZU5vTGlnaHQodGhpcy5nZXRUZXh0dXJlKFwiZWFydGhcIiksIC42KSxcblx0XHRcdGN1bGxEaXNhYmxlZDogdHJ1ZSxcblx0XHR9LCAxKTtcblxuXHRcdG1lc2guc2V0U2NhbGUoMzApO1xuXHRcdHRoaXMuZ3JhdGljdWxlcy5wdXNoKHtcblx0XHRcdG1lc2gsXG5cdFx0XHRteXJpYWhlZHJhbCxcblx0XHRcdG91dGxpbmUsXG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIG5leHRHcmF0aWN1bGUoKSB7XG5cdFx0dGhpcy5zZWxlY3RHcmF0aWN1bGUodGhpcy5jdXJyZW50R3JhdGljdWxlSW5kZXgrMSk7XG5cdH1cblxuXHRwcml2YXRlIHNlbGVjdEdyYXRpY3VsZShpOiBudW1iZXIpIHtcblx0XHRpZiAoaSE9PXRoaXMuY3VycmVudEdyYXRpY3VsZUluZGV4KSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRHcmF0aWN1bGVJbmRleCA9IGk7XG5cdFx0XHR0aGlzLmZvbGQoKCkgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGdyYXRpY3VsZSA9IHRoaXMuZ3JhdGljdWxlc1t0aGlzLmN1cnJlbnRHcmF0aWN1bGVJbmRleF07XG5cdFx0XHRcdHRoaXMuY3VycmVudEdyYXRpY3VsZSA9IGdyYXRpY3VsZTtcblxuXHRcdFx0XHR0aGlzLm15cmlhaGVkcmFsID0gZ3JhdGljdWxlLm15cmlhaGVkcmFsO1xuXG5cdFx0XHRcdHRoaXMudW5mb2xkKCgpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygndW5mb2xkZWQnKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pO1xuXG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSB1bmZvbGQob25VbmZvbGRGaW5pc2hlZDogKCkgPT4gdm9pZCkge1xuXHRcdGlmICh0aGlzLm15cmlhaGVkcmFsICYmIHRoaXMudW5mb2xkU2NhbGU8TWF4VW5mb2xkU2NhbGUpIHtcblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVuZm9sZEFuaW1hdGlvbi5iaW5kKHRoaXMsIG9uVW5mb2xkRmluaXNoZWQsIHRoaXMuYWN0aW9uKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG9uVW5mb2xkRmluaXNoZWQoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHVuZm9sZEFuaW1hdGlvbihvblVuZm9sZEZpbmlzaGVkOiAoKSA9PiB2b2lkLCBnaTogbnVtYmVyKSB7XG5cdFx0aWYgKGdpPT09dGhpcy5hY3Rpb24pIHtcblx0XHRcdHRoaXMudW5mb2xkU2NhbGUrKztcblx0XHRcdHRoaXMudW5mb2xkSW1wbCgpO1xuXHRcdFx0aWYgKHRoaXMudW5mb2xkU2NhbGUgPCBNYXhVbmZvbGRTY2FsZSkge1xuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51bmZvbGRBbmltYXRpb24uYmluZCh0aGlzLCBvblVuZm9sZEZpbmlzaGVkLCBnaSkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b25VbmZvbGRGaW5pc2hlZCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgZm9sZChvbkZvbGRGaW5pc2hlZDogKCkgPT4gdm9pZCkge1xuXHRcdGlmICh0aGlzLm15cmlhaGVkcmFsICYmIHRoaXMudW5mb2xkU2NhbGU+MCkge1xuXHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZm9sZEFuaW1hdGlvbi5iaW5kKHRoaXMsIG9uRm9sZEZpbmlzaGVkLCB0aGlzLmFjdGlvbikpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUob25Gb2xkRmluaXNoZWQpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgZm9sZEFuaW1hdGlvbihvbkZvbGRGaW5pc2hlZDogKCkgPT4gdm9pZCwgZ2k6IG51bWJlcikge1xuXHRcdGlmICh0aGlzLmFjdGlvbj09PWdpKSB7XG5cdFx0XHR0aGlzLnVuZm9sZFNjYWxlLS07XG5cdFx0XHR0aGlzLnVuZm9sZEltcGwoKTtcblx0XHRcdGlmICh0aGlzLnVuZm9sZFNjYWxlID4gMCkge1xuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5mb2xkQW5pbWF0aW9uLmJpbmQodGhpcywgb25Gb2xkRmluaXNoZWQsIGdpKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUob25Gb2xkRmluaXNoZWQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgdW5mb2xkSW1wbCgpIHtcblx0XHR0aGlzLm15cmlhaGVkcmFsLnVuZm9sZCh0aGlzLnVuZm9sZFNjYWxlL01heFVuZm9sZFNjYWxlKTtcblx0XHRjb25zdCBkYXRhID0gdGhpcy5teXJpYWhlZHJhbC5nZXRNZXNoRGF0YSgpO1xuXHRcdHRoaXMuY3VycmVudEdyYXRpY3VsZT8ubWVzaC5yZW1lc2godGhpcywgZGF0YS52ZXJ0aWNlcywgZGF0YS51dik7XG5cblx0XHR0aGlzLmZvbGRzQ3V0c0luZm8oKTtcblx0fVxuXG5cdHByaXZhdGUgZm9sZHNDdXRzSW5mbyhkYXRhPzogR2VvbWV0cnlJbmZvSW5kZXhlZCkge1xuXHRcdGRhdGEgPSBkYXRhID8/IHRoaXMuY3VycmVudEdyYXRpY3VsZT8ubXlyaWFoZWRyYWwuZ2V0TWVzaERhdGEoKTtcblx0XHR0aGlzLmJ1aWxkRm9sZHNDdXRzTGluZXMoZGF0YSwzMCwgMzAuNSwgdGhpcy5jdXJyZW50R3JhdGljdWxlKTtcblx0XHRpZih0aGlzLm91dGxpbmUpIHtcblx0XHRcdHRoaXMudXBkYXRlVW5mb2xkaW5nT3V0bGluZShkYXRhKTtcblx0XHR9XG5cdH1cbn0iLCJcbmV4cG9ydCBlbnVtIExpZ2h0VHlwZSB7XG5cdERJUkVDVElPTkFMLFxuXHRQT0lOVCxcblx0U1BPVFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIExpZ2h0RGVmaW5pdGlvbkJhc2Uge1xuXHRhbWJpZW50OiBudW1iZXJbXTtcdFx0Ly8gdmVjM1xuXHRkaWZmdXNlOiBudW1iZXJbXTtcdFx0Ly8gdmVjM1xuXHRzcGVjdWxhcjogbnVtYmVyW107XHRcdC8vIHZlYzNcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaXJlY3Rpb25hbExpZ2h0RGVmIGV4dGVuZHMgTGlnaHREZWZpbml0aW9uQmFzZSB7XG5cdGRpcmVjdGlvbj86IG51bWJlcltdO1x0Ly8gdmVjM1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBvaW50TGlnaHREZWYgZXh0ZW5kcyBMaWdodERlZmluaXRpb25CYXNlIHtcblx0cG9zaXRpb24/OiBudW1iZXJbXTtcdC8vIHZlYzNcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTcG90TGlnaHREZWYgZXh0ZW5kcyBMaWdodERlZmluaXRpb25CYXNlIHtcblxufVxuXG5leHBvcnQgdHlwZSBMaWdodEluaXRpYWxpemVyID0gRGlyZWN0aW9uYWxMaWdodERlZiB8IFBvaW50TGlnaHREZWYgfCBTcG90TGlnaHREZWY7XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIExpZ2h0IHtcblxuXHRyZWFkb25seSB0eXBlOiBMaWdodFR5cGU7XG5cblx0cmVhZG9ubHkgYW1iaWVudDogRmxvYXQzMkFycmF5O1xuXHRyZWFkb25seSBkaWZmdXNlOiBGbG9hdDMyQXJyYXk7XG5cdHJlYWRvbmx5IHNwZWN1bGFyOiBGbG9hdDMyQXJyYXk7XG5cblx0ZW5hYmxlZCA9IGZhbHNlO1xuXG5cdHByb3RlY3RlZCBjb25zdHJ1Y3Rvcih0eXBlOiBMaWdodFR5cGUsIGxpOiBMaWdodERlZmluaXRpb25CYXNlKSB7XG5cdFx0dGhpcy50eXBlID0gdHlwZTtcblxuXHRcdHRoaXMuYW1iaWVudCA9IG5ldyBGbG9hdDMyQXJyYXkobGkuYW1iaWVudCk7XG5cdFx0dGhpcy5kaWZmdXNlID0gbmV3IEZsb2F0MzJBcnJheShsaS5kaWZmdXNlKTtcblx0XHR0aGlzLnNwZWN1bGFyID0gbmV3IEZsb2F0MzJBcnJheShsaS5zcGVjdWxhcik7XG5cdH1cblxuXHRnZXRBbWJpZW50KCkgOiBGbG9hdDMyQXJyYXkge1xuXHRcdHJldHVybiB0aGlzLmFtYmllbnQ7XG5cdH1cblxuXHRnZXREaWZmdXNlKCkgOiBGbG9hdDMyQXJyYXkge1xuXHRcdHJldHVybiB0aGlzLmRpZmZ1c2U7XG5cdH1cblxuXHRnZXRTcGVjdWxhcigpIDogRmxvYXQzMkFycmF5IHtcblx0XHRyZXR1cm4gdGhpcy5zcGVjdWxhcjtcblx0fVxuXG5cdHNldEFtYmllbnQoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xuXHRcdHRoaXMuc2V0KHRoaXMuYW1iaWVudCwgeCwgeSwgeik7XG5cdH1cblxuXHRzZXREaWZmdXNlKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcblx0XHR0aGlzLnNldCh0aGlzLmRpZmZ1c2UsIHgsIHksIHopO1xuXHR9XG5cblx0c2V0U3BlY3VsYXIoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xuXHRcdHRoaXMuc2V0KHRoaXMuc3BlY3VsYXIsIHgsIHksIHopO1xuXHR9XG5cblx0cHJvdGVjdGVkIHNldCh2OiBGbG9hdDMyQXJyYXksIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcblx0XHR2WzBdID0geDtcblx0XHR2WzFdID0geTtcblx0XHR2WzJdID0gejtcblx0fVxuXG5cdHNldEVuYWJsZWQoZTogYm9vbGVhbikge1xuXHRcdHRoaXMuZW5hYmxlZCA9IGU7XG5cdH1cblxuXHRzdGF0aWMgRGlyZWN0aW9uYWwoZGVmOiBEaXJlY3Rpb25hbExpZ2h0RGVmKSA6IExpZ2h0IHtcblx0XHRyZXR1cm4gbmV3IERpcmVjdGlvbmFsTGlnaHQoZGVmKTtcblx0fVxuXG5cdHN0YXRpYyBQb2ludChkZWY6IFBvaW50TGlnaHREZWYpIDogTGlnaHQge1xuXHRcdHJldHVybiBuZXcgUG9pbnRMaWdodChkZWYpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBEaXJlY3Rpb25hbExpZ2h0IGV4dGVuZHMgTGlnaHQge1xuXG5cdHJlYWRvbmx5IGRpcmVjdGlvbjogRmxvYXQzMkFycmF5O1xuXG5cdGNvbnN0cnVjdG9yKGxpOiBEaXJlY3Rpb25hbExpZ2h0RGVmKSB7XG5cdFx0c3VwZXIoTGlnaHRUeXBlLkRJUkVDVElPTkFMLCBsaSk7XG5cdFx0dGhpcy5kaXJlY3Rpb24gPSBuZXcgRmxvYXQzMkFycmF5KGxpLmRpcmVjdGlvbik7XG5cdH1cblxuXHRnZXREaXJlY3Rpb24oKSA6IEZsb2F0MzJBcnJheSB7XG5cdFx0cmV0dXJuIHRoaXMuZGlyZWN0aW9uO1xuXHR9XG5cblx0c2V0RGlyZWN0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcblx0XHR0aGlzLnNldCggdGhpcy5kaXJlY3Rpb24sIHgsIHksIHopO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBQb2ludExpZ2h0IGV4dGVuZHMgTGlnaHQge1xuXG5cdHJlYWRvbmx5IHBvc2l0aW9uOiBGbG9hdDMyQXJyYXk7XG5cblx0Y29uc3RydWN0b3IobGk6IFBvaW50TGlnaHREZWYpIHtcblx0XHRzdXBlcihMaWdodFR5cGUuUE9JTlQsIGxpKTtcblx0XHR0aGlzLnBvc2l0aW9uID0gbmV3IEZsb2F0MzJBcnJheShsaS5wb3NpdGlvbik7XG5cdH1cblxuXHRnZXRQb3NpdGlvbigpIDogRmxvYXQzMkFycmF5IHtcblx0XHRyZXR1cm4gdGhpcy5wb3NpdGlvbjtcblx0fVxuXG5cdHNldFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcblx0XHR0aGlzLnNldCggdGhpcy5wb3NpdGlvbiwgeCwgeSwgeiwgKTtcblx0fVxufSIsImltcG9ydCBUZXh0dXJlIGZyb20gXCIuL1RleHR1cmVcIjtcblxuZW51bSBNYXRlcmlhbFRleHR1cmUge1xuXHRESUZGVVNFLFxuXHRTUEVDVUxBUixcblx0Tk9STUFMLFxuXHRESVNQTEFDRU1FTlRcbn1cblxuZXhwb3J0IGVudW0gTWF0ZXJpYWxUeXBlIHtcblx0U0tZQk9YLFxuXHRURVhUVVJFLFxuXHRSRUZMRUNUSVZFLFxuXHRSRUZSQUNUSVZFLFxuXHRDT0xPUixcblx0VEVYVFVSRV9OT19MSUdIVCxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXRlcmlhbERlZmluaXRpb24ge1xuXHRhbWJpZW50PzogbnVtYmVyO1xuXG5cdGRpZmZ1c2U/OiBUZXh0dXJlO1xuXG5cdGNvbG9yPyA6IEZsb2F0MzJBcnJheTtcblxuXHRzcGVjdWxhcj86IFRleHR1cmU7XG5cdHNoaW5pbmVzcz8gOiBudW1iZXI7XG5cblx0bm9ybWFsPzogVGV4dHVyZTtcblx0ZGlzcGxhY2VtZW50PzogVGV4dHVyZTtcblx0ZGlzcGxhY2VtZW50TWFwU2NhbGU/OiBudW1iZXI7XG5cdGRpc3BsYWNlbWVudE1hcEJpYXM/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdGVyaWFsIHtcblxuXHRyZWFkb25seSBkZWZpbml0aW9uOiBNYXRlcmlhbERlZmluaXRpb247XG5cdHJlYWRvbmx5IHR5cGU6IE1hdGVyaWFsVHlwZTtcblxuXHRyZW5kZXJNb2RlPzogbnVtYmVyO1xuXG5cdHByaXZhdGUgY29uc3RydWN0b3IodDogTWF0ZXJpYWxUeXBlLCBkZWY/OiBNYXRlcmlhbERlZmluaXRpb24pIHtcblx0XHR0aGlzLnR5cGUgPSB0O1xuXHRcdHRoaXMuZGVmaW5pdGlvbiA9IGRlZjtcblx0fVxuXG5cdGRpc3Bvc2UoKSB7XG5cblx0fVxuXG5cdHN0YXRpYyBSZWZsZWN0aXZlKHQ6IFRleHR1cmUpIHtcblx0XHRyZXR1cm4gbmV3IE1hdGVyaWFsKE1hdGVyaWFsVHlwZS5SRUZMRUNUSVZFLCB7XG5cdFx0XHRkaWZmdXNlOiB0LFxuXHRcdH0pO1xuXHR9XG5cblx0c3RhdGljIFJlZnJhY3RpdmUodDogVGV4dHVyZSkge1xuXHRcdHJldHVybiBuZXcgTWF0ZXJpYWwoTWF0ZXJpYWxUeXBlLlJFRlJBQ1RJVkUsIHtcblx0XHRcdGRpZmZ1c2U6IHQsXG5cdFx0fSk7XG5cdH1cblxuXHRzdGF0aWMgU2t5Ym94KHRleHR1cmU6IFRleHR1cmUpIHtcblx0XHRyZXR1cm4gbmV3IE1hdGVyaWFsKE1hdGVyaWFsVHlwZS5TS1lCT1gsIHtcblx0XHRcdGRpZmZ1c2U6IHRleHR1cmUsXG5cdFx0fSk7XG5cdH1cblxuXHRzdGF0aWMgVGV4dHVyZShkaWZmdXNlOiBUZXh0dXJlLCBzcGVjdWxhcjogVGV4dHVyZSwgYW1iaWVudDogbnVtYmVyLCBzaGluaW5lc3M6IG51bWJlcikge1xuXHRcdHJldHVybiBuZXcgTWF0ZXJpYWwoTWF0ZXJpYWxUeXBlLlRFWFRVUkUsIHtcblx0XHRcdGRpZmZ1c2UsXG5cdFx0XHRzcGVjdWxhcixcblx0XHRcdGFtYmllbnQsXG5cdFx0XHRzaGluaW5lc3MsXG5cdFx0fSk7XG5cdH1cblxuXHRzdGF0aWMgVGV4dHVyZU5vTGlnaHQoZGlmZnVzZTogVGV4dHVyZSwgYW1iaWVudDogbnVtYmVyKSB7XG5cdFx0cmV0dXJuIG5ldyBNYXRlcmlhbChNYXRlcmlhbFR5cGUuVEVYVFVSRV9OT19MSUdIVCwge1xuXHRcdFx0ZGlmZnVzZSxcblx0XHRcdGFtYmllbnQsXG5cdFx0fSApO1xuXHR9XG5cblx0c3RhdGljIENvbG9yKGNvbG9yOiBGbG9hdDMyQXJyYXkpIHtcblx0XHRyZXR1cm4gbmV3IE1hdGVyaWFsKE1hdGVyaWFsVHlwZS5DT0xPUiwge1xuXHRcdFx0Y29sb3IsXG5cdFx0fSlcblx0fVxufSIsImltcG9ydCBWZWN0b3IzIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjNcIjtcbmltcG9ydCBNYXRyaXg0IGZyb20gXCIuLi9tYXRoL01hdHJpeDRcIjtcbmltcG9ydCBSZW5kZXJDb21wb25lbnQgZnJvbSBcIi4vUmVuZGVyQ29tcG9uZW50XCI7XG5pbXBvcnQgRW5naW5lIGZyb20gXCIuL0VuZ2luZVwiO1xuaW1wb3J0IHtTaGFkZXJWQU9JbmZvfSBmcm9tIFwiLi9zaGFkZXIvU2hhZGVyXCI7XG5pbXBvcnQgTWF0ZXJpYWwsIHtNYXRlcmlhbFR5cGV9IGZyb20gXCIuL01hdGVyaWFsXCI7XG5pbXBvcnQgU3BoZXJlVGVzc2VsbGF0b3IgZnJvbSBcIi4uL21hdGgvU3BoZXJlVGVzc2VsbGF0b3JcIjtcblxuZXhwb3J0IGludGVyZmFjZSBNZXNoUGFyYW1zIHtcblx0dmVydGljZXM6IEZsb2F0MzJBcnJheSxcblx0dXY6IEZsb2F0MzJBcnJheSxcblx0aW5kZXg/OiBVaW50MTZBcnJheSxcblx0bm9ybWFscz86IEZsb2F0MzJBcnJheSxcblx0bWF0ZXJpYWw6IE1hdGVyaWFsLFxuXHRjdWxsRGlzYWJsZWQ/OiBib29sZWFuLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRlc3NlbGxhdGlvbkluZm8ge1xuXHRzdWJkaXZpc2lvbnM6IG51bWJlcjtcblx0bWF0ZXJpYWw6IE1hdGVyaWFsO1xuXHRpbnN0YW5jZUNvdW50PzogbnVtYmVyO1xuXHRjdWxsRGlzYWJsZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNoIGltcGxlbWVudHMgUmVuZGVyQ29tcG9uZW50IHtcblxuXHRtYXRlcmlhbDogTWF0ZXJpYWwgPSBudWxsO1xuXHRzaGFkZXJJbmZvOiBTaGFkZXJWQU9JbmZvID0gbnVsbDtcblxuXHRwb3NpdGlvbiA9IFZlY3RvcjMuY3JlYXRlRnJvbUNvb3JkcygwLDAsMCk7XG5cdHJvdGF0aW9uID0gVmVjdG9yMy5jcmVhdGVGcm9tQ29vcmRzKDAsMCwwKTtcblx0c2NhbGUgPSBWZWN0b3IzLmNyZWF0ZUZyb21Db29yZHMoMSwxLDEpO1xuXG5cdHRyYW5zZm9ybURpcnR5ID0gdHJ1ZTtcblx0dHJhbnNmb3JtID0gTWF0cml4NC5jcmVhdGUoKTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblxuXHR9XG5cblx0ZGlzcG9zZShnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dCkge1xuXHRcdHRoaXMubWF0ZXJpYWwuZGlzcG9zZSgpO1xuXG5cdFx0Z2wuZGVsZXRlVmVydGV4QXJyYXkodGhpcy5zaGFkZXJJbmZvLnZhbyk7XG5cdFx0Z2wuZGVsZXRlQnVmZmVyKHRoaXMuc2hhZGVySW5mby5nZW9tZXRyeUJ1ZmZlcik7XG5cdFx0Z2wuZGVsZXRlQnVmZmVyKHRoaXMuc2hhZGVySW5mby5pbmRleEJ1ZmZlcik7XG5cdFx0Z2wuZGVsZXRlQnVmZmVyKHRoaXMuc2hhZGVySW5mby5ub3JtYWxCdWZmZXIpO1xuXHRcdGdsLmRlbGV0ZUJ1ZmZlcih0aGlzLnNoYWRlckluZm8udXZCdWZmZXIpO1xuXG5cdFx0dGhpcy5zaGFkZXJJbmZvLmluc3RhbmNlQnVmZmVyLmRpc3Bvc2UoZ2wpO1xuXHR9XG5cblx0LyoqXG5cdCAqIGRlZmluZSBhIG1lc2ggZnJvbSB2ZXJ0aWNlcyBkYXRhLCBhbmQgb3B0aW9uYWxseSwgdmVydGljZXMgaW5kZXhlcy5cblx0ICpcblx0ICogYXR0cmliIHBvaW50ZXIgaW5mbyB3aWxsIGJlIHNldCBjb25zZWN1dGl2ZWx5OlxuXHQgKiAgYWxsIHgseSx6XG5cdCAqICBhbGwgdSx2XG5cdCAqXG5cdCAqIGhlbmNlIHZlcnRleEF0dHJpYkFycmF5UG9pbnRlciBjYWxscyB3aWxsIHJlZmxlY3Q6XG5cdCAqICBzdHJpZGUgb2YgKGNvb3JkcyBwZXIgdmVydGV4KSpzaXplb2YoRkxPQVQpID0gKDMqNCksIG9mZnNldCAwXG5cdCAqICBzdHJpZGUgb2YgKGNvb3JkcyBwZXIgdmVydGV4IHV2KSpzaXplb2YoRkxPQVQpID0gKDIqNCksIG9mZnNldCBudW1fdmVydGljZXMgKiBzaXplb2YoRkxPQVQpXG5cdCAqXG5cdCAqL1xuXHRmcm9tKGU6IEVuZ2luZSwgcDogTWVzaFBhcmFtcywgaW5zdGFuY2VDb3VudDogbnVtYmVyKSB7XG5cblx0XHRjb25zdCB2ZXJ0aWNlcyA9IHAudmVydGljZXM7XG5cdFx0Y29uc3QgdXY9IHAudXY7XG5cdFx0Y29uc3QgaW5kZXg9IHAuaW5kZXg7XG5cdFx0Y29uc3QgbWF0ZXJpYWw9IHAubWF0ZXJpYWw7XG5cblx0XHR0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG5cblx0XHRjb25zdCBnbCA9IGUuZ2w7XG5cblx0XHRzd2l0Y2ggKG1hdGVyaWFsLnR5cGUpIHtcblx0XHRcdGNhc2UgTWF0ZXJpYWxUeXBlLlJFRkxFQ1RJVkU6XG5cdFx0XHRcdHRoaXMuc2hhZGVySW5mbyA9IGUuZ2V0U2hhZGVyKFwicmVmbGVjdGl2ZUVudk1hcFwiKS5jcmVhdGVWQU8oZ2wsIHtcblx0XHRcdFx0XHR2ZXJ0ZXg6IHZlcnRpY2VzLFxuXHRcdFx0XHRcdG5vcm1hbDogcC5ub3JtYWxzID8/IHRoaXMuZ2VuZXJhdGVOb3JtYWxzKHZlcnRpY2VzLCBpbmRleCksXG5cdFx0XHRcdFx0aW5kZXgsXG5cdFx0XHRcdFx0aW5zdGFuY2VDb3VudCxcblx0XHRcdFx0XHRjdWxsRGlzYWJsZWQ6IHAuY3VsbERpc2FibGVkLFxuXHRcdFx0XHR9LCBtYXRlcmlhbCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBNYXRlcmlhbFR5cGUuUkVGUkFDVElWRTpcblx0XHRcdFx0dGhpcy5zaGFkZXJJbmZvID0gZS5nZXRTaGFkZXIoXCJyZWZyYWN0aXZlRW52TWFwXCIpLmNyZWF0ZVZBTyhnbCwge1xuXHRcdFx0XHRcdHZlcnRleDogdmVydGljZXMsXG5cdFx0XHRcdFx0bm9ybWFsOiBwLm5vcm1hbHMgPz8gdGhpcy5nZW5lcmF0ZU5vcm1hbHModmVydGljZXMsIGluZGV4KSxcblx0XHRcdFx0XHRpbmRleCxcblx0XHRcdFx0XHRpbnN0YW5jZUNvdW50LFxuXHRcdFx0XHRcdGN1bGxEaXNhYmxlZDogcC5jdWxsRGlzYWJsZWQsXG5cdFx0XHRcdH0sIG1hdGVyaWFsKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIE1hdGVyaWFsVHlwZS5URVhUVVJFOlxuXHRcdFx0XHR0aGlzLnNoYWRlckluZm8gPSBlLmdldFNoYWRlcihcInRleHR1cmVcIikuY3JlYXRlVkFPKGdsLCB7XG5cdFx0XHRcdFx0dmVydGV4OiB2ZXJ0aWNlcyxcblx0XHRcdFx0XHR1dixcblx0XHRcdFx0XHRub3JtYWw6IHAubm9ybWFscyA/PyB0aGlzLmdlbmVyYXRlTm9ybWFscyh2ZXJ0aWNlcywgaW5kZXgpLFxuXHRcdFx0XHRcdGluZGV4LFxuXHRcdFx0XHRcdGluc3RhbmNlQ291bnQsXG5cdFx0XHRcdFx0Y3VsbERpc2FibGVkOiBwLmN1bGxEaXNhYmxlZCxcblx0XHRcdFx0fSwgbWF0ZXJpYWwpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgTWF0ZXJpYWxUeXBlLlRFWFRVUkVfTk9fTElHSFQ6XG5cdFx0XHRcdHRoaXMuc2hhZGVySW5mbyA9IGUuZ2V0U2hhZGVyKFwidGV4dHVyZU5vTGlnaHRcIikuY3JlYXRlVkFPKGdsLCB7XG5cdFx0XHRcdFx0dmVydGV4OiB2ZXJ0aWNlcyxcblx0XHRcdFx0XHR1dixcblx0XHRcdFx0XHRub3JtYWw6IHAubm9ybWFscyA/PyB0aGlzLmdlbmVyYXRlTm9ybWFscyh2ZXJ0aWNlcywgaW5kZXgpLFxuXHRcdFx0XHRcdGluZGV4LFxuXHRcdFx0XHRcdGluc3RhbmNlQ291bnQsXG5cdFx0XHRcdFx0Y3VsbERpc2FibGVkOiBwLmN1bGxEaXNhYmxlZCxcblx0XHRcdFx0fSwgbWF0ZXJpYWwpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgTWF0ZXJpYWxUeXBlLlNLWUJPWDpcblx0XHRcdFx0dGhpcy5zaGFkZXJJbmZvID0gZS5nZXRTaGFkZXIoXCJza3lib3hcIikuY3JlYXRlVkFPKGdsLCB7XG5cdFx0XHRcdFx0dmVydGV4OiB2ZXJ0aWNlcyxcblx0XHRcdFx0XHR1dixcblx0XHRcdFx0XHRpbmRleCxcblx0XHRcdFx0XHRpbnN0YW5jZUNvdW50LFxuXHRcdFx0XHR9LCBtYXRlcmlhbCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBNYXRlcmlhbFR5cGUuQ09MT1I6XG5cdFx0XHRcdHRoaXMuc2hhZGVySW5mbyA9IGUuZ2V0U2hhZGVyKFwibnVsbFwiKS5jcmVhdGVWQU8oZ2wsIHt2ZXJ0ZXg6IHZlcnRpY2VzLCBpbmRleH0sIG1hdGVyaWFsKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gbWF0ZXJpYWwgdHlwZS4gJHttYXRlcmlhbH1gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbWVzaChlOiBFbmdpbmUsIHZlcnRpY2VzOiBGbG9hdDMyQXJyYXksIHV2OiBGbG9hdDMyQXJyYXkgKSB7XG5cblx0XHRjb25zdCBnbCA9IGUuZ2w7XG5cdFx0Z2wuYmluZFZlcnRleEFycmF5KHRoaXMuc2hhZGVySW5mby52YW8pO1xuXHRcdGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnNoYWRlckluZm8uZ2VvbWV0cnlCdWZmZXIpO1xuXHRcdGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0aWNlcywgZ2wuU1RBVElDX0RSQVcpO1xuXHRcdGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnNoYWRlckluZm8ubm9ybWFsQnVmZmVyKTtcblx0XHRnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5nZW5lcmF0ZU5vcm1hbHModmVydGljZXMpLCBnbC5TVEFUSUNfRFJBVyk7XG5cdFx0Z2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMuc2hhZGVySW5mby51dkJ1ZmZlcik7XG5cdFx0Z2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHV2LCBnbC5TVEFUSUNfRFJBVyk7XG5cdFx0Z2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xuXHR9XG5cblx0cHJpdmF0ZSBnZW5lcmF0ZU5vcm1hbHModmVydGljZXM6IEZsb2F0MzJBcnJheSwgaW5kZXg/OiBVaW50MTZBcnJheSkgOiBGbG9hdDMyQXJyYXkge1xuXHRcdGNvbnN0IHYwID0gVmVjdG9yMy5jcmVhdGUoKTtcblx0XHRjb25zdCB2MSA9IFZlY3RvcjMuY3JlYXRlKCk7XG5cdFx0Y29uc3QgdjIgPSBWZWN0b3IzLmNyZWF0ZSgpO1xuXHRcdGNvbnN0IHYzID0gVmVjdG9yMy5jcmVhdGUoKTtcblx0XHRjb25zdCB2NCA9IFZlY3RvcjMuY3JlYXRlKCk7XG5cdFx0Y29uc3QgdjUgPSBWZWN0b3IzLmNyZWF0ZSgpO1xuXG5cdFx0bGV0IG5vcm1hbHM6IEZsb2F0MzJBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkodmVydGljZXMubGVuZ3RoKTtcblxuXHRcdGlmIChpbmRleCkge1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4Lmxlbmd0aDsgaSArPSAzKSB7XG5cdFx0XHRcdGNvbnN0IHYwaSA9IGluZGV4W2ldICogMztcblx0XHRcdFx0Y29uc3QgdjFpID0gaW5kZXhbaSArIDFdICogMztcblx0XHRcdFx0Y29uc3QgdjJpID0gaW5kZXhbaSArIDJdICogMztcblxuXHRcdFx0XHRWZWN0b3IzLnNldCh2MCwgdmVydGljZXNbdjBpXSwgdmVydGljZXNbdjBpICsgMV0sIHZlcnRpY2VzW3YwaSArIDJdKTtcblx0XHRcdFx0VmVjdG9yMy5zZXQodjEsIHZlcnRpY2VzW3YxaV0sIHZlcnRpY2VzW3YxaSArIDFdLCB2ZXJ0aWNlc1t2MWkgKyAyXSk7XG5cdFx0XHRcdFZlY3RvcjMuc2V0KHYyLCB2ZXJ0aWNlc1t2MmldLCB2ZXJ0aWNlc1t2MmkgKyAxXSwgdmVydGljZXNbdjJpICsgMl0pO1xuXG5cdFx0XHRcdFZlY3RvcjMuc3ViKHYzLCB2MCwgdjEpO1xuXHRcdFx0XHRWZWN0b3IzLnN1Yih2NCwgdjAsIHYyKTtcblxuXHRcdFx0XHRWZWN0b3IzLmNyb3NzKHY1LCB2NCwgdjMpO1x0Ly8gbm9ybWFsXG5cblx0XHRcdFx0bm9ybWFsc1t2MGldICs9IHY1WzBdO1xuXHRcdFx0XHRub3JtYWxzW3YwaSArIDFdICs9IHY1WzFdO1xuXHRcdFx0XHRub3JtYWxzW3YwaSArIDJdICs9IHY1WzJdO1xuXHRcdFx0XHRub3JtYWxzW3YxaV0gKz0gdjVbMF07XG5cdFx0XHRcdG5vcm1hbHNbdjFpICsgMV0gKz0gdjVbMV07XG5cdFx0XHRcdG5vcm1hbHNbdjFpICsgMl0gKz0gdjVbMl07XG5cdFx0XHRcdG5vcm1hbHNbdjJpXSArPSB2NVswXTtcblx0XHRcdFx0bm9ybWFsc1t2MmkgKyAxXSArPSB2NVsxXTtcblx0XHRcdFx0bm9ybWFsc1t2MmkgKyAyXSArPSB2NVsyXTtcblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGZvcihsZXQgaSA9IDA7IGk8dmVydGljZXMubGVuZ3RoOyBpKz05KSB7XG5cdFx0XHRcdGNvbnN0IHYwaSA9IGkgO1xuXHRcdFx0XHRjb25zdCB2MWkgPSBpICsgMztcblx0XHRcdFx0Y29uc3QgdjJpID0gaSArIDY7XG5cblx0XHRcdFx0VmVjdG9yMy5zZXQodjAsIHZlcnRpY2VzW3YwaV0sIHZlcnRpY2VzW3YwaSArIDFdLCB2ZXJ0aWNlc1t2MGkgKyAyXSk7XG5cdFx0XHRcdFZlY3RvcjMuc2V0KHYxLCB2ZXJ0aWNlc1t2MWldLCB2ZXJ0aWNlc1t2MWkgKyAxXSwgdmVydGljZXNbdjFpICsgMl0pO1xuXHRcdFx0XHRWZWN0b3IzLnNldCh2MiwgdmVydGljZXNbdjJpXSwgdmVydGljZXNbdjJpICsgMV0sIHZlcnRpY2VzW3YyaSArIDJdKTtcblxuXHRcdFx0XHRWZWN0b3IzLnN1Yih2MywgdjEsIHYwKTtcblx0XHRcdFx0VmVjdG9yMy5zdWIodjQsIHYyLCB2MCk7XG5cblx0XHRcdFx0VmVjdG9yMy5jcm9zcyh2NSwgdjMsIHY0KTtcdC8vIG5vcm1hbFxuXG5cdFx0XHRcdG5vcm1hbHNbdjBpICAgIF0gKz0gdjVbMF07XG5cdFx0XHRcdG5vcm1hbHNbdjBpICsgMV0gKz0gdjVbMV07XG5cdFx0XHRcdG5vcm1hbHNbdjBpICsgMl0gKz0gdjVbMl07XG5cdFx0XHRcdG5vcm1hbHNbdjFpICAgIF0gKz0gdjVbMF07XG5cdFx0XHRcdG5vcm1hbHNbdjFpICsgMV0gKz0gdjVbMV07XG5cdFx0XHRcdG5vcm1hbHNbdjFpICsgMl0gKz0gdjVbMl07XG5cdFx0XHRcdG5vcm1hbHNbdjJpICAgIF0gKz0gdjVbMF07XG5cdFx0XHRcdG5vcm1hbHNbdjJpICsgMV0gKz0gdjVbMV07XG5cdFx0XHRcdG5vcm1hbHNbdjJpICsgMl0gKz0gdjVbMl07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gbm9ybWFsaXplLlxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbm9ybWFscy5sZW5ndGg7IGkgKz0gMykge1xuXHRcdFx0Y29uc3QgdiA9IE1hdGguc3FydChub3JtYWxzW2ldICogbm9ybWFsc1tpXSArIG5vcm1hbHNbaSArIDFdICogbm9ybWFsc1tpICsgMV0gKyBub3JtYWxzW2kgKyAyXSAqIG5vcm1hbHNbaSArIDJdKTtcblx0XHRcdG5vcm1hbHNbaV0gLz0gdjtcblx0XHRcdG5vcm1hbHNbaSArIDFdIC89IHY7XG5cdFx0XHRub3JtYWxzW2kgKyAyXSAvPSB2O1xuXHRcdH1cblxuXHRcdHJldHVybiBub3JtYWxzO1xuXHR9XG5cblx0dHJhbnNmb3JtTWF0cml4KCkgOiBGbG9hdDMyQXJyYXkge1xuXG5cdFx0Ly8gdHJhbnNmb3JtYXRpb24gbmVlZHMgcmVidWlsZFxuXHRcdGlmICh0aGlzLnRyYW5zZm9ybURpcnR5KSB7XG5cdFx0XHRNYXRyaXg0Lm1vZGVsTWF0cml4KHRoaXMudHJhbnNmb3JtLCB0aGlzLnBvc2l0aW9uLCB0aGlzLnJvdGF0aW9uLCB0aGlzLnNjYWxlKTtcblx0XHRcdHRoaXMudHJhbnNmb3JtRGlydHkgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy50cmFuc2Zvcm07XG5cdH1cblxuXHRyZW5kZXIoZTogRW5naW5lKSB7XG5cdFx0dGhpcy5yZW5kZXJJbnN0YW5jZWQoZSwgdGhpcy50cmFuc2Zvcm0sIHRoaXMuc2hhZGVySW5mby5pbnN0YW5jZUNvdW50KTtcblx0fVxuXG5cdHJlbmRlckluc3RhbmNlZChlOiBFbmdpbmUsIGxvY2FsczogRmxvYXQzMkFycmF5LCBudW1JbnN0YW5jZXM6IG51bWJlcikge1xuXG5cdFx0dGhpcy50cmFuc2Zvcm1NYXRyaXgoKTtcblx0XHRjb25zdCBnbCA9IGUuZ2w7XG5cblx0XHR0aGlzLnNoYWRlckluZm8uaW5zdGFuY2VCdWZmZXIgJiYgdGhpcy5zaGFkZXJJbmZvLmluc3RhbmNlQnVmZmVyLnVwZGF0ZVdpdGgoZ2wsIGxvY2Fscyk7XG5cdFx0dGhpcy5zaGFkZXJJbmZvLnNoYWRlci5yZW5kZXIoZSwgdGhpcy5zaGFkZXJJbmZvLCB0aGlzKTtcblx0fVxuXG5cdGdldE1hdGVyaWFsKCkge1xuXHRcdHJldHVybiB0aGlzLm1hdGVyaWFsO1xuXHR9XG5cblx0Z2V0TWF0cml4KCkge1xuXHRcdHJldHVybiB0aGlzLnRyYW5zZm9ybU1hdHJpeCgpO1xuXHR9XG5cblx0ZXVsZXIoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xuXHRcdHRoaXMucm90YXRpb25bMF0gPSB4O1xuXHRcdHRoaXMucm90YXRpb25bMV0gPSB5O1xuXHRcdHRoaXMucm90YXRpb25bMl0gPSB6O1xuXHRcdHRoaXMudHJhbnNmb3JtRGlydHkgPSB0cnVlO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xuXHRcdFZlY3RvcjMuc2V0KHRoaXMucG9zaXRpb24sIHgsIHksIHopO1xuXHRcdHRoaXMudHJhbnNmb3JtRGlydHkgPSB0cnVlO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UG9zaXRpb25WKGE6IEFycmF5TGlrZTxudW1iZXI+KSB7XG5cdFx0VmVjdG9yMy5jb3B5KHRoaXMucG9zaXRpb24sIGEpO1xuXHRcdHRoaXMudHJhbnNmb3JtRGlydHkgPSB0cnVlO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UG9zaXRpb24oKSA6IEZsb2F0MzJBcnJheSB7XG5cdFx0cmV0dXJuIHRoaXMucG9zaXRpb247XG5cdH1cblxuXHRzZXRTY2FsZShzOiBudW1iZXIpIHtcblx0XHRWZWN0b3IzLnNldCh0aGlzLnNjYWxlLCBzLHMscyk7XG5cdFx0dGhpcy50cmFuc2Zvcm1EaXJ0eSA9IHRydWU7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0Ly9cblx0Ly8gc3RhdGljIHRlc3NlbGxhdGVTcGhlcmVSZWMoZTogRW5naW5lLCBpOiBUZXNzZWxsYXRpb25JbmZvKTogTWVzaCB7XG5cdC8vIFx0Ly8gY29uc3QgZGF0YSA9IG5ldyBTcGhlcmVUZXNzZWxsYXRvcigpLnRlc3NlbGxhdGVGcm9tVGV0cmFoZWRyb25SZWMoaS5zdWJkaXZpc2lvbnMpO1xuXHQvL1xuXHQvLyBcdGNvbnN0IG0gPSBuZXcgTXlyaWFoZWRyYWwoaS5zdWJkaXZpc2lvbnMpO1xuXHQvLyBcdGNvbnN0IGRhdGEgPSBtLmdldE1lc2hEYXRhKCk7XG5cdC8vXG5cdC8vIFx0cmV0dXJuIG5ldyBNZXNoKCkuZnJvbShlLCB7XG5cdC8vIFx0XHQuLi5kYXRhLFxuXHQvLyBcdFx0bWF0ZXJpYWw6IGkubWF0ZXJpYWwsXG5cdC8vIFx0XHRjdWxsRGlzYWJsZWQ6IGkuY3VsbERpc2FibGVkLFxuXHQvLyBcdH0sIGkuaW5zdGFuY2VDb3VudCA/PyAxKTtcblx0Ly9cblx0Ly8gfVxuXG5cdHN0YXRpYyB0ZXNzZWxsYXRlU3BoZXJlKGU6IEVuZ2luZSwgaTogVGVzc2VsbGF0aW9uSW5mbyk6IE1lc2gge1xuXHRcdGNvbnN0IGRhdGEgPSBuZXcgU3BoZXJlVGVzc2VsbGF0b3IoKS50ZXNzZWxsYXRlRnJvbVRldHJhaGVkcm9uUmVjKGkuc3ViZGl2aXNpb25zKTtcblxuXHRcdHJldHVybiBuZXcgTWVzaCgpLmZyb20oZSwge1xuXHRcdFx0Li4uZGF0YSxcblx0XHRcdG1hdGVyaWFsOiBpLm1hdGVyaWFsLFxuXHRcdFx0Y3VsbERpc2FibGVkOiB0cnVlLFxuXHRcdH0sIGkuaW5zdGFuY2VDb3VudCA/PyAxKTtcblx0fVxuXG5cdHN0YXRpYyB0ZXNzZWxsYXRlU3BoZXJlRnJvbUN1YmUoZTogRW5naW5lLCBpOiBUZXNzZWxsYXRpb25JbmZvKTogTWVzaCB7XG5cdFx0Y29uc3QgZGF0YSA9IG5ldyBTcGhlcmVUZXNzZWxsYXRvcigpLnRlc3NlbGxhdGVGcm9tQ3ViZShpLnN1YmRpdmlzaW9ucyk7XG5cblx0XHRyZXR1cm4gbmV3IE1lc2goKS5mcm9tKGUsIHtcblx0XHRcdC4uLmRhdGEsXG5cdFx0XHRtYXRlcmlhbDogaS5tYXRlcmlhbCxcblx0XHRcdGN1bGxEaXNhYmxlZDogaS5jdWxsRGlzYWJsZWQsXG5cdFx0fSwgaS5pbnN0YW5jZUNvdW50ID8/IDEpO1xuXHR9XG59IiwiaW1wb3J0IEVuZ2luZSBmcm9tIFwiLi9FbmdpbmVcIjtcbmltcG9ydCBUZXh0dXJlLCB7VGV4dHVyZUluaXRpYWxpemVyfSBmcm9tIFwiLi9UZXh0dXJlXCI7XG5pbXBvcnQgUGxhdGZvcm0gZnJvbSBcIi4uL3BsYXRmb3JtL1BsYXRmb3JtXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXR0YWNobWVudCB7XG5cdHJlbmRlckJ1ZmZlclRhcmdldDogbnVtYmVyO1xuXHRyZW5kZXJCdWZmZXJJbnRlcm5hbEZvcm1hdD86IG51bWJlclxuXHR0ZXh0dXJlRGVmaW5pdGlvbj86IFRleHR1cmVJbml0aWFsaXplcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXJmYWNlRGVmaW5pdGlvbiB7XG5cblx0d2lkdGg6IG51bWJlcjtcblx0aGVpZ2h0OiBudW1iZXI7XG5cblx0YXR0YWNobWVudHMgOiBBdHRhY2htZW50W107XG5cdHNhbXBsZXM/IDogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXJmYWNlIHtcblxuXHRwcml2YXRlIGZyYW1lQnVmZmVyOiBXZWJHTEZyYW1lYnVmZmVyID0gbnVsbDtcblx0cHJpdmF0ZSByZW5kZXJCdWZmZXI6IFdlYkdMUmVuZGVyYnVmZmVyID0gbnVsbDtcblx0cHJpdmF0ZSB0ZXh0dXJlXzogVGV4dHVyZSA9IG51bGw7XG5cdHByaXZhdGUgcmVhZG9ubHkgZGVmaW5pdGlvbjogU3VyZmFjZURlZmluaXRpb247XG5cblx0Y29uc3RydWN0b3IoZTogRW5naW5lLCBkZWY6IFN1cmZhY2VEZWZpbml0aW9uKSB7XG5cdFx0dGhpcy5kZWZpbml0aW9uID0gZGVmO1xuXHRcdHRoaXMuaW5pdGlhbGl6ZShlKTtcblx0fVxuXG5cdHByaXZhdGUgaW5pdGlhbGl6ZShlOiBFbmdpbmUpIHtcblxuXHRcdGNvbnN0IGdsID0gZS5nbDtcblxuXHRcdHRoaXMuZnJhbWVCdWZmZXIgPSBnbC5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuXHRcdGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgdGhpcy5mcmFtZUJ1ZmZlcik7XG5cblx0XHR0aGlzLnJlbmRlckJ1ZmZlciA9IGdsLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xuXHRcdGdsLmJpbmRSZW5kZXJidWZmZXIoZ2wuUkVOREVSQlVGRkVSLCB0aGlzLnJlbmRlckJ1ZmZlcik7XG5cblx0XHR0aGlzLmRlZmluaXRpb24uYXR0YWNobWVudHMuZm9yRWFjaCggYXR0YWNobWVudCA9PiB7XG5cblx0XHRcdGlmIChhdHRhY2htZW50LnJlbmRlckJ1ZmZlclRhcmdldD49Z2wuQ09MT1JfQVRUQUNITUVOVDAgJiYgYXR0YWNobWVudC5yZW5kZXJCdWZmZXJUYXJnZXQ8PWdsLkNPTE9SX0FUVEFDSE1FTlQxNSkge1xuXG5cdFx0XHRcdC8vIG92ZXJyaWRlIHRleHR1cmUgc2l6ZSB3aXRoIGZyYW1lYnVmZmVyIHNpemUuXG5cdFx0XHRcdGF0dGFjaG1lbnQudGV4dHVyZURlZmluaXRpb24ud2lkdGggPSB0aGlzLmRlZmluaXRpb24ud2lkdGg7XG5cdFx0XHRcdGF0dGFjaG1lbnQudGV4dHVyZURlZmluaXRpb24uaGVpZ2h0ID0gdGhpcy5kZWZpbml0aW9uLmhlaWdodDtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMudGV4dHVyZV8gPSBUZXh0dXJlLmluaXRpYWxpemUoZ2wsIGF0dGFjaG1lbnQudGV4dHVyZURlZmluaXRpb24pO1xuXG5cdFx0XHRcdGdsLmZyYW1lYnVmZmVyVGV4dHVyZTJEKGdsLkZSQU1FQlVGRkVSLFxuXHRcdFx0XHRcdGF0dGFjaG1lbnQucmVuZGVyQnVmZmVyVGFyZ2V0LFxuXHRcdFx0XHRcdHRoaXMudGV4dHVyZV8udGFyZ2V0LFxuXHRcdFx0XHRcdHRoaXMudGV4dHVyZV8uZ2xUZXh0dXJlXyxcblx0XHRcdFx0XHQwKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRpZiAodGhpcy5kZWZpbml0aW9uLnNhbXBsZXMgIT09IHZvaWQgMCkge1xuXHRcdFx0XHRcdGdsLnJlbmRlcmJ1ZmZlclN0b3JhZ2VNdWx0aXNhbXBsZShnbC5SRU5ERVJCVUZGRVIsXG5cdFx0XHRcdFx0XHR0aGlzLmRlZmluaXRpb24uc2FtcGxlcyxcblx0XHRcdFx0XHRcdGF0dGFjaG1lbnQucmVuZGVyQnVmZmVySW50ZXJuYWxGb3JtYXQsXG5cdFx0XHRcdFx0XHR0aGlzLmRlZmluaXRpb24ud2lkdGgsXG5cdFx0XHRcdFx0XHR0aGlzLmRlZmluaXRpb24uaGVpZ2h0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRnbC5yZW5kZXJidWZmZXJTdG9yYWdlKGdsLlJFTkRFUkJVRkZFUixcblx0XHRcdFx0XHRcdGF0dGFjaG1lbnQucmVuZGVyQnVmZmVySW50ZXJuYWxGb3JtYXQsXG5cdFx0XHRcdFx0XHR0aGlzLmRlZmluaXRpb24ud2lkdGgsXG5cdFx0XHRcdFx0XHR0aGlzLmRlZmluaXRpb24uaGVpZ2h0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGdsLmZyYW1lYnVmZmVyUmVuZGVyYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBhdHRhY2htZW50LnJlbmRlckJ1ZmZlclRhcmdldCwgZ2wuUkVOREVSQlVGRkVSLCB0aGlzLnJlbmRlckJ1ZmZlcik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZihnbC5jaGVja0ZyYW1lYnVmZmVyU3RhdHVzKGdsLkZSQU1FQlVGRkVSKSAhPSBnbC5GUkFNRUJVRkZFUl9DT01QTEVURSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBGcmFtZUJ1ZmZlciBpbmNvbXBsZXRlLmApO1xuXHRcdH1cblxuXHRcdGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbCk7XG5cdH1cblxuXHRlbmFibGVBc1RleHR1cmVUYXJnZXQoZTogRW5naW5lKSB7XG5cblx0XHRjb25zdCBnbCA9IGUuZ2w7XG5cdFx0Z2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCB0aGlzLmZyYW1lQnVmZmVyKTtcblx0XHRlLnJlbmRlclN1cmZhY2VTaXplKHRoaXMuZGVmaW5pdGlvbi53aWR0aCwgdGhpcy5kZWZpbml0aW9uLmhlaWdodCk7XG5cdH1cblxuXHRkaXNhYmxlQXNUZXh0dXJlVGFyZ2V0KGU6IEVuZ2luZSkge1xuXG5cdFx0ZS5nbC5iaW5kRnJhbWVidWZmZXIoZS5nbC5GUkFNRUJVRkZFUiwgbnVsbCk7XG5cdFx0ZS5yZW5kZXJTdXJmYWNlU2l6ZShQbGF0Zm9ybS5jYW52YXMud2lkdGgsIFBsYXRmb3JtLmNhbnZhcy5oZWlnaHQpO1xuXHR9XG5cblx0Z2V0IHRleHR1cmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMudGV4dHVyZV87XG5cdH1cbn0iLCIvKipcbiAqIFRleHR1cmUgdXNlcyBtaXBtYXBzIGJ5IGRlZmF1bHQuXG4gKlxuICogaW50ZXJuYWxfZm9ybWF0IGFuZCBmb3JtYXQsIGFyZSBub3QgcmVxdWlyZWQgdG8gYmUgZXF1YWwgaW4gd2ViZ2wyLlxuICogQ29tYmluYXRpb25zIGFyZSBoZXJlOlxuICogaHR0cHM6Ly93d3cua2hyb25vcy5vcmcvcmVnaXN0cnkvT3BlbkdMLVJlZnBhZ2VzL2VzMy4wL2h0bWwvZ2xUZXhJbWFnZTJELnhodG1sXG4gKi9cblxuZXhwb3J0IHR5cGUgVGV4dHVyZUluaXRpYWxpemVyRWxlbWVudCA9IEhUTUxJbWFnZUVsZW1lbnQgfCBIVE1MQ2FudmFzRWxlbWVudCB8IEhUTUxWaWRlb0VsZW1lbnQgfCBJbWFnZURhdGEgfCBJbWFnZUJpdG1hcDtcblxuZXhwb3J0IGludGVyZmFjZSBUZXh0dXJlSW5pdGlhbGl6ZXIge1xuXHR0YXJnZXQ/Olx0bnVtYmVyO1x0XHRcdC8vXHRkZWZhdWx0cyB0byBURVhUVVJFXzJEXG5cdHdpZHRoPzogbnVtYmVyO1xuXHRoZWlnaHQ/OiBudW1iZXI7XG5cdGludGVybmFsX2Zvcm1hdD86IG51bWJlcjtcdC8vIGNvbG9yIGNvbXBvbmVudHMgaW4gdGV4dHVyZS4gZGVmYXVsdHMgdG8gUkdCQThcblx0Zm9ybWF0PzogbnVtYmVyO1x0XHRcdC8vIGludGVybmFsIGZvcm1hdC4gZGVmYXVsdHMgdG8gUkdCQThcblx0dHlwZT86IG51bWJlcjtcdFx0XHRcdC8vIGRlZmF1bHRzIHRvIFVOU0lHTkVEX0JZVEVcblx0bGV2ZWw/OiBudW1iZXI7XHRcdFx0XHQvLyBtaXBtYXAgbGV2ZWwuIGRlZmF1bHRzIHRvIDAuXG5cdHBpeGVscz86IEFycmF5QnVmZmVyVmlldztcblx0ZWxlbWVudD86IFRleHR1cmVJbml0aWFsaXplckVsZW1lbnR8VGV4dHVyZUluaXRpYWxpemVyRWxlbWVudFtdO1xuXG5cdG1pbkZpbHRlcj86IG51bWJlcjtcdFx0XHQvLyBkZWZhdWx0cyB0byBMSU5FQVIgKE5FQVJFU1QgfCBMSU5FQVIgfCBORUFSRVNUX01JUE1BUF9ORUFSRVNUIHwgLi4uKVxuXHRtYWdGaWx0ZXI/OiBudW1iZXI7XG5cdHdyYXBfbW9kZT86IG51bWJlcjtcdFx0XHQvLyBkZWZhdWx0cyB0byBDTEFNUF9UT19FREdFXG59XG5cbi8qKlxuICogQSBnZW5lcmFsIHRleHR1cmUgY2xhc3MuXG4gKiBJdCBob25vcnMgYml0bWFwcyB0aGF0IHdpbGwgYmUgY29uc3RydWN0ZWQgYmFzZWQgb24gdGhlIFRleHR1cmVJbml0aWFsaXplZCBmaWx0ZXIgcGFyYW1ldGVyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0dXJlIHtcblxuXHRnbFRleHR1cmVfOiBXZWJHTFRleHR1cmUgPSBudWxsO1xuXHR3aWR0aCA9IC0xO1xuXHRoZWlnaHQgPSAtMTtcblx0dGFyZ2V0ID0gLTE7XG5cblx0cHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcblx0fVxuXG5cdHN0YXRpYyBpbml0aWFsaXplQ3ViZU1hcChnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dCwgZWxlbWVudHM6IEhUTUxJbWFnZUVsZW1lbnRbXSkgOiBUZXh0dXJlIHtcblx0XHRyZXR1cm4gVGV4dHVyZS5pbml0aWFsaXplKGdsLFxuXHRcdFx0e1xuXHRcdFx0XHR0YXJnZXQ6IGdsLlRFWFRVUkVfQ1VCRV9NQVAsXG5cdFx0XHRcdGVsZW1lbnQ6IGVsZW1lbnRzLFxuXHRcdFx0XHR3cmFwX21vZGU6IGdsLkNMQU1QX1RPX0VER0UsXG5cdFx0XHRcdG1pbkZpbHRlcjogZ2wuTElORUFSLFxuXHRcdFx0XHRpbnRlcm5hbF9mb3JtYXQ6IGdsLlJHQkEsXG5cdFx0XHRcdGZvcm1hdDogZ2wuUkdCQVxuXHRcdFx0fSk7XG5cdH1cblxuXHRzdGF0aWMgaW5pdGlhbGl6ZShnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dCwgaW5mbzogVGV4dHVyZUluaXRpYWxpemVyKSA6IFRleHR1cmUge1xuXG5cdFx0aWYgKGluZm8udGFyZ2V0PT09dm9pZCAwKSB7XG5cdFx0XHRpbmZvLnRhcmdldCA9IGdsLlRFWFRVUkVfMkQ7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2xUZXh0dXJlXyA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcblxuXHRcdGdsLmJpbmRUZXh0dXJlKGluZm8udGFyZ2V0LCBnbFRleHR1cmVfKTtcblxuXHRcdGNvbnN0IGFycmF5VmlldzogQXJyYXlCdWZmZXJWaWV3ID0gaW5mby5waXhlbHMhPT12b2lkIDAgPyBpbmZvLnBpeGVscyA6IG51bGw7XG5cblx0XHRpZiAoaW5mby5pbnRlcm5hbF9mb3JtYXQ9PT12b2lkIDApIHtcblx0XHRcdGluZm8uaW50ZXJuYWxfZm9ybWF0ID0gZ2wuUkdCQTtcblx0XHR9XG5cblx0XHRpZiAoaW5mby5mb3JtYXQ9PT12b2lkIDApIHtcblx0XHRcdGluZm8uZm9ybWF0ID0gaW5mby5pbnRlcm5hbF9mb3JtYXQ7XG5cdFx0fVxuXG5cdFx0aWYgKGluZm8udHlwZT09PXZvaWQgMCkge1xuXHRcdFx0aW5mby50eXBlID0gZ2wuVU5TSUdORURfQllURTtcblx0XHR9XG5cblx0XHRpZiAoaW5mby5lbGVtZW50KSB7XG5cblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGluZm8uZWxlbWVudCkpIHtcblx0XHRcdFx0aWYgKGluZm8udGFyZ2V0PT09Z2wuVEVYVFVSRV9DVUJFX01BUCkge1xuXG5cdFx0XHRcdFx0aW5mby5lbGVtZW50LmZvckVhY2goKGltZywgaW5kZXgpID0+IHtcblx0XHRcdFx0XHRcdGdsLnRleEltYWdlMkQoXG5cdFx0XHRcdFx0XHRcdGdsLlRFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWCArIGluZGV4LFxuXHRcdFx0XHRcdFx0XHQwLFxuXHRcdFx0XHRcdFx0XHRpbmZvLmludGVybmFsX2Zvcm1hdCxcblx0XHRcdFx0XHRcdFx0aW1nLndpZHRoLFxuXHRcdFx0XHRcdFx0XHRpbWcuaGVpZ2h0LFxuXHRcdFx0XHRcdFx0XHQwLFxuXHRcdFx0XHRcdFx0XHRpbmZvLmZvcm1hdCxcblx0XHRcdFx0XHRcdFx0aW5mby50eXBlLFxuXHRcdFx0XHRcdFx0XHRpbWcpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93KG5ldyBFcnJvcihcIlRleHR1cmUgdHlwZSBiYWQ6IGFycmF5IG9mIGltYWdlcywgbm90IGN1YmVtYXBcIikpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gbm90IGFycmF5XG5cdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBpbmZvLmVsZW1lbnQ7XG5cblx0XHRcdFx0aW5mby53aWR0aCA9IGVsZW1lbnQud2lkdGg7XG5cdFx0XHRcdGluZm8uaGVpZ2h0ID0gZWxlbWVudC5oZWlnaHQ7XG5cdFx0XHRcdGdsLnRleEltYWdlMkQoXG5cdFx0XHRcdFx0aW5mby50YXJnZXQsXG5cdFx0XHRcdFx0aW5mby5sZXZlbCB8fCAwLFxuXHRcdFx0XHRcdGluZm8uaW50ZXJuYWxfZm9ybWF0LFxuXHRcdFx0XHRcdGluZm8ud2lkdGgsXG5cdFx0XHRcdFx0aW5mby5oZWlnaHQsXG5cdFx0XHRcdFx0MCxcblx0XHRcdFx0XHRpbmZvLmZvcm1hdCxcblx0XHRcdFx0XHRpbmZvLnR5cGUsXG5cdFx0XHRcdFx0ZWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGdsLnRleEltYWdlMkQoXG5cdFx0XHRcdGluZm8udGFyZ2V0LFxuXHRcdFx0XHRpbmZvLmxldmVsIHx8IDAsXG5cdFx0XHRcdGluZm8uaW50ZXJuYWxfZm9ybWF0LFxuXHRcdFx0XHRpbmZvLndpZHRoLFxuXHRcdFx0XHRpbmZvLmhlaWdodCxcblx0XHRcdFx0MCxcblx0XHRcdFx0aW5mby5mb3JtYXQsXG5cdFx0XHRcdGluZm8udHlwZSxcblx0XHRcdFx0YXJyYXlWaWV3KTtcblx0XHR9XG5cblx0XHRjb25zdCB0ZXh0dXJlID0gbmV3IFRleHR1cmUoKTtcblxuXHRcdHRleHR1cmUuZ2xUZXh0dXJlXyA9IGdsVGV4dHVyZV87XG5cdFx0dGV4dHVyZS53aWR0aCA9IGluZm8ud2lkdGg7XG5cdFx0dGV4dHVyZS5oZWlnaHQgPSBpbmZvLmhlaWdodDtcblx0XHR0ZXh0dXJlLnRhcmdldCA9IGluZm8udGFyZ2V0O1xuXG5cdFx0Ly8gZGVmYXVsdCBmaWx0ZXIgaWYgbm90IHByZXNlbnRcblx0XHRpZiAoaW5mby5taW5GaWx0ZXI9PT12b2lkIDApIHtcblx0XHRcdGluZm8ubWluRmlsdGVyID0gZ2wuTElORUFSO1xuXHRcdH1cblxuXHRcdC8vIGdlbmVyYXRlIG1pcG1hcHMgaWYgbmVlZGVkXG5cdFx0aWYgKGluZm8ubWluRmlsdGVyPT09Z2wuTkVBUkVTVF9NSVBNQVBfTkVBUkVTVCB8fFxuXHRcdFx0aW5mby5taW5GaWx0ZXI9PT1nbC5ORUFSRVNUX01JUE1BUF9MSU5FQVIgfHxcblx0XHRcdGluZm8ubWluRmlsdGVyPT09Z2wuTElORUFSX01JUE1BUF9ORUFSRVNUIHx8XG5cdFx0XHRpbmZvLm1pbkZpbHRlcj09PWdsLkxJTkVBUl9NSVBNQVBfTElORUFSKSB7XG5cblx0XHRcdGdsLmdlbmVyYXRlTWlwbWFwKGluZm8udGFyZ2V0KTtcblx0XHR9XG5cblx0XHRpZiAoaW5mby5tYWdGaWx0ZXI9PT12b2lkIDApIHtcblx0XHRcdGluZm8ubWFnRmlsdGVyID0gZ2wuTElORUFSO1xuXHRcdH1cblxuXHRcdGdsLnRleFBhcmFtZXRlcmkoaW5mby50YXJnZXQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgaW5mby5taW5GaWx0ZXIpO1xuXHRcdGdsLnRleFBhcmFtZXRlcmkoaW5mby50YXJnZXQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgaW5mby5tYWdGaWx0ZXIpO1xuXG5cdFx0Ly8gZGVmYXVsdCB3cmFwIG1vZGVcblx0XHRpZiAoaW5mby53cmFwX21vZGU9PT12b2lkIDApIHtcblx0XHRcdGluZm8ud3JhcF9tb2RlID0gZ2wuQ0xBTVBfVE9fRURHRTtcblx0XHR9XG5cdFx0Z2wudGV4UGFyYW1ldGVyaShpbmZvLnRhcmdldCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGluZm8ud3JhcF9tb2RlKTtcblx0XHRnbC50ZXhQYXJhbWV0ZXJpKGluZm8udGFyZ2V0LCBnbC5URVhUVVJFX1dSQVBfVCwgaW5mby53cmFwX21vZGUpO1xuXG5cdFx0aWYgKGluZm8udGFyZ2V0PT09Z2wuVEVYVFVSRV9DVUJFX01BUCkge1xuXHRcdFx0Z2wudGV4UGFyYW1ldGVyaShpbmZvLnRhcmdldCwgZ2wuVEVYVFVSRV9XUkFQX1IsIGluZm8ud3JhcF9tb2RlKTtcblx0XHR9XG5cblx0XHRnbC5iaW5kVGV4dHVyZSh0ZXh0dXJlLnRhcmdldCwgbnVsbCk7XG5cblx0XHRyZXR1cm4gdGV4dHVyZTtcblx0fVxuXG5cdGJpbmRBc1JlbmRlclRhcmdldCgpIHtcblxuXHR9XG5cblx0YmluZChnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dCkge1xuXHRcdGdsLmJpbmRUZXh0dXJlKHRoaXMudGFyZ2V0LCB0aGlzLmdsVGV4dHVyZV8pO1xuXHR9XG5cblx0ZGlzcG9zZShnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dCkge1xuXHRcdGdsLmRlbGV0ZVRleHR1cmUodGhpcy5nbFRleHR1cmVfKTtcblx0fVxuXG5cdGVuYWJsZUFzVW5pdChnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dCwgdW5pdDogbnVtYmVyKSB7XG5cdFx0Z2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCArIHVuaXQpO1xuXHRcdGdsLmJpbmRUZXh0dXJlKHRoaXMudGFyZ2V0LCB0aGlzLmdsVGV4dHVyZV8pO1xuXHR9XG5cbn0iLCJpbXBvcnQgTWVzaCBmcm9tIFwiLi4vTWVzaFwiO1xuaW1wb3J0IE1hdGVyaWFsIGZyb20gXCIuLi9NYXRlcmlhbFwiO1xuaW1wb3J0IEVuZ2luZSBmcm9tIFwiLi4vRW5naW5lXCI7XG5cbmV4cG9ydCBjb25zdCBDdWJlVmVydGljZXMgPSBuZXcgRmxvYXQzMkFycmF5KFtcblx0MC41LCAtMC41LCAtMC41LFxuXHQtMC41LCAtMC41LCAtMC41LFxuXHQtMC41LCAtMC41LCAwLjUsXG5cdDAuNSwgLTAuNSwgMC41LFxuXHQwLjUsIDAuNSwgLTAuNSxcblx0LTAuNSwgMC41LCAtMC41LFxuXHQtMC41LCAwLjUsIDAuNSxcblx0MC41LCAwLjUsIDAuNSxcbl0pO1xuXG5jb25zdCB1diA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDEsIDEsIDAsIDEsIDEsIDAsIDAsIDEsIDEsIDAsIDAsIDAsIDEsIDFdKTtcblxuZXhwb3J0IGNvbnN0IEN1YmVJbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KFtcblx0MiwgMSwgMCwgMywgMiwgMCxcblx0MywgMCwgNCwgNywgMywgNCxcblx0MCwgMSwgNSwgNCwgMCwgNSxcblx0MSwgMiwgNiwgNSwgMSwgNixcblx0MiwgMywgNywgNiwgMiwgNyxcblx0NCwgNSwgNiwgNywgNCwgNixcbl0pO1xuXG5leHBvcnQgY2xhc3MgQ3ViZSBleHRlbmRzIE1lc2gge1xuXG5cblx0Y29uc3RydWN0b3IoZTogRW5naW5lLCBtYXRlcmlhbDogTWF0ZXJpYWwsIGluZGV4ZWQ6IGJvb2xlYW4sIGluc3RhbmNlQ291bnQ/OiBudW1iZXIpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0aWYgKGluZGV4ZWQpIHtcblx0XHRcdHRoaXMuYnVpbGRJbmRleGVkKGUsIG1hdGVyaWFsLCBpbnN0YW5jZUNvdW50KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5idWlsZChlLCBtYXRlcmlhbCwgaW5zdGFuY2VDb3VudCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBidWlsZEluZGV4ZWQoZTogRW5naW5lLCBtYXRlcmlhbDogTWF0ZXJpYWwsIGluc3RhbmNlQ291bnQ/OiBudW1iZXIpIHtcblxuXHRcdHRoaXMuZnJvbShlLCB7XG5cdFx0XHR2ZXJ0aWNlczogQ3ViZVZlcnRpY2VzLFxuXHRcdFx0dXY6IHV2LFxuXHRcdFx0aW5kZXg6IEN1YmVJbmRpY2VzLFxuXHRcdFx0bWF0ZXJpYWxcblx0XHR9LCBpbnN0YW5jZUNvdW50IHx8IDEpO1xuXHR9XG5cblx0cHJpdmF0ZSBidWlsZChlOiBFbmdpbmUsIG1hdGVyaWFsOiBNYXRlcmlhbCwgaW5zdGFuY2VDb3VudD86IG51bWJlcikge1xuXHRcdGNvbnN0IHZlcnRpY2VzID0gbmV3IEZsb2F0MzJBcnJheShbXG5cblx0XHRcdC0wLjUsIC0wLjUsIDAuNSxcblx0XHRcdDAuNSwgLTAuNSwgMC41LFxuXHRcdFx0MC41LCAwLjUsIDAuNSxcblx0XHRcdDAuNSwgMC41LCAwLjUsXG5cdFx0XHQtMC41LCAwLjUsIDAuNSxcblx0XHRcdC0wLjUsIC0wLjUsIDAuNSxcblxuXHRcdFx0LTAuNSwgMC41LCAwLjUsXG5cdFx0XHQtMC41LCAwLjUsIC0wLjUsXG5cdFx0XHQtMC41LCAtMC41LCAtMC41LFxuXHRcdFx0LTAuNSwgLTAuNSwgLTAuNSxcblx0XHRcdC0wLjUsIC0wLjUsIDAuNSxcblx0XHRcdC0wLjUsIDAuNSwgMC41LFxuXG5cdFx0XHQtMC41LCAtMC41LCAtMC41LFxuXHRcdFx0MC41LCAtMC41LCAtMC41LFxuXHRcdFx0MC41LCAtMC41LCAwLjUsXG5cdFx0XHQwLjUsIC0wLjUsIDAuNSxcblx0XHRcdC0wLjUsIC0wLjUsIDAuNSxcblx0XHRcdC0wLjUsIC0wLjUsIC0wLjUsXG5cblx0XHRcdDAuNSwgLTAuNSwgLTAuNSxcblx0XHRcdDAuNSwgMC41LCAtMC41LFxuXHRcdFx0MC41LCAwLjUsIDAuNSxcblx0XHRcdDAuNSwgMC41LCAwLjUsXG5cdFx0XHQwLjUsIC0wLjUsIDAuNSxcblx0XHRcdDAuNSwgLTAuNSwgLTAuNSxcblxuXHRcdFx0MC41LCAwLjUsIC0wLjUsXG5cdFx0XHQwLjUsIC0wLjUsIC0wLjUsXG5cdFx0XHQtMC41LCAtMC41LCAtMC41LFxuXHRcdFx0LTAuNSwgLTAuNSwgLTAuNSxcblx0XHRcdC0wLjUsIDAuNSwgLTAuNSxcblx0XHRcdDAuNSwgMC41LCAtMC41LFxuXG5cblx0XHRcdDAuNSwgMC41LCAwLjUsXG5cdFx0XHQwLjUsIDAuNSwgLTAuNSxcblx0XHRcdC0wLjUsIDAuNSwgLTAuNSxcblx0XHRcdC0wLjUsIDAuNSwgLTAuNSxcblx0XHRcdC0wLjUsIDAuNSwgMC41LFxuXHRcdFx0MC41LCAwLjUsIDAuNSxcblx0XHRdKTtcblxuXHRcdGNvbnN0IHV2ID0gbmV3IEZsb2F0MzJBcnJheShbXG5cdFx0XHQwLjAsIDAuMCxcblx0XHRcdDEuMCwgMC4wLFxuXHRcdFx0MS4wLCAxLjAsXG5cdFx0XHQxLjAsIDEuMCxcblx0XHRcdDAuMCwgMS4wLFxuXHRcdFx0MC4wLCAwLjAsXG5cblx0XHRcdDAuMCwgMC4wLFxuXHRcdFx0MS4wLCAwLjAsXG5cdFx0XHQxLjAsIDEuMCxcblx0XHRcdDEuMCwgMS4wLFxuXHRcdFx0MC4wLCAxLjAsXG5cdFx0XHQwLjAsIDAuMCxcblxuXHRcdFx0MS4wLCAwLjAsXG5cdFx0XHQxLjAsIDEuMCxcblx0XHRcdDAuMCwgMS4wLFxuXHRcdFx0MC4wLCAxLjAsXG5cdFx0XHQwLjAsIDAuMCxcblx0XHRcdDEuMCwgMC4wLFxuXG5cdFx0XHQxLjAsIDAuMCxcblx0XHRcdDEuMCwgMS4wLFxuXHRcdFx0MC4wLCAxLjAsXG5cdFx0XHQwLjAsIDEuMCxcblx0XHRcdDAuMCwgMC4wLFxuXHRcdFx0MS4wLCAwLjAsXG5cblx0XHRcdDAuMCwgMS4wLFxuXHRcdFx0MS4wLCAxLjAsXG5cdFx0XHQxLjAsIDAuMCxcblx0XHRcdDEuMCwgMC4wLFxuXHRcdFx0MC4wLCAwLjAsXG5cdFx0XHQwLjAsIDEuMCxcblxuXHRcdFx0MC4wLCAxLjAsXG5cdFx0XHQxLjAsIDEuMCxcblx0XHRcdDEuMCwgMC4wLFxuXHRcdFx0MS4wLCAwLjAsXG5cdFx0XHQwLjAsIDAuMCxcblx0XHRcdDAuMCwgMS4wXG5cdFx0XSk7XG5cblx0XHR0aGlzLmZyb20oZSwge1xuXHRcdFx0dmVydGljZXMsXG5cdFx0XHR1dixcblx0XHRcdG1hdGVyaWFsLFxuXHRcdFx0aW5kZXg6IG51bGwsXG5cdFx0fSwgaW5zdGFuY2VDb3VudCB8fCAxKTtcblxuXHR9XG59IiwiaW1wb3J0IHtFZGdlLCBGYWNlSW5mbywgRmFjZXNFZGdlLCBNTSwgVmVydGV4fSBmcm9tIFwiLi9NeXJpYWhlZHJhbFwiO1xuXG5lbnVtIFF1YWREaXJlY3Rpb24ge1xuICBMZWZ0LFxuICBSaWdodCxcbiAgVG9wLFxuICBEb3duLFxufVxuXG5leHBvcnQgZW51bSBHcmF0aWN1bGVUeXBlIHtcbiAgQ3lsaW5kcmljYWwsXG4gIENvbmljYWwsXG4gIEF6aW11dGFsLFxuICBBemltdXRhbFR3b0hlbWlzcGhlcmVzLFxuICBQb2x5Y29uaWNhbCxcbiAgU3RyaXAsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JhdGljdWxlUGFyYW1zIHtcbiAgdHlwZTogR3JhdGljdWxlVHlwZTtcbiAgcGFyYWxsZWxzPzogbnVtYmVyO1xuICB1dk9mZnNldD86IFtudW1iZXIsIG51bWJlcl07XG4gIG5hbWU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBHcmF0aWN1bGVzID0gW1xuICB7XG4gICAgdHlwZTogR3JhdGljdWxlVHlwZS5DeWxpbmRyaWNhbCxcbiAgICBwYXJhbGxlbHM6IDExLFxuICAgIG5hbWU6ICdDeWxpbmRyaWNhbCcsXG4gIH0sXG4gIHtcbiAgICB0eXBlOiBHcmF0aWN1bGVUeXBlLkNvbmljYWwsXG4gICAgbmFtZTogJ0NvbmljYWwnLFxuICB9LFxuICB7XG4gICAgdHlwZTogR3JhdGljdWxlVHlwZS5BemltdXRhbCxcbiAgICBuYW1lOiAnQXppbXV0YWwnLFxuICB9LFxuICB7XG4gICAgdHlwZTogR3JhdGljdWxlVHlwZS5BemltdXRhbFR3b0hlbWlzcGhlcmVzLFxuICAgIG5hbWU6ICdBemltdXRhbCB0d28gaGVtaXNwaGVyZXMnLFxuICB9LFxuICB7XG4gICAgdHlwZTogR3JhdGljdWxlVHlwZS5Qb2x5Y29uaWNhbCxcbiAgICBuYW1lOiAnUG9seWNvbmljYWwnLFxuICB9LFxuICB7XG4gICAgdHlwZTogR3JhdGljdWxlVHlwZS5TdHJpcCxcbiAgICBuYW1lOiAnU3RyaXAnLFxuICAgIHBhcmFsbGVsczogMTQsXG4gIH1cbl07XG5cbmV4cG9ydCBjbGFzcyBHcmF0aWN1bGUge1xuXG4gIHZlcnRpY2VzOiBWZXJ0ZXhbXSA9IFtdO1xuICBmYWNlcyA9IG5ldyBNYXA8bnVtYmVyLCBGYWNlSW5mbz4oKTtcbiAgZm9sZHM6IEZhY2VzRWRnZVtdID0gW107XG4gIHJvb3Q6IEZhY2VzRWRnZTtcblxuICBwcml2YXRlIHBhcmFsbGVscyA9IDA7XG4gIHByaXZhdGUgY29ubmVjdGVkUXVhZHMgPSBuZXcgTU08RmFjZXNFZGdlPigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBidWlsZChwOiBHcmF0aWN1bGVQYXJhbXMpIHtcbiAgICB0aGlzLnBhcmFsbGVscyA9IHAucGFyYWxsZWxzID8/IDI0O1xuICAgIHRoaXMuYnVpbGRWZXJ0aWNlc0FuZEZhY2VzKCk7XG4gICAgdGhpcy5zZXRFZGdlc0ZhY2VJbmRpY2VzKCk7XG4gICAgdGhpcy5jb25uZWN0R3JhdGljdWxlKHAudHlwZSk7XG4gICAgdGhpcy5maWx0ZXJPdXRJbnZhbGlkRmFjZXMoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgY29ubmVjdEdyYXRpY3VsZSh0OiBHcmF0aWN1bGVUeXBlKSB7XG4gICAgc3dpdGNoICh0KSB7XG4gICAgICBjYXNlIEdyYXRpY3VsZVR5cGUuQXppbXV0YWw6XG4gICAgICAgIHRoaXMuY29ubmVjdEdyYXRpY3VsZUF6aW11dGFsKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHcmF0aWN1bGVUeXBlLkF6aW11dGFsVHdvSGVtaXNwaGVyZXM6XG4gICAgICAgIHRoaXMuY29ubmVjdEdyYXRpY3VsZUF6aW11dGFsVHdvSGVtaXNwaGVyZXMoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdyYXRpY3VsZVR5cGUuQ29uaWNhbDpcbiAgICAgICAgdGhpcy5jb25uZWN0R3JhdGljdWxlQ29uaWNhbCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR3JhdGljdWxlVHlwZS5DeWxpbmRyaWNhbDpcbiAgICAgICAgdGhpcy5jb25uZWN0R3JhdGljdWxlQ3lsaW5kcmljYWwoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdyYXRpY3VsZVR5cGUuUG9seWNvbmljYWw6XG4gICAgICAgIHRoaXMuY29ubmVjdEdyYXRpY3VsZVBvbHljb25pY2FsKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHcmF0aWN1bGVUeXBlLlN0cmlwOlxuICAgICAgICB0aGlzLmNvbm5lY3RTdHJpcCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biBncmF0aWN1bGUgdHlwZTogJHt0fWApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmlsdGVyT3V0SW52YWxpZEZhY2VzKCkge1xuICAgIHRoaXMuZm9sZHMgPSB0aGlzLmZvbGRzLmZpbHRlcihmID0+IHtcbiAgICAgIHJldHVybiBmLmZyb21GYWNlSW5kZXggIT09IG51bGwgJiYgZi50b0ZhY2VJbmRleCAhPT0gbnVsbDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY29ubmVjdEdyYXRpY3VsZUN5bGluZHJpY2FsKCkge1xuICAgIHRoaXMuY29ubmVjdEdyYXRpY3VsZUN5bGluZHJpY2FsT3JDb25pY2FsKCh0aGlzLnBhcmFsbGVscyAvIDIpIHwgMCwgdGhpcy5wYXJhbGxlbHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb25uZWN0R3JhdGljdWxlQ29uaWNhbCgpIHtcbiAgICB0aGlzLmNvbm5lY3RHcmF0aWN1bGVDeWxpbmRyaWNhbE9yQ29uaWNhbCgodGhpcy5wYXJhbGxlbHMgLyAzKSB8IDAsIHRoaXMucGFyYWxsZWxzKTtcbiAgfVxuXG4gIHByaXZhdGUgY29ubmVjdEdyYXRpY3VsZUN5bGluZHJpY2FsT3JDb25pY2FsKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciApIHtcblxuXG4gICAgdGhpcy5zdGFydEZvbGRzQ29ubmVjdGlvbnMocm93LCBjb2wpO1xuXG4gICAgLy8gaG9yaXpvbnRhbCBjb25uZWN0aW9uXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPD0gdGhpcy5wYXJhbGxlbHM7IGorKykge1xuICAgICAgdGhpcy5jb25uZWN0UXVhZEJ5RGlyZWN0aW9uKHJvdywgY29sLWosIFF1YWREaXJlY3Rpb24uTGVmdCk7XG4gICAgICB0aGlzLmNvbm5lY3RRdWFkQnlEaXJlY3Rpb24ocm93LCBjb2wraiwgUXVhZERpcmVjdGlvbi5SaWdodCk7XG4gICAgfVxuXG4gICAgLy8gdmVydGljYWwgY29ubmVjdGlvbnMgKHVwKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5wYXJhbGxlbHMgKiAyOyBqKyspIHtcbiAgICAgICAgdGhpcy5jb25uZWN0UXVhZEJ5RGlyZWN0aW9uKHJvdyAtIGksIGosIFF1YWREaXJlY3Rpb24uVG9wKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB2ZXJ0aWNhbCBjb25uZWN0aW9ucyAoZG93bilcbiAgICBjb25zdCB0MSA9IHRoaXMucGFyYWxsZWxzIC0gcm93O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdDE7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnBhcmFsbGVscyAqIDI7IGorKykge1xuICAgICAgICB0aGlzLmNvbm5lY3RRdWFkQnlEaXJlY3Rpb24oIHJvdyArIGksIGosIFF1YWREaXJlY3Rpb24uRG93bik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yb290LnBhcmVudCA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGNvbm5lY3RTdHJpcCgpIHtcblxuICAgIGNvbnN0IHJvdyA9IDE7XG4gICAgY29uc3QgY29sID0gMDtcblxuICAgIHRoaXMuc3RhcnRGb2xkc0Nvbm5lY3Rpb25zKHJvdywgY29sKTtcblxuICAgIC8vIGxpbmVzXG4gICAgZm9yKGxldCBpID0gcm93OyBpIDwgdGhpcy5wYXJhbGxlbHMtMTsgaSsrKSB7XG5cbiAgICAgIGlmICgoaSAlIDIpID09PSAxKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5wYXJhbGxlbHMgKiAyOyBqKyspIHtcbiAgICAgICAgICB0aGlzLmNvbm5lY3RRdWFkQnlEaXJlY3Rpb24oaSwgaiwgUXVhZERpcmVjdGlvbi5SaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25uZWN0UXVhZEJ5RGlyZWN0aW9uKGksIHRoaXMucGFyYWxsZWxzICogMiAtIDEsIFF1YWREaXJlY3Rpb24uRG93bik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBqID0gdGhpcy5wYXJhbGxlbHMgKiAyIC0gMTsgaiA+IDA7IGotLSkge1xuICAgICAgICAgIHRoaXMuY29ubmVjdFF1YWRCeURpcmVjdGlvbihpLCBqLCBRdWFkRGlyZWN0aW9uLkxlZnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29ubmVjdFF1YWRCeURpcmVjdGlvbihpLCAwLCBRdWFkRGlyZWN0aW9uLkRvd24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5wYXJhbGxlbHMgKiAyOyBqKyspIHtcbiAgICAgIHRoaXMuY29ubmVjdFF1YWRCeURpcmVjdGlvbiggcm93LCBqLCBRdWFkRGlyZWN0aW9uLlRvcCk7XG4gICAgICB0aGlzLmNvbm5lY3RRdWFkQnlEaXJlY3Rpb24oIHRoaXMucGFyYWxsZWxzLTIsIGosIFF1YWREaXJlY3Rpb24uRG93bik7XG4gICAgfVxuXG4gICAgdGhpcy5yb290LnBhcmVudCA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGNvbm5lY3RHcmF0aWN1bGVBemltdXRhbFR3b0hlbWlzcGhlcmVzKCkge1xuICAgIGNvbnN0IG1pZCA9ICh0aGlzLnBhcmFsbGVscyAvIDIpfDA7XG5cbiAgICB0aGlzLnN0YXJ0Rm9sZHNDb25uZWN0aW9ucyhtaWQsIHRoaXMucGFyYWxsZWxzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMiAqIHRoaXMucGFyYWxsZWxzIC0gMTsgaSsrKSB7XG4gICAgICB0aGlzLmNvbm5lY3RRdWFkQnlEaXJlY3Rpb24oMCwgaSwgUXVhZERpcmVjdGlvbi5SaWdodCk7XG4gICAgICB0aGlzLmNvbm5lY3RRdWFkQnlEaXJlY3Rpb24odGhpcy5wYXJhbGxlbHMgLSAxLCBpLCBRdWFkRGlyZWN0aW9uLlJpZ2h0KTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1pZDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMucGFyYWxsZWxzICogMjsgaisrKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdFF1YWRCeURpcmVjdGlvbihtaWQgLSBpIC0gMSwgaiwgUXVhZERpcmVjdGlvbi5Ub3ApO1xuICAgICAgICB0aGlzLmNvbm5lY3RRdWFkQnlEaXJlY3Rpb24oIG1pZCArIGksIGosIFF1YWREaXJlY3Rpb24uRG93bik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnBhcmFsbGVscyAqIDI7IGorKykge1xuICAgICAgdGhpcy5jb25uZWN0UXVhZChtaWQsIGopO1xuICAgICAgdGhpcy5jb25uZWN0UXVhZChtaWQgLSAxLCBqKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbm5lY3RRdWFkQnlEaXJlY3Rpb24obWlkLCB0aGlzLnBhcmFsbGVscywgUXVhZERpcmVjdGlvbi5Ub3ApO1xuXG4gICAgdGhpcy5yb290LnBhcmVudCA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGNvbm5lY3RHcmF0aWN1bGVBemltdXRhbCgpIHtcbiAgICB0aGlzLnN0YXJ0Rm9sZHNDb25uZWN0aW9ucygwLCAwKTtcblxuICAgIC8vIGhvcml6b250YWwgZmlyc3Qgcm93XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyICogdGhpcy5wYXJhbGxlbHMgLSAxOyBpKyspIHtcbiAgICAgIHRoaXMuY29ubmVjdFF1YWRCeURpcmVjdGlvbigwLCBpLCBRdWFkRGlyZWN0aW9uLlJpZ2h0KTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFyYWxsZWxzIC0gMTsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMucGFyYWxsZWxzICogMjsgaisrKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdFF1YWRCeURpcmVjdGlvbihpLCBqLCBRdWFkRGlyZWN0aW9uLkRvd24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucm9vdC5wYXJlbnQgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBjb25uZWN0R3JhdGljdWxlUG9seWNvbmljYWwoKSB7XG4gICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcih0aGlzLnBhcmFsbGVscy8yKTtcblxuICAgIHRoaXMuc3RhcnRGb2xkc0Nvbm5lY3Rpb25zKHJvdywgdGhpcy5wYXJhbGxlbHMpO1xuXG4gICAgZm9yIChsZXQgaSA9IHJvdzsgaT4wOyBpLS0pIHtcbiAgICAgIHRoaXMuY29ubmVjdFF1YWRCeURpcmVjdGlvbihpLCB0aGlzLnBhcmFsbGVscywgUXVhZERpcmVjdGlvbi5Ub3ApO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSByb3c7IGk8dGhpcy5wYXJhbGxlbHM7IGkrKykge1xuICAgICAgdGhpcy5jb25uZWN0UXVhZEJ5RGlyZWN0aW9uKGksIHRoaXMucGFyYWxsZWxzLCBRdWFkRGlyZWN0aW9uLkRvd24pO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5wYXJhbGxlbHMtMTsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gdGhpcy5wYXJhbGxlbHM7IGogPiAwOyBqLS0pIHtcbiAgICAgICAgdGhpcy5jb25uZWN0UXVhZEJ5RGlyZWN0aW9uKGksIGosIFF1YWREaXJlY3Rpb24uTGVmdCk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBqID0gdGhpcy5wYXJhbGxlbHM7IGogPCAyICogdGhpcy5wYXJhbGxlbHMgLSAxOyBqKyspIHtcbiAgICAgICAgdGhpcy5jb25uZWN0UXVhZEJ5RGlyZWN0aW9uKGksIGosIFF1YWREaXJlY3Rpb24uUmlnaHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wYXJhbGxlbHMqMiAtIDE7IGkrKykge1xuICAgICAgdGhpcy5jb25uZWN0UXVhZEJ5RGlyZWN0aW9uKDAsIGksIFF1YWREaXJlY3Rpb24uUmlnaHQpO1xuICAgICAgdGhpcy5jb25uZWN0UXVhZEJ5RGlyZWN0aW9uKHRoaXMucGFyYWxsZWxzIC0gMSwgaSwgUXVhZERpcmVjdGlvbi5SaWdodCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmYWNlSW5kZXhGb3JRdWFkQXQocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyLCBkPzogUXVhZERpcmVjdGlvbik6IG51bWJlciB7XG4gICAgcmV0dXJuIChyb3cgKiB0aGlzLnBhcmFsbGVscyAqIDIgKyBjb2x1bW4pICogMiArIChkICE9PSB1bmRlZmluZWQgPyAxIDogMCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0Rm9sZHNDb25uZWN0aW9ucyhyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIpIHtcbiAgICB0aGlzLnJvb3QgPSB0aGlzLmNvbm5lY3RRdWFkKHJvdywgY29sdW1uKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UXVhZENvbW1vbkVkZ2Uocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogRWRnZSB7XG4gICAgY29uc3QgbyA9IHRoaXMuZmFjZUluZGV4Rm9yUXVhZEF0KHJvdywgY29sdW1uKTtcbiAgICByZXR1cm4gdGhpcy5mYWNlcy5nZXQobykuZWRnZXNbMl07XG4gIH1cblxuICBwcml2YXRlIGdldFRyaWFuZ2xlRWRnZShyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIsIGluYzogbnVtYmVyKTogRWRnZSB7XG5cbiAgICBsZXQgZTogRWRnZTtcblxuICAgIGlmIChyb3c9PT0wKSB7XG5cbiAgICAgIGNvbnN0IG8gPSB0aGlzLmZhY2VJbmRleEZvclF1YWRBdChyb3csIGNvbHVtbikgKyAxO1xuICAgICAgZSA9IHRoaXMuZmFjZXMuZ2V0KG8pLmVkZ2VzWzBdO1xuICAgICAgZS5mYWNlSW5kaWNlc1sxXSA9IG8gKyBpbmM7XG5cbiAgICB9IGVsc2UgaWYgKHJvdz09PXRoaXMucGFyYWxsZWxzLTEpIHtcblxuICAgICAgY29uc3QgbyA9IHRoaXMuZmFjZUluZGV4Rm9yUXVhZEF0KHJvdywgY29sdW1uKSA7XG4gICAgICBlID0gdGhpcy5mYWNlcy5nZXQobykuZWRnZXNbMV07XG4gICAgICBlLmZhY2VJbmRpY2VzWzFdID0gbyArIGluYztcbiAgICB9XG5cbiAgICByZXR1cm4gZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VHJpYW5nbGVSaWdodEVkZ2Uocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogRWRnZSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VHJpYW5nbGVFZGdlKHJvdywgY29sdW1uLCAyKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VHJpYW5nbGVMZWZ0RWRnZShyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIpOiBFZGdlIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUcmlhbmdsZUVkZ2Uocm93LCBjb2x1bW4sIC0yKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UXVhZFJpZ2h0RWRnZShyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIpOiBFZGdlIHtcbiAgICBjb25zdCBvID0gdGhpcy5mYWNlSW5kZXhGb3JRdWFkQXQocm93LCBjb2x1bW4pO1xuICAgIHJldHVybiB0aGlzLmZhY2VzLmdldChvKS5lZGdlc1sxXTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UXVhZFRvcEVkZ2Uocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogRWRnZSB7XG4gICAgY29uc3QgbyA9IHRoaXMuZmFjZUluZGV4Rm9yUXVhZEF0KHJvdywgY29sdW1uKTtcbiAgICByZXR1cm4gdGhpcy5mYWNlcy5nZXQobykuZWRnZXNbMF07XG4gIH1cblxuICBwcml2YXRlIGdldFF1YWRCb3R0b21FZGdlKHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcik6IEVkZ2Uge1xuICAgIGNvbnN0IG8gPSB0aGlzLmZhY2VJbmRleEZvclF1YWRBdChyb3csIGNvbHVtbiwgUXVhZERpcmVjdGlvbi5Eb3duKTtcbiAgICByZXR1cm4gdGhpcy5mYWNlcy5nZXQobykuZWRnZXNbMV07XG4gIH1cblxuICBwcml2YXRlIGdldFF1YWRMZWZ0RWRnZShyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIpOiBFZGdlIHtcbiAgICBjb25zdCBvID0gdGhpcy5mYWNlSW5kZXhGb3JRdWFkQXQocm93LCBjb2x1bW4sIFF1YWREaXJlY3Rpb24uTGVmdCk7XG4gICAgcmV0dXJuIHRoaXMuZmFjZXMuZ2V0KG8pLmVkZ2VzWzJdO1xuICB9XG5cbiAgcHJpdmF0ZSBjb25uZWN0UXVhZChyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIpOiBGYWNlc0VkZ2Uge1xuICAgIGxldCBlZGdlID0gdGhpcy5jb25uZWN0ZWRRdWFkcy5nZXQocm93LCBjb2x1bW4pO1xuXG4gICAgaWYgKCFlZGdlKSB7XG4gICAgICBlZGdlID0gbmV3IEZhY2VzRWRnZSh0aGlzLmdldFF1YWRDb21tb25FZGdlKHJvdywgY29sdW1uKSk7XG4gICAgICB0aGlzLmZvbGRzLnB1c2goZWRnZSk7XG4gICAgICB0aGlzLmNvbm5lY3RlZFF1YWRzLmluc2VydChyb3csIGNvbHVtbiwgZWRnZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2U7XG4gIH1cblxuICBwcml2YXRlIGNvbm5lY3RRdWFkQnlEaXJlY3Rpb24ocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyLCBkOiBRdWFkRGlyZWN0aW9uKTogRmFjZXNFZGdlIHtcbiAgICBjb25zdCBuZSA9IHRoaXMuZm9sZEJ5RGlyZWN0aW9uKHJvdywgY29sdW1uLCBkKTtcbiAgICBpZiAobmUpIHtcbiAgICAgIHRoaXMuZm9sZHMucHVzaChuZSk7XG4gICAgICByZXR1cm4gbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ25vbm8nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSByb3dXaXRoUXVhZHMocjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHIgPiAwICYmIHIgPCB0aGlzLnBhcmFsbGVscyAtIDE7XG4gIH1cblxuICBwcml2YXRlIGZvbGRCeURpcmVjdGlvbihyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIsIGQ6IFF1YWREaXJlY3Rpb24pOiBGYWNlc0VkZ2Uge1xuXG4gICAgbGV0IHI6IEZhY2VzRWRnZTtcbiAgICBsZXQgbnE6IEZhY2VzRWRnZTtcblxuICAgIHN3aXRjaCAoZCkge1xuICAgICAgY2FzZSBRdWFkRGlyZWN0aW9uLkxlZnQ6XG4gICAgICAgIGlmIChjb2x1bW4gPiAwKSB7XG4gICAgICAgICAgaWYgKHRoaXMucm93V2l0aFF1YWRzKHJvdykpIHtcbiAgICAgICAgICAgIG5xID0gdGhpcy5jb25uZWN0UXVhZChyb3csIGNvbHVtbiAtIDEpO1xuICAgICAgICAgICAgciA9IG5ldyBGYWNlc0VkZ2UodGhpcy5nZXRRdWFkTGVmdEVkZ2Uocm93LCBjb2x1bW4pKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgciA9IG5ldyBGYWNlc0VkZ2UodGhpcy5nZXRUcmlhbmdsZUxlZnRFZGdlKHJvdywgY29sdW1uKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBRdWFkRGlyZWN0aW9uLlJpZ2h0OlxuICAgICAgICBpZiAoY29sdW1uIDwgMiAqIHRoaXMucGFyYWxsZWxzIC0gMSkge1xuICAgICAgICAgIGlmICh0aGlzLnJvd1dpdGhRdWFkcyhyb3cpKSB7XG4gICAgICAgICAgICBucSA9IHRoaXMuY29ubmVjdFF1YWQocm93LCBjb2x1bW4gKyAxKTtcbiAgICAgICAgICAgIHIgPSBuZXcgRmFjZXNFZGdlKHRoaXMuZ2V0UXVhZFJpZ2h0RWRnZShyb3csIGNvbHVtbikpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByID0gbmV3IEZhY2VzRWRnZSh0aGlzLmdldFRyaWFuZ2xlUmlnaHRFZGdlKHJvdywgY29sdW1uKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBRdWFkRGlyZWN0aW9uLlRvcDpcbiAgICAgICAgaWYgKHJvdyA+IDApIHtcbiAgICAgICAgICBpZiAodGhpcy5yb3dXaXRoUXVhZHMocm93LTEpKSB7XG4gICAgICAgICAgICBucSA9IHRoaXMuY29ubmVjdFF1YWQocm93IC0gMSwgY29sdW1uKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgciA9IG5ldyBGYWNlc0VkZ2UodGhpcy5nZXRRdWFkVG9wRWRnZShyb3csIGNvbHVtbikpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBRdWFkRGlyZWN0aW9uLkRvd246XG4gICAgICAgIGlmIChyb3cgPCB0aGlzLnBhcmFsbGVscyAtIDEpIHtcbiAgICAgICAgICBpZiAodGhpcy5yb3dXaXRoUXVhZHMocm93KzEpKSB7XG4gICAgICAgICAgICBucSA9IHRoaXMuY29ubmVjdFF1YWQocm93ICsgMSwgY29sdW1uKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgciA9IG5ldyBGYWNlc0VkZ2UodGhpcy5nZXRRdWFkQm90dG9tRWRnZShyb3csIGNvbHVtbikpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChyKSB7XG4gICAgICByLnBhcmVudCA9IHRoaXMuY29ubmVjdGVkUXVhZHMuZ2V0KHJvdywgY29sdW1uKTtcbiAgICAgIGlmIChucSAmJiAhbnEucGFyZW50KSB7XG4gICAgICAgIG5xLnBhcmVudCA9IHI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjb25zb2xlLmVycm9yKGBxdWFkIGZvbGQgd2l0aCBwYXJlbnRgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcjtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHNwaGVyaWNhbCh0OiBudW1iZXIsIHU6IG51bWJlcikge1xuXG4gICAgdCAqPSBNYXRoLlBJICogMjtcbiAgICB1ICo9IE1hdGguUElcblxuICAgIHJldHVybiBuZXcgVmVydGV4KFxuICAgICAgTWF0aC5zaW4odSkgKiBNYXRoLmNvcyh0KSxcbiAgICAgIE1hdGguY29zKHUpLFxuICAgICAgTWF0aC5zaW4odSkgKiBNYXRoLnNpbih0KSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZFZlcnRpY2VzQW5kRmFjZXMoKSB7XG4gICAgY29uc3Qgcm93cyA9IHRoaXMucGFyYWxsZWxzO1xuICAgIGNvbnN0IGNvbHMgPSB0aGlzLnBhcmFsbGVscyAqIDI7XG5cbiAgICBjb25zdCB2ZXJ0ZXhQZXJSb3cgPSBjb2xzICsgMTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHM7IGorKykge1xuICAgICAgICBjb25zdCBwMCA9IEdyYXRpY3VsZS5zcGhlcmljYWwoaiAvIGNvbHMsIGkgLyByb3dzKTtcbiAgICAgICAgY29uc3QgcDEgPSBHcmF0aWN1bGUuc3BoZXJpY2FsKChqICsgMSkgLyBjb2xzLCBpIC8gcm93cyk7XG4gICAgICAgIGNvbnN0IHAyID0gR3JhdGljdWxlLnNwaGVyaWNhbCgoaiArIDEpIC8gY29scywgKGkgKyAxKSAvIHJvd3MpO1xuICAgICAgICBjb25zdCBwMyA9IEdyYXRpY3VsZS5zcGhlcmljYWwoaiAvIGNvbHMsIChpICsgMSkgLyByb3dzKTtcblxuICAgICAgICBjb25zdCBmaTAgPSB0aGlzLmFkZEZhY2UocDAuY2xvbmUoKSwgcDEuY2xvbmUoKSwgcDIuY2xvbmUoKSk7XG4gICAgICAgIGZpMC5wcmV2VmVydGljZXNJbmRpY2VzID0gW1xuICAgICAgICAgIGkgKiB2ZXJ0ZXhQZXJSb3cgKyBqLFxuICAgICAgICAgIGkgKiB2ZXJ0ZXhQZXJSb3cgKyBqICsgMSxcbiAgICAgICAgICAoaSArIDEpICogdmVydGV4UGVyUm93ICsgaiArIDEsXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgZmkxID0gdGhpcy5hZGRGYWNlKHAwLmNsb25lKCksIHAyLmNsb25lKCksIHAzLmNsb25lKCkpO1xuICAgICAgICBmaTEucHJldlZlcnRpY2VzSW5kaWNlcyA9IFtcbiAgICAgICAgICBpICogdmVydGV4UGVyUm93ICsgaixcbiAgICAgICAgICAoaSArIDEpICogdmVydGV4UGVyUm93ICsgaiArIDEsXG4gICAgICAgICAgKGkgKyAxKSAqIHZlcnRleFBlclJvdyArIGosXG4gICAgICAgIF07XG5cbiAgICAgICAgaWYgKGZpMFswXSAhPT0gZmkxWzBdIHx8IGZpMFsyXSAhPT0gZmkxWzFdKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgd3JvbmcgY29tbW9uIGF4aXMgZGVmYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZFZlcnRleCh2OiBWZXJ0ZXgpIHtcbiAgICB2LmluZGV4ID0gdGhpcy52ZXJ0aWNlcy5sZW5ndGg7XG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKHYpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRGYWNlKHAwOiBWZXJ0ZXgsIHAxOiBWZXJ0ZXgsIHAyOiBWZXJ0ZXgpOiBGYWNlSW5mbyB7XG4gICAgdGhpcy5hZGRWZXJ0ZXgocDApO1xuICAgIHRoaXMuYWRkVmVydGV4KHAxKTtcbiAgICB0aGlzLmFkZFZlcnRleChwMik7XG5cbiAgICBjb25zdCB2ZXJ0aWNlcyA9IFtwMCwgcDEsIHAyXTtcbiAgICBjb25zdCBmaTogRmFjZUluZm8gPSB7XG4gICAgICB2ZXJ0aWNlcyxcbiAgICAgIG5vcm1hbDogVmVydGV4Lm5vcm1hbEZvclZlcnRpY2VzKHZlcnRpY2VzKSxcbiAgICAgIGlkOiB0aGlzLmZhY2VzLnNpemUsXG4gICAgICBwcmV2SWQ6IHRoaXMuZmFjZXMuc2l6ZSxcbiAgICAgIHByZXZWZXJ0aWNlc0luZGljZXM6IFtwMC5pbmRleCwgcDEuaW5kZXgsIHAyLmluZGV4XSxcbiAgICAgIGVkZ2VzOiBbXG4gICAgICAgIG5ldyBFZGdlKHAwLmluZGV4LCBwMS5pbmRleCksXG4gICAgICAgIG5ldyBFZGdlKHAxLmluZGV4LCBwMi5pbmRleCksXG4gICAgICAgIG5ldyBFZGdlKHAyLmluZGV4LCBwMC5pbmRleCksXG4gICAgICBdLFxuICAgIH1cbiAgICB0aGlzLmZhY2VzLnNldChmaS5pZCwgZmkpO1xuXG4gICAgcmV0dXJuIGZpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRFZGdlc0ZhY2VJbmRpY2VzKCkge1xuXG4gICAgLy8gZWRnZXMgY29ubmVjdGlvbnM6XG4gICAgY29uc3Qgcm93cyA9IHRoaXMucGFyYWxsZWxzO1xuICAgIGNvbnN0IGNvbHMgPSB0aGlzLnBhcmFsbGVscyAqIDIgKiAyO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sczsgaisrKSB7XG5cbiAgICAgICAgY29uc3QgZmFjZUluZGV4ID0gaiArIGkgKiBjb2xzO1xuICAgICAgICBjb25zdCBmYWNlSW5mbyA9IHRoaXMuZmFjZXMuZ2V0KGZhY2VJbmRleCk7XG4gICAgICAgIGNvbnN0IGVkZ2VzID0gZmFjZUluZm8uZWRnZXM7XG5cbiAgICAgICAgaWYgKChmYWNlSW5kZXggJSAyKSA9PT0gMCkge1xuICAgICAgICAgIC8vIHRvcCBlZGdlLiBDb25uZWN0IHRvIHJvdyBhYm92ZSsxXG4gICAgICAgICAgdGhpcy5lZGdlRmFjZUluZGljZXMoZWRnZXNbMF0sIGZhY2VJbmRleCwgaiArIDEgKyAoaSAtIDEpICogY29scyk7XG4gICAgICAgICAgLy8gcmlnaHQgZWRnZS4gY29ubmVjdCB0byBpbmRleCsyXG4gICAgICAgICAgdGhpcy5lZGdlRmFjZUluZGljZXMoZWRnZXNbMV0sIGZhY2VJbmRleCwgZmFjZUluZGV4ICsgMyk7XG4gICAgICAgICAgLy8gY29tbW9uIGVkZ2VcbiAgICAgICAgICB0aGlzLmVkZ2VGYWNlSW5kaWNlcyhlZGdlc1syXSwgZmFjZUluZGV4LCBmYWNlSW5kZXggKyAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBjb21tb24gZWRnZVxuICAgICAgICAgIHRoaXMuZWRnZUZhY2VJbmRpY2VzKGVkZ2VzWzBdLCBmYWNlSW5kZXgsIGZhY2VJbmRleCAtIDEpO1xuICAgICAgICAgIC8vIGJvdHRvbSBlZGdlXG4gICAgICAgICAgdGhpcy5lZGdlRmFjZUluZGljZXMoZWRnZXNbMV0sIGZhY2VJbmRleCwgaiArIChpICsgMSkgKiBjb2xzIC0gMSk7XG4gICAgICAgICAgLy8gbGVmdCBlZGdlXG4gICAgICAgICAgdGhpcy5lZGdlRmFjZUluZGljZXMoZWRnZXNbMl0sIGZhY2VJbmRleCwgZmFjZUluZGV4IC0gMyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVkZ2VGYWNlSW5kaWNlcyhlZGdlOiBFZGdlLCBpMDogbnVtYmVyLCBpMTogbnVtYmVyKSB7XG4gICAgaWYgKGkxID49IDAgJiYgaTEgPCB0aGlzLmZhY2VzLnNpemUpIHtcbiAgICAgIGVkZ2UuZmFjZUluZGljZXNbMF0gPSBpMDtcbiAgICAgIGVkZ2UuZmFjZUluZGljZXNbMV0gPSBpMTtcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgVmVjdG9yMyBmcm9tIFwiLi4vLi4vbWF0aC9WZWN0b3IzXCI7XG5pbXBvcnQgUXVhdGVybmlvbiBmcm9tIFwiLi4vLi4vbWF0aC9RdWF0ZXJuaW9uXCI7XG5pbXBvcnQge0VkZ2VUeXBlLCBGYWNlVHlwZSwgTXlyaWFoZWRyb25HZW9tZXRyeX0gZnJvbSBcIi4vU29saWRzXCI7XG5pbXBvcnQge0dyYXRpY3VsZSwgR3JhdGljdWxlUGFyYW1zfSBmcm9tIFwiLi9HcmF0aWN1bGVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBHZW9tZXRyeUluZm9JbmRleGVkIHtcblx0dmVydGljZXM6IEZsb2F0MzJBcnJheTtcblx0aW5kZXg6IFVpbnQxNkFycmF5O1xuXHR1djogRmxvYXQzMkFycmF5O1xuXHRmb2xkczogTVNUTm9kZVtdO1xuXHRjdXRzOiBFZGdlW107XG5cdGZvbGRzTVNUOiBGYWNlc0VkZ2VbXTtcbn1cblxuZXhwb3J0IGNsYXNzIFZlcnRleCB7XG5cblx0aW5kZXggPSAwO1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyB4OiBudW1iZXIsIHB1YmxpYyB5OiBudW1iZXIsIHB1YmxpYyB6OiBudW1iZXIpIHtcblx0fVxuXG5cdHN0YXRpYyBtaWRkbGUodjA6IFZlcnRleCwgdjE6IFZlcnRleCkge1xuXHRcdHJldHVybiBuZXcgVmVydGV4KFxuXHRcdFx0djAueCArICh2MS54IC0gdjAueCkgLyAyLixcblx0XHRcdHYwLnkgKyAodjEueSAtIHYwLnkpIC8gMi4sXG5cdFx0XHR2MC56ICsgKHYxLnogLSB2MC56KSAvIDIuLFxuXHRcdCk7XG5cdH1cblxuXHRub3JtYWxpemUoKSB7XG5cdFx0Y29uc3QgbCA9IDEgLyBNYXRoLnNxcnQodGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56KTtcblxuXHRcdHRoaXMueCAqPSBsO1xuXHRcdHRoaXMueSAqPSBsO1xuXHRcdHRoaXMueiAqPSBsO1xuXHR9XG5cblx0ZG90KG86IFZlcnRleCkge1xuXHRcdC8vIGFzc3VtZXMgbm9ybWFsaXplZC5cblx0XHRyZXR1cm4gdGhpcy54Km8ueCArIHRoaXMueSpvLnkgKyB0aGlzLnoqby56O1xuXHR9XG5cblx0Y2xvbmUoKTogVmVydGV4IHtcblx0XHRjb25zdCB2ID0gbmV3IFZlcnRleCh0aGlzLngsIHRoaXMueSwgdGhpcy56KTtcblx0XHR2LmluZGV4ID0gdGhpcy5pbmRleDtcblx0XHRyZXR1cm4gdjtcblx0fVxuXG5cdGNvcHkobzogVmVydGV4KSB7XG5cdFx0dGhpcy54ID0gby54O1xuXHRcdHRoaXMueSA9IG8ueTtcblx0XHR0aGlzLnogPSBvLno7XG5cdH1cblxuXHRlcXVhbHMobzogVmVydGV4KTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIE1hdGguYWJzKHRoaXMueCAtIG8ueCkgPCAxZS05ICYmXG5cdFx0XHRNYXRoLmFicyh0aGlzLnkgLSBvLnkpIDwgMWUtOSAmJlxuXHRcdFx0TWF0aC5hYnModGhpcy56IC0gby56KSA8IDFlLTk7XG5cdH1cblxuXHRzdGF0aWMgbm9ybWFsRm9yVmVydGljZXModjogVmVydGV4W10pOiBudW1iZXJbXSB7XG5cdFx0Y29uc3QgeDAgPSB2WzBdLnggLSB2WzFdLng7XG5cdFx0Y29uc3QgeTAgPSB2WzBdLnkgLSB2WzFdLnk7XG5cdFx0Y29uc3QgejAgPSB2WzBdLnogLSB2WzFdLno7XG5cblx0XHRjb25zdCB4MSA9IHZbMF0ueCAtIHZbMl0ueDtcblx0XHRjb25zdCB5MSA9IHZbMF0ueSAtIHZbMl0ueTtcblx0XHRjb25zdCB6MSA9IHZbMF0ueiAtIHZbMl0uejtcblxuXHRcdGNvbnN0IHggPSB5MCAqIHoxIC0gejAgKiB5MTtcblx0XHRjb25zdCB5ID0gejAgKiB4MSAtIHgwICogejE7XG5cdFx0Y29uc3QgeiA9IHgwICogeTEgLSB5MCAqIHgxO1xuXG5cdFx0Y29uc3QgbCA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xuXG5cdFx0aWYgKGw9PT0wKSB7XG5cdFx0XHQvLyB0aGVyZSdzIG5vIG5vcm1hbC4gU2luY2Ugd2UgYXJlIGluIGFuIGdvbmlvbWV0cmljIHNwaGVyZSwgdGhpcyBzaG91bGQgYmUgZmluZS5cblx0XHRcdHJldHVybiBbdlswXS54LCB2WzBdLnksIHZbMF0uel07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFt4IC8gbCwgeSAvIGwsIHogLyBsXTtcblx0fVxufVxuXG4vLyBmcm9tIHZlcnRleCB0byB2ZXJ0ZXgsIGJlbG9uZ3Mgd2l0aCBmYWNlSW5kZXguXG5leHBvcnQgaW50ZXJmYWNlIEVkZ2VJbmZvIHtcblx0ZnJvbVZlcnRleDogbnVtYmVyO1xuXHR0b1ZlcnRleDogbnVtYmVyO1xuXHRmYWNlSW5kZXg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEVkZ2Uge1xuXG5cdHcwID0gMDtcblx0dzEgPSAwO1xuXHR3YyA9IDA7XG5cblx0Y2VudGVySW5kZXggPSAtMTtcdC8vIHdoZW4gYW4gZWRnZSBpcyBzcGxpdCBkdXJpbmcgcmVjdXJzaXZlIHN1YmRpdmlzaW9uLFxuXHRcdFx0XHRcdFx0Ly8gdGhpcyBpcyB0aGUgbmV3bHkgY3JlYXRlZCB2ZXJ0ZXggaW5kZXguXG5cblx0Ly8gZWRnZSBpbmZvOiBmcm9tLT50bywgZmFjZSBpbmRleC5cblx0Ly8gdHdvIGVudHJpZXMgcGVyIGVkZ2UuXG5cdGZhY2VJbmRpY2VzOiBudW1iZXJbXSA9IFtudWxsLCBudWxsXTtcdFx0Ly8gcG9seWdvbiBpbmRleFxuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyB2ZXJ0ZXgwOiBudW1iZXIsIHB1YmxpYyB2ZXJ0ZXgxOiBudW1iZXIpIHtcblx0fVxuXG5cdGZhY2VzRGlyZWN0aW9uKGk6IEVkZ2VJbmZvKSB7XG5cdFx0bGV0IHYwID0gaS5mcm9tVmVydGV4O1xuXHRcdGxldCB2MSA9IGkudG9WZXJ0ZXg7XG5cblx0XHRjb25zdCBpbmRleCA9ICh2MD09PXRoaXMudmVydGV4MCAmJiB2MT09PXRoaXMudmVydGV4MSkgPyAwIDogMTtcblx0XHR0aGlzLmZhY2VJbmRpY2VzW2luZGV4XSA9IGkuZmFjZUluZGV4O1xuXHR9XG5cblx0c3dhcCgpIHtcblx0XHRbdGhpcy5mYWNlSW5kaWNlc1swXSwgdGhpcy5mYWNlSW5kaWNlc1sxXV0gPSBbdGhpcy5mYWNlSW5kaWNlc1sxXSwgdGhpcy5mYWNlSW5kaWNlc1swXV07XG5cdFx0W3RoaXMudmVydGV4MCwgdGhpcy52ZXJ0ZXgxXSA9IFt0aGlzLnZlcnRleDEsIHRoaXMudmVydGV4MF07XG5cdH1cblxufVxuXG5leHBvcnQgY2xhc3MgRmFjZXNFZGdlIHtcblxuXHRwcml2YXRlIHN0YXRpYyBfX2lkID0gMDtcblxuXHRpZDogbnVtYmVyO1xuXG5cdHBhcmVudDogRmFjZXNFZGdlO1xuXHRjaGlsZHJlbjogRmFjZXNFZGdlW10gPSBbXTtcblxuXHRvcmllbnRhdGlvbk11bHRpcGxpZXIgPSAxO1xuXHRjb21tb25BeGlzVmVydGljZXM6IFZlcnRleFtdID0gW107XG5cblx0d2MgPSAtMTtcblxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgZWRnZTogRWRnZSkge1xuXHRcdHRoaXMuaWQgPSBGYWNlc0VkZ2UuX19pZCsrO1xuXHRcdHRoaXMud2MgPSBlZGdlLndjO1xuXHRcdHRoaXMucGFyZW50ID0gbnVsbDtcblx0fVxuXG5cdGdldCBmcm9tRmFjZUluZGV4KCkge1xuXHRcdHJldHVybiB0aGlzLmVkZ2UuZmFjZUluZGljZXNbMF07XG5cdH1cblxuXHRnZXQgdG9GYWNlSW5kZXgoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWRnZS5mYWNlSW5kaWNlc1sxXTtcblx0fVxuXG5cdGdldCB2MCgpIHtcblx0XHRyZXR1cm4gdGhpcy5lZGdlLnZlcnRleDA7XG5cdH1cblxuXHRnZXQgdjEoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWRnZS52ZXJ0ZXgxO1xuXHR9XG5cblx0c3dhcCgpIHtcblx0XHR0aGlzLmVkZ2Uuc3dhcCgpO1xuXHR9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTVNUTm9kZSB7XG5cdGYwOiBudW1iZXI7XG5cdGYxOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBNTTxUPiB7XG5cblx0bWFwID0gbmV3IE1hcDxudW1iZXIsIE1hcDxudW1iZXIsIFQ+PigpO1xuXG5cdGNvbnN0cnVjdG9yKCkge31cblxuXHRpbnNlcnQoazA6IG51bWJlciwgazE6IG51bWJlciwgdjogVCkge1xuXG5cdFx0bGV0IG0gPSB0aGlzLm1hcC5nZXQoazApO1xuXG5cdFx0aWYgKG09PT11bmRlZmluZWQpIHtcblx0XHRcdG0gPSBuZXcgTWFwPG51bWJlciwgVD4oKTtcblx0XHRcdHRoaXMubWFwLnNldChrMCwgbSk7XG5cdFx0fVxuXG5cdFx0bS5zZXQoazEsIHYpO1xuXHR9XG5cblx0Z2V0KGswOiBudW1iZXIsIGsxOiBudW1iZXIpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAuZ2V0KGswKT8uZ2V0KGsxKTtcblx0fVxuXG5cdGdldEkoazA6IG51bWJlciwgazE6IG51bWJlcikge1xuXHRcdHJldHVybiB0aGlzLm1hcC5nZXQoazApPy5nZXQoazEpID8/IHRoaXMubWFwLmdldChrMSk/LmdldChrMCk7XG5cdH1cblxuXHRjbG9uZSggcHJlZGljYXRlOiAodjogVCwgazA/OiBudW1iZXIsIGsxPzogbnVtYmVyKSA9PiBib29sZWFuKSB7XG5cdFx0Y29uc3QgY2xvbmUgPSBuZXcgTU08VD4oKTtcblxuXHRcdHRoaXMuZm9yRWFjaCggKHYsazAsazEpID0+IHtcblx0XHRcdGlmIChwcmVkaWNhdGUodiwgazAsIGsxKSkge1xuXHRcdFx0XHRcdGNsb25lLmluc2VydChrMCxrMSx2KTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblxuXHRcdHJldHVybiBjbG9uZTtcblx0fVxuXG5cdGRlbGV0ZShrMDogbnVtYmVyLCBrMTogbnVtYmVyKSB7XG5cdFx0dGhpcy5tYXAuZ2V0KGswKT8uZGVsZXRlKGsxKTtcblx0fVxuXG5cdGZvckVhY2goIGNiOiAodjogVCwgazA/OiBudW1iZXIsIGsxPzogbnVtYmVyKSA9PiB2b2lkKSB7XG5cdFx0dGhpcy5tYXAuZm9yRWFjaCggKG1tLCBrMCkgPT4ge1xuXHRcdFx0bW0uZm9yRWFjaCggKGUsIGsxKSA9PiB7XG5cdFx0XHRcdGNiKGUsIGswLCBrMSk7XG5cdFx0XHR9KTtcblx0XHR9KVxuXHR9XG5cblx0ZXhpc3RzKGswOiBudW1iZXIsIGsxOiBudW1iZXIpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAuZ2V0KGswKT8uZ2V0KGsxKSAhPT11bmRlZmluZWQ7XG5cdH1cblxuXHR0b0FycmF5KCkgOiBUW10ge1xuXHRcdGNvbnN0IGEgOiBUW10gPSBbXTtcblx0XHR0aGlzLmZvckVhY2goIHYgPT4gYS5wdXNoKHYpKTtcblx0XHRyZXR1cm4gYTtcblx0fVxuXG5cdHNpemUoKSB7XG5cdFx0bGV0IGMgPSAwO1xuXHRcdHRoaXMuZm9yRWFjaCggXyA9PiBjKysgKTtcblx0XHRyZXR1cm4gYztcblx0fVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2VJbmZvIHtcblx0cHJldklkOiBudW1iZXI7XG5cdGlkOiBudW1iZXI7XG5cdGVkZ2VzOiBFZGdlW107XG5cdHZlcnRpY2VzOiBWZXJ0ZXhbXTtcblx0cHJldlZlcnRpY2VzSW5kaWNlczogbnVtYmVyW107XG5cdG5vcm1hbDogbnVtYmVyW107XG59XG5cbmNvbnN0IGtubiA9IFZlY3RvcjMuY3JlYXRlKCk7XG5jb25zdCBrbm5QMCA9IFZlY3RvcjMuY3JlYXRlKCk7XG5jb25zdCBxMCA9IFF1YXRlcm5pb24uY3JlYXRlKCk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTXlyaWFoZWRyb25QYXJhbXMge1xuXHRuYW1lOiBzdHJpbmc7XG5cdGdlb21ldHJ5OiBNeXJpYWhlZHJvbkdlb21ldHJ5O1xuXHRzdWJkaXZpc2lvbnM/OiBudW1iZXI7XG5cdHVuZm9sZD86IGJvb2xlYW4sXHRcdC8vIGRlZmF1bHQgdHJ1ZVxuXHRub3JtYWxpemU/OiBib29sZWFuLFx0Ly8gZGVmYXVsdCB0cnVlXG5cdHV2T2Zmc2V0PzogW251bWJlciwgbnVtYmVyXSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlyaWFoZWRyYWwge1xuXG5cdC8vIE1BUks6IG15cmlhaGVkcm9uIHN1YmRpdmlzaW9uIGludG8uXG5cdHN1YmRpdmlzaW9ucyA9IDY7XG5cdGVkZ2VzID0gbmV3IE1NPEVkZ2U+KCk7XHRcdC8vIHYwIC0+IHYxIC0+IEVkZ2Vcblx0ZmFjZXNJbmZvOiBNYXA8bnVtYmVyLCBGYWNlSW5mbz47XG5cdHJvb3RzOiBGYWNlc0VkZ2VbXTtcdC8vIG11c3QgYmUganVzdCBvbmUgIVxuXG5cdC8vIE1BUks6XG5cdG9yaWdpbmFsVmVydGljZXM6IFZlcnRleFtdID0gW107XG5cdHZlcnRleDogVmVydGV4W10gPSBbXTtcblx0aW5kZXg6IG51bWJlcltdID0gW107XG5cblx0dXY6IEZsb2F0MzJBcnJheTtcblx0ZmFjZUVkZ2VzOiBNTTxGYWNlc0VkZ2U+O1xuXHRmb2xkc01TVDogRmFjZXNFZGdlW107XG5cdGZvbGRzOiBNU1ROb2RlW107XG5cdGN1dHM6IEVkZ2VbXTtcblx0bWlyeWFoZWRyb25HZW9tZXRyeTogTXlyaWFoZWRyb25HZW9tZXRyeTtcblx0bmFtZTogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdH1cblxuXHRncmF0aWN1bGUocDogR3JhdGljdWxlUGFyYW1zKSB7XG5cblx0XHR0aGlzLm5hbWUgPSBwLm5hbWU7XG5cblx0XHRjb25zdCBnciA9IG5ldyBHcmF0aWN1bGUoKS5idWlsZChwKTtcblxuXHRcdHRoaXMudmVydGV4ID0gZ3IudmVydGljZXM7XG5cdFx0dGhpcy5mYWNlc0luZm8gPSBnci5mYWNlcztcblx0XHR0aGlzLmZvbGRzTVNUID0gZ3IuZm9sZHM7XG5cdFx0dGhpcy5pbmRleCA9IFtdO1xuXHRcdGdyLmZhY2VzLmZvckVhY2goZiA9PiB7XG5cdFx0XHRmLnZlcnRpY2VzLmZvckVhY2godiA9PiB7XG5cdFx0XHRcdHRoaXMuaW5kZXgucHVzaCh2LmluZGV4KTtcblx0XHRcdH0pXG5cdFx0fSk7XG5cblx0XHRjb25zdCB0dW5mb2xkID0gRGF0ZS5ub3coKTtcblx0XHR0aGlzLnVuZm9sZFNldHVwKGZhbHNlKTtcblx0XHRjb25zb2xlLmxvZyhgbm9ybWFsaXphdGlvbityZXRyaWFuZ3VsYXRlK3VuZm9sZCB0aW1lICR7RGF0ZS5ub3coKSAtIHR1bmZvbGR9bXNgKTtcblxuXHRcdHRoaXMuZm9sZHMgPSB0aGlzLmZvbGRzTVNULm1hcChlID0+IHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGYwOiBlLmVkZ2UuZmFjZUluZGljZXNbMF0sXG5cdFx0XHRcdGYxOiBlLmVkZ2UuZmFjZUluZGljZXNbMV0sXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLmN1dHMgPSBbXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bXlyaWFoZWRyb24ocDogTXlyaWFoZWRyb25QYXJhbXMpOiBNeXJpYWhlZHJhbCB7XG5cblx0XHR0aGlzLm5hbWUgPSBwLm5hbWU7XG5cblx0XHRpZiAocC51bmZvbGQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cC51bmZvbGQgPSB0cnVlO1xuXHRcdH1cblxuXHRcdHRoaXMubWlyeWFoZWRyb25HZW9tZXRyeSA9IHAuZ2VvbWV0cnk7XG5cblx0XHR0aGlzLnN1YmRpdmlzaW9ucyA9IHAuc3ViZGl2aXNpb25zID8/IDU7XG5cblx0XHR0aGlzLmJ1aWxkTXlyaWFoZWRyb24ocC5nZW9tZXRyeSwgcC5ub3JtYWxpemUgPz8gdHJ1ZSk7XG5cblx0XHQvLyBnZXQgb25seSBhY3R1YWwgZWRnZXMsIG5vdCB0aGUgb25lcyB1c2VkIHRvIHN1YmRpdmlkZS5cblx0XHR0aGlzLmVkZ2VzID0gdGhpcy5lZGdlcy5jbG9uZSh2ID0+IHtcblx0XHRcdHJldHVybiB2LmNlbnRlckluZGV4ID09PSAtMVxuXHRcdH0pO1xuXG5cdFx0bGV0IHRNU1QgPSBEYXRlLm5vdygpO1xuXHRcdHRoaXMuZm9sZHNNU1QgPSB0aGlzLmNhbGNNU1QodGhpcy50cmFuc2Zvcm1WZXJ0RWRnZXNUb0ZhY2VFZGdlcygpKTtcblx0XHRjb25zb2xlLmxvZyhgTVNUIGNhbGMgdGltZSAke0RhdGUubm93KCkgLSB0TVNUfW1zLmApO1xuXG5cdFx0Ly8gRk9MRFNcblxuXHRcdC8vIGNsb25lIHRoaXMuZWRnZXMgaW50byBlZGdlc01TVFxuXHRcdGNvbnN0IGVkZ2VzTVNUID0gdGhpcy5lZGdlcy5jbG9uZShfID0+IHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0pXG5cblx0XHQvLyBDVVRTIChub3QgbmVlZGVkIGJ1dCBiZWF1dGlmdWwgdG8gdmlzdWFsaXNlKVxuXG5cdFx0Ly8gYWxsIG5vbiBmb2xkIGVkZ2VzLCBhcmUgY3V0LlxuXHRcdC8vIGZvbGRzIGFyZSBmYWNlLWZhY2UgZWRnZXMsIHNvIHVzZSBvcmlnaW5hbCB2ZXJ0aWNlcyBlZGdlLlxuXHRcdHRoaXMuZm9sZHNNU1QuZm9yRWFjaChmID0+IHtcblx0XHRcdGVkZ2VzTVNULmRlbGV0ZShmLmVkZ2UudmVydGV4MCwgZi5lZGdlLnZlcnRleDEpO1xuXHRcdFx0ZWRnZXNNU1QuZGVsZXRlKGYuZWRnZS52ZXJ0ZXgxLCBmLmVkZ2UudmVydGV4MCk7XG5cdFx0fSlcblxuXHRcdHRoaXMuY3V0cyA9IFtdO1xuXHRcdGVkZ2VzTVNULmZvckVhY2godiA9PiB7XG5cdFx0XHR0aGlzLmN1dHMucHVzaCh2KTtcblx0XHR9KTtcblxuXHRcdGlmICghcC51bmZvbGQpIHtcblx0XHRcdHRoaXMudXYgPSB0aGlzLmNhbGN1bGF0ZVVWKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHR1bmZvbGQgPSBEYXRlLm5vdygpO1xuXHRcdFx0dGhpcy51bmZvbGRTZXR1cCh0cnVlKTtcblx0XHRcdGNvbnNvbGUubG9nKGBub3JtYWxpemF0aW9uK3JldHJpYW5ndWxhdGUrdW5mb2xkIHRpbWUgJHtEYXRlLm5vdygpIC0gdHVuZm9sZH1tc2ApO1xuXHRcdH1cblxuXHRcdHRoaXMuZm9sZHMgPSB0aGlzLmZvbGRzTVNULm1hcChlID0+IHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGYwOiBlLmVkZ2UuZmFjZUluZGljZXNbMF0sXG5cdFx0XHRcdGYxOiBlLmVkZ2UuZmFjZUluZGljZXNbMV0sXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHByaXZhdGUgZWRnZXNGcm9tRmFjZXMoZnM6IEZhY2VUeXBlW10pOiBFZGdlVHlwZVtdIHtcblxuXHRcdGNvbnN0IGVkZ2VzOiBFZGdlVHlwZVtdID0gW107XG5cblx0XHRmcy5mb3JFYWNoKGYgPT4ge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBmLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGVkZ2VzLnB1c2goW2ZbaV0sIGZbKGkgKyAxKSAlIGYubGVuZ3RoXV0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgZWRnZXNNYXAgPSBuZXcgTU08RWRnZVR5cGU+KCk7XG5cdFx0ZWRnZXMuZm9yRWFjaChlID0+IHtcblx0XHRcdGlmIChlZGdlc01hcC5nZXRJKGVbMF0sIGVbMV0pID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0ZWRnZXNNYXAuaW5zZXJ0KGVbMF0sIGVbMV0sIGUpO1xuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHRjb25zdCByZXRFZGdlczogRWRnZVR5cGVbXSA9IFtdO1xuXHRcdGVkZ2VzTWFwLmZvckVhY2goZSA9PiB7XG5cdFx0XHRyZXRFZGdlcy5wdXNoKGUpO1xuXHRcdH0pXG5cblx0XHRyZXR1cm4gcmV0RWRnZXM7XG5cdH1cblxuXHRwcml2YXRlIGJ1aWxkTXlyaWFoZWRyb24oZ2VvbWV0cnk6IE15cmlhaGVkcm9uR2VvbWV0cnksIG5vcm1hbGl6ZTogYm9vbGVhbikge1xuXG5cdFx0Y29uc3QgdGJtID0gRGF0ZS5ub3coKTtcblxuXHRcdGdlb21ldHJ5LnZlcnRpY2VzLmZvckVhY2godiA9PiB7XG5cdFx0XHR0aGlzLmluc2VydFZlcnRleChuZXcgVmVydGV4KHZbMF0sIHZbMV0sIHZbMl0pKTtcblx0XHR9KVxuXG5cdFx0aWYgKGdlb21ldHJ5LmVkZ2VzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdGdlb21ldHJ5LmVkZ2VzID0gdGhpcy5lZGdlc0Zyb21GYWNlcyhnZW9tZXRyeS5mYWNlcyk7XG5cdFx0fVxuXG5cdFx0Zm9yIChjb25zdCBlIG9mIGdlb21ldHJ5LmVkZ2VzKSB7XG5cdFx0XHR0aGlzLmluc2VydEVkZ2UodGhpcy52ZXJ0ZXhbZVswXV0sIHRoaXMudmVydGV4W2VbMV1dLCAwKTtcblx0XHR9XG5cblx0XHRnZW9tZXRyeS5mYWNlcy5mb3JFYWNoKGYgPT4gdGhpcy5yZWN1cnNlKDEsIGZbMF0sIGZbMV0sIGZbMl0pKTtcblxuXHRcdGlmIChub3JtYWxpemUpIHtcblx0XHRcdHRoaXMubm9ybWFsaXplR2VvbWV0cnkoKTtcblx0XHR9XG5cblx0XHRjb25zb2xlLmxvZyhgbXlyaWFoZWRyb24gYnVpbGQgdGltZSAke0RhdGUubm93KCkgLSB0Ym19bXNgKTtcblx0fVxuXG5cdGNhbGNNU1QoZmFjZUVkZ2VzOiBGYWNlc0VkZ2VbXSk6IEZhY2VzRWRnZVtdIHtcblxuXHRcdGNvbnN0IGhlbHBlciA9IG5ldyBNTTxGYWNlc0VkZ2U+KCk7XHQvLyBmYWNlaWQgLT4gZmFjZWlkIC0+IGZhY2VFZGdlXG5cblx0XHRmYWNlRWRnZXMuZm9yRWFjaChlID0+IHtcblx0XHRcdGUud2MgKj0gLTE7XG5cblx0XHRcdGxldCBmMCA9IGUuZWRnZS5mYWNlSW5kaWNlc1swXTtcblx0XHRcdGxldCBmMSA9IGUuZWRnZS5mYWNlSW5kaWNlc1sxXTtcblxuXHRcdFx0aGVscGVyLmluc2VydChmMCwgZjEsIGUpO1xuXHRcdFx0aGVscGVyLmluc2VydChmMSwgZjAsIGUpO1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgdHJlZUZhY2VzOiBudW1iZXJbXSA9IFtdO1xuXHRcdHRyZWVGYWNlcy5wdXNoKGZhY2VFZGdlc1swXS5lZGdlLmZhY2VJbmRpY2VzWzBdKTtcblxuXHRcdGNvbnN0IHRyZWVGYWNlc1NldCA9IG5ldyBNYXA8bnVtYmVyLCBGYWNlc0VkZ2U+KCk7XG5cdFx0dHJlZUZhY2VzU2V0LnNldChmYWNlRWRnZXNbMF0uZWRnZS5mYWNlSW5kaWNlc1swXSwgZmFjZUVkZ2VzWzBdKTtcblxuXHRcdGNvbnN0IHRyZWVFZGdlczogRmFjZXNFZGdlW10gPSBbXTtcblx0XHR0cmVlRWRnZXMucHVzaChmYWNlRWRnZXNbMF0pO1xuXG5cdFx0d2hpbGUgKHRyZWVGYWNlc1NldC5zaXplICE9PSB0aGlzLmluZGV4Lmxlbmd0aCAvIDMpIHtcblxuXHRcdFx0bGV0IG1pbkZhY2UgPSAtMTtcblx0XHRcdGxldCBtaW5FZGdlOiBGYWNlc0VkZ2UgPSBudWxsO1xuXHRcdFx0bGV0IG1pbldDID0gTnVtYmVyLk1BWF9WQUxVRTtcblx0XHRcdGxldCBuZXh0RmFjZSA9IC0xO1xuXG5cdFx0XHR0cmVlRmFjZXMuZm9yRWFjaChmYWNlID0+IHtcblx0XHRcdFx0Ly8gZmluZCBtaW5pbXVtIHdjIG9mIGFueSBlZGdlIG91dGdvaW5nIGZyb20gZmFjZSBlZGdlXG5cdFx0XHRcdGhlbHBlci5tYXAuZ2V0KGZhY2UpLmZvckVhY2goKGUsIGZhY2VLZXkpID0+IHtcblx0XHRcdFx0XHRpZiAoIXRyZWVGYWNlc1NldC5oYXMoZmFjZUtleSkgJiYgZS53YyA8IG1pbldDKSB7XG5cdFx0XHRcdFx0XHRtaW5FZGdlID0gZTtcblx0XHRcdFx0XHRcdG1pbldDID0gZS53Yztcblx0XHRcdFx0XHRcdG5leHRGYWNlID0gZmFjZUtleTtcblx0XHRcdFx0XHRcdG1pbkZhY2UgPSBmYWNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKG1pbkVkZ2UpIHtcblxuXHRcdFx0XHRjb25zdCBwYXJlbnQgPSB0cmVlRmFjZXNTZXQuZ2V0KG1pbkZhY2UpO1xuXG5cdFx0XHRcdC8vIGlzIG5vdCB0aGUgc2FtZSBlZGdlIGluIGRpZmZlcmVudCBmYWNlcy4gZS5nLiBgdGhpcy5wYXJlbnQ9dGhpc2Bcblx0XHRcdFx0aWYgKHBhcmVudC5lZGdlICE9PSBtaW5FZGdlLmVkZ2UpIHtcblxuXHRcdFx0XHRcdGhlbHBlci5tYXAuZ2V0KG5leHRGYWNlKS5kZWxldGUobWluRmFjZSk7XG5cdFx0XHRcdFx0aGVscGVyLm1hcC5nZXQobWluRmFjZSkuZGVsZXRlKG5leHRGYWNlKTtcblxuXHRcdFx0XHRcdHRyZWVGYWNlcy5wdXNoKG5leHRGYWNlKTtcblx0XHRcdFx0XHR0cmVlRWRnZXMucHVzaChtaW5FZGdlKTtcblxuXHRcdFx0XHRcdGlmIChwYXJlbnQpIHtcblx0XHRcdFx0XHRcdG1pbkVkZ2UucGFyZW50ID0gcGFyZW50O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRyZWVGYWNlc1NldC5zZXQobmV4dEZhY2UsIG1pbkVkZ2UpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGBubyBtb3JlIGVkZ2VzYCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0cmVlRWRnZXM7XG5cdH1cblxuXHQvLyBmb3JtIEVkZ2UgdG8gRWRnZUZhY2UuXG5cdC8vIEVkZ2VGYWNlIGtlZXBzIGEgZGlyZWN0aW9uYWwgRWRnZSBpbmZvcm1hdGlvbiAoZnJvbSBmYWNlIHRvIGZhY2UpIGJhc2VkIG9uXG5cdC8vIGVkZ2UncyB2ZXJ0aWNlcyB0cmF2ZXJzYWwgZGlyZWN0aW9uLlxuXHQvLyBcdHYwIC0+IHYxIC0+IEYwXG5cdC8vIFx0djEgLT4gdjAgLT4gRjFcblx0cHJpdmF0ZSB0cmFuc2Zvcm1WZXJ0RWRnZXNUb0ZhY2VFZGdlcygpOiBGYWNlc0VkZ2VbXSB7XG5cblx0XHR0aGlzLmZhY2VFZGdlcyA9IG5ldyBNTTxGYWNlc0VkZ2U+KCk7XG5cblx0XHRsZXQgZGVnZW5lcmF0ZWQgPSAwO1xuXHRcdHRoaXMuZWRnZXMuZm9yRWFjaChlZGdlID0+IHtcblx0XHRcdGlmIChlZGdlLmZhY2VJbmRpY2VzWzBdICE9PSBudWxsICYmIGVkZ2UuZmFjZUluZGljZXNbMV0gIT09IG51bGwpIHtcblx0XHRcdFx0dGhpcy5mYWNlRWRnZXMuaW5zZXJ0KFxuXHRcdFx0XHRcdGVkZ2UuZmFjZUluZGljZXNbMF0sXG5cdFx0XHRcdFx0ZWRnZS5mYWNlSW5kaWNlc1sxXSxcblx0XHRcdFx0XHRuZXcgRmFjZXNFZGdlKGVkZ2UpXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWdlbmVyYXRlZCsrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Y29uc29sZS5sb2coYGVkZ2VzOiAke3RoaXMuZWRnZXMuc2l6ZSgpfSwgZmFjZUVkZ2VzOiAke3RoaXMuZmFjZUVkZ2VzLnNpemUoKX0sIGRlZ2VuZXJhdGVkOiAke2RlZ2VuZXJhdGVkfWApO1xuXG5cdFx0cmV0dXJuIHRoaXMuZmFjZUVkZ2VzLnRvQXJyYXkoKTtcblx0fVxuXG5cdGdldE1lc2hEYXRhKCk6IEdlb21ldHJ5SW5mb0luZGV4ZWQge1xuXG5cdFx0Y29uc3QgdmVydGljZXMgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMudmVydGV4Lmxlbmd0aCAqIDMpO1xuXHRcdHRoaXMudmVydGV4LmZvckVhY2goKHYsIGkpID0+IHtcblx0XHRcdHZlcnRpY2VzW2kgKiAzXSA9IHYueDtcblx0XHRcdHZlcnRpY2VzW2kgKiAzICsgMV0gPSB2Lnk7XG5cdFx0XHR2ZXJ0aWNlc1tpICogMyArIDJdID0gdi56O1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHZlcnRpY2VzLFxuXHRcdFx0aW5kZXg6IHRoaXMuaW5kZXggIT09IG51bGwgPyBuZXcgVWludDE2QXJyYXkodGhpcy5pbmRleCkgOiBudWxsLFxuXHRcdFx0dXY6IHRoaXMudXYsXG5cdFx0XHRmb2xkczogdGhpcy5mb2xkcyxcblx0XHRcdGN1dHM6IHRoaXMuY3V0cyxcblx0XHRcdGZvbGRzTVNUOiB0aGlzLmZvbGRzTVNULFxuXHRcdH07XG5cdH1cblxuXHRjYWxjdWxhdGVVVihveD86IG51bWJlciwgb3k/OiBudW1iZXIpIHtcblx0XHRjb25zdCB1diA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5vcmlnaW5hbFZlcnRpY2VzLmxlbmd0aCAqIDIpO1xuXG5cdFx0b3ggPSBveCA/PyAwO1xuXHRcdG95ID0gb3kgPz8gMDtcblxuXHRcdHRoaXMub3JpZ2luYWxWZXJ0aWNlcy5mb3JFYWNoKCh2LCBpKSA9PiB7XG5cdFx0XHR1dltpICogMl0gPSAuNSArIChveCArIE1hdGguYXRhbjIodi54LCB2LnopKSAvICgyICogTWF0aC5QSSk7XG5cdFx0XHR1dltpICogMiArIDFdID0gLjUgLSAob3kgKyBNYXRoLmFzaW4odi55KSkgLyBNYXRoLlBJO1xuXHRcdH0pO1xuXG5cdFx0Ly8gY2hlY2sgZm9yIGV4dHJlbWUgdXYgb2Zmc2V0cy5cblx0XHR0aGlzLmZhY2VzSW5mby5mb3JFYWNoKCBmaSA9PiB7XG5cblx0XHRcdGNvbnN0IG8wID0gZmkudmVydGljZXNbMF0uaW5kZXgqMjtcblx0XHRcdGNvbnN0IHUwID0gdXZbbzBdO1xuXHRcdFx0Y29uc3QgdjAgPSB1dltvMCsxXTtcblx0XHRcdGNvbnN0IG8xID0gZmkudmVydGljZXNbMV0uaW5kZXgqMjtcblx0XHRcdGNvbnN0IHUxID0gdXZbbzFdO1xuXHRcdFx0Y29uc3QgdjEgPSB1dltvMSsxXTtcblx0XHRcdGNvbnN0IG8yID0gZmkudmVydGljZXNbMl0uaW5kZXgqMjtcblx0XHRcdGNvbnN0IHUyID0gdXZbbzJdO1xuXHRcdFx0Y29uc3QgdjIgPSB1dltvMisxXTtcblxuXHRcdFx0aWYgKE1hdGguYWJzKHUwLXUxKT4uNSB8fCBNYXRoLmFicyh1Mi11MCk+LjUgfHwgTWF0aC5hYnModTItdTEpPi41KSB7XG5cdFx0XHRcdGlmICh1MCA8IC41KSB7XG5cdFx0XHRcdFx0dXZbbzBdICs9IDE7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHUxIDwgLjUpIHtcblx0XHRcdFx0XHR1dltvMV0gKz0gMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodTIgPCAuNSkge1xuXHRcdFx0XHRcdHV2W28yXSArPSAxO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChNYXRoLmFicyh2MC12MSk+LjUgfHwgTWF0aC5hYnModjItdjApPi41IHx8IE1hdGguYWJzKHYyLXYxKT4uNSkge1xuXHRcdFx0XHRpZiAodjAgPCAuNSkge1xuXHRcdFx0XHRcdHV2W28wKzFdICs9IDE7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHYxIDwgLjUpIHtcblx0XHRcdFx0XHR1dltvMSsxXSArPSAxO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh2MiA8IC41KSB7XG5cdFx0XHRcdFx0dXZbbzIrMV0gKz0gMTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHV2O1xuXHR9XG5cblx0cHJpdmF0ZSBpbnNlcnRWZXJ0ZXgodjogVmVydGV4KSB7XG5cdFx0di5pbmRleCA9IHRoaXMudmVydGV4Lmxlbmd0aDtcblx0XHR0aGlzLnZlcnRleC5wdXNoKHYpO1xuXHR9XG5cblx0cHJpdmF0ZSBpbnNlcnRFZGdlKHYwOiBWZXJ0ZXgsIHYxOiBWZXJ0ZXgsIGxldmVsOiBudW1iZXIpIHtcblxuXHRcdGlmICh0aGlzLmVkZ2VzLmV4aXN0cyh2MC5pbmRleCwgdjEuaW5kZXgpKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhgaW5zZXJ0IG9mIGR1cGxpY2F0ZWQgZWRnZWApO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGUgPSBuZXcgRWRnZSh2MC5pbmRleCwgdjEuaW5kZXgpO1xuXG5cdFx0ZS53MCA9IGxldmVsO1xuXHRcdGUudzEgPSBsZXZlbDtcblx0XHRlLndjID0gbGV2ZWwgKyAxO1xuXG5cdFx0dGhpcy5lZGdlcy5pbnNlcnQodjAuaW5kZXgsIHYxLmluZGV4LCBlKTtcblxuXHRcdHJldHVybiBlO1xuXHR9XG5cblx0cHJpdmF0ZSBlZGdlc0ZhY2VzRGlyZWN0aW9uKHYwaTogbnVtYmVyLCB2MWk6IG51bWJlciwgdjJpOiBudW1iZXIpIHtcblx0XHR0aGlzLmVkZ2VzLmdldEkodjBpLCB2MWkpLmZhY2VzRGlyZWN0aW9uKHtcblx0XHRcdGZyb21WZXJ0ZXg6IHYwaSxcblx0XHRcdHRvVmVydGV4OiB2MWksXG5cdFx0XHRmYWNlSW5kZXg6IHRoaXMuaW5kZXgubGVuZ3RoIC8gM1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5lZGdlcy5nZXRJKHYxaSwgdjJpKS5mYWNlc0RpcmVjdGlvbih7XG5cdFx0XHRmcm9tVmVydGV4OiB2MWksXG5cdFx0XHR0b1ZlcnRleDogdjJpLFxuXHRcdFx0ZmFjZUluZGV4OiB0aGlzLmluZGV4Lmxlbmd0aCAvIDNcblx0XHR9KTtcblxuXHRcdHRoaXMuZWRnZXMuZ2V0SSh2MmksIHYwaSkuZmFjZXNEaXJlY3Rpb24oe1xuXHRcdFx0ZnJvbVZlcnRleDogdjJpLFxuXHRcdFx0dG9WZXJ0ZXg6IHYwaSxcblx0XHRcdGZhY2VJbmRleDogdGhpcy5pbmRleC5sZW5ndGggLyAzXG5cdFx0fSk7XG5cblx0XHR0aGlzLmluZGV4LnB1c2godjBpLCB2MWksIHYyaSk7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiByZWN1cnNlIGVkZ2VzIHYwMS12MWksIHYxaS12MmksIHYyaS12MGlcblx0ICogQHBhcmFtIGxldmVsXG5cdCAqIEBwYXJhbSB2MGlcblx0ICogQHBhcmFtIHYxaVxuXHQgKiBAcGFyYW0gdjJpXG5cdCAqL1xuXHRwcml2YXRlIHJlY3Vyc2UobGV2ZWw6IG51bWJlciwgdjBpOiBudW1iZXIsIHYxaTogbnVtYmVyLCB2Mmk6IG51bWJlcikge1xuXG5cdFx0aWYgKGxldmVsID09PSB0aGlzLnN1YmRpdmlzaW9ucykge1xuXG5cdFx0XHR0aGlzLmVkZ2VzRmFjZXNEaXJlY3Rpb24odjBpLCB2MWksIHYyaSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgbXYwdjEgPSB0aGlzLmVkZ2VzLmdldEkodjBpLCB2MWkpO1xuXHRcdGlmIChtdjB2MS5jZW50ZXJJbmRleCA9PT0gLTEpIHtcblx0XHRcdHRoaXMuc3BsaXRFZGdlKG12MHYxKTtcblx0XHR9XG5cblx0XHRjb25zdCBtdjF2MiA9IHRoaXMuZWRnZXMuZ2V0SSh2MWksIHYyaSk7XG5cdFx0aWYgKG12MXYyLmNlbnRlckluZGV4ID09PSAtMSkge1xuXHRcdFx0dGhpcy5zcGxpdEVkZ2UobXYxdjIpO1xuXHRcdH1cblxuXHRcdGNvbnN0IG12MnYwID0gdGhpcy5lZGdlcy5nZXRJKHYyaSwgdjBpKTtcblx0XHRpZiAobXYydjAuY2VudGVySW5kZXggPT09IC0xKSB7XG5cdFx0XHR0aGlzLnNwbGl0RWRnZShtdjJ2MCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5pbnNlcnRFZGdlKHRoaXMudmVydGV4W212MHYxLmNlbnRlckluZGV4XSwgdGhpcy52ZXJ0ZXhbbXYydjAuY2VudGVySW5kZXhdLCBsZXZlbCk7XG5cdFx0dGhpcy5pbnNlcnRFZGdlKHRoaXMudmVydGV4W212MHYxLmNlbnRlckluZGV4XSwgdGhpcy52ZXJ0ZXhbbXYxdjIuY2VudGVySW5kZXhdLCBsZXZlbCk7XG5cdFx0dGhpcy5pbnNlcnRFZGdlKHRoaXMudmVydGV4W212MnYwLmNlbnRlckluZGV4XSwgdGhpcy52ZXJ0ZXhbbXYxdjIuY2VudGVySW5kZXhdLCBsZXZlbCk7XG5cblx0XHR0aGlzLnJlY3Vyc2UobGV2ZWwgKyAxLCB2MGksIG12MHYxLmNlbnRlckluZGV4LCBtdjJ2MC5jZW50ZXJJbmRleCk7XG5cdFx0dGhpcy5yZWN1cnNlKGxldmVsICsgMSwgbXYwdjEuY2VudGVySW5kZXgsIHYxaSwgbXYxdjIuY2VudGVySW5kZXgpO1xuXHRcdHRoaXMucmVjdXJzZShsZXZlbCArIDEsIG12MXYyLmNlbnRlckluZGV4LCBtdjJ2MC5jZW50ZXJJbmRleCwgbXYwdjEuY2VudGVySW5kZXgpO1xuXHRcdHRoaXMucmVjdXJzZShsZXZlbCArIDEsIG12MnYwLmNlbnRlckluZGV4LCBtdjF2Mi5jZW50ZXJJbmRleCwgdjJpKTtcblx0fVxuXG5cdHByaXZhdGUgc3BsaXRFZGdlKGU6IEVkZ2UpIHtcblxuXHRcdGNvbnN0IHYwdjEgPSBWZXJ0ZXgubWlkZGxlKHRoaXMudmVydGV4W2UudmVydGV4MF0sIHRoaXMudmVydGV4W2UudmVydGV4MV0pO1xuXHRcdHRoaXMuaW5zZXJ0VmVydGV4KHYwdjEpO1xuXG5cdFx0ZS5jZW50ZXJJbmRleCA9IHYwdjEuaW5kZXg7XG5cblx0XHRpZiAoIXRoaXMuZWRnZXMuZ2V0SShlLnZlcnRleDAsIHYwdjEuaW5kZXgpKSB7XG5cdFx0XHRjb25zdCBlMCA9IHRoaXMuaW5zZXJ0RWRnZSh0aGlzLnZlcnRleFtlLnZlcnRleDBdLCB2MHYxLCAwKTtcblx0XHRcdGUwLncwID0gZS53MDtcblx0XHRcdGUwLncxID0gZS53Yztcblx0XHRcdGUwLndjID0gKGUudzAgKyBlLndjKSAvIDI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ3NwbGl0dGluZyB1bmtub3duIGVkZ2UuJyk7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmVkZ2VzLmdldEkodjB2MS5pbmRleCwgZS52ZXJ0ZXgxKSkge1xuXHRcdFx0Y29uc3QgZTEgPSB0aGlzLmluc2VydEVkZ2UodjB2MSwgdGhpcy52ZXJ0ZXhbZS52ZXJ0ZXgxXSwgMCk7XG5cdFx0XHRlMS53MCA9IGUud2M7XG5cdFx0XHRlMS53MSA9IGUudzE7XG5cdFx0XHRlMS53YyA9IChlLndjICsgZS53MSkgLyAyO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdzcGxpdHRpbmcgdW5rbm93biBlZGdlLicpO1xuXHRcdH1cblxuXHR9XG5cblx0cHJpdmF0ZSBidWlsZEZvbGRpbmdUcmVlKCkge1xuXG5cdFx0dGhpcy5yb290cyA9IHRoaXMuZm9sZHNNU1QuZmlsdGVyKGUgPT4ge1xuXHRcdFx0cmV0dXJuIGUucGFyZW50ID09PSBudWxsXG5cdFx0fSk7XG5cblx0XHRpZiAodGhpcy5yb290cy5sZW5ndGg+MSkge1xuXHRcdFx0Y29uc29sZS53YXJuKGAke3RoaXMubmFtZX0gbW9yZSB0aGFuIG9uZSByb290OiAke3RoaXMucm9vdHMubGVuZ3RofWApO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJvb3QgPSB0aGlzLnJvb3RzWzBdO1xuXG5cdFx0Y29uc3QgcHJvY2Vzc2VkID0gbmV3IFNldDxudW1iZXI+KCk7XG5cdFx0cHJvY2Vzc2VkLmFkZChyb290LmlkKTtcblx0XHR0aGlzLmJ1aWxkRm9sZGluZ1RyZWVJbXBsKHByb2Nlc3NlZCwgcm9vdC5mcm9tRmFjZUluZGV4LCByb290KTtcblx0XHR0aGlzLmJ1aWxkRm9sZGluZ1RyZWVJbXBsKHByb2Nlc3NlZCwgcm9vdC50b0ZhY2VJbmRleCwgcm9vdCk7XG5cdFx0cm9vdC5zd2FwKCk7XG5cdH1cblxuXHRwcml2YXRlIGJ1aWxkRm9sZGluZ1RyZWVJbXBsKHByb2Nlc3NlZDogU2V0PG51bWJlcj4sIHBhcmVudDogbnVtYmVyLCBub2RlUGFyZW50OiBGYWNlc0VkZ2UpIHtcblxuXHRcdGNvbnN0IGNoaWxkcmVuID0gdGhpcy5mb2xkc01TVC5maWx0ZXIoZiA9PiB7XG5cdFx0XHRyZXR1cm4gIXByb2Nlc3NlZC5oYXMoZi5pZCkgJiYgKGYuZnJvbUZhY2VJbmRleCA9PT0gcGFyZW50IHx8IGYudG9GYWNlSW5kZXggPT09IHBhcmVudCk7XG5cdFx0fSk7XG5cblx0XHRjaGlsZHJlbi5mb3JFYWNoKGYgPT4ge1xuXG5cdFx0XHRpZiAoIXByb2Nlc3NlZC5oYXMoZi5pZCkpIHtcblx0XHRcdFx0aWYgKGYuZnJvbUZhY2VJbmRleCAhPT0gcGFyZW50KSB7XG5cdFx0XHRcdFx0Zi5zd2FwKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAobm9kZVBhcmVudCAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdG5vZGVQYXJlbnQuY2hpbGRyZW4ucHVzaChmKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGYucGFyZW50ID0gbm9kZVBhcmVudDtcblxuXHRcdFx0XHRwcm9jZXNzZWQuYWRkKGYuaWQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Y2hpbGRyZW4uZm9yRWFjaChjID0+IHtcblx0XHRcdHRoaXMuYnVpbGRGb2xkaW5nVHJlZUltcGwocHJvY2Vzc2VkLCBjLnRvRmFjZUluZGV4LCBjKTtcblx0XHRcdHRoaXMuYnVpbGRGb2xkaW5nVHJlZUltcGwocHJvY2Vzc2VkLCBjLmZyb21GYWNlSW5kZXgsIGMpO1xuXHRcdH0pXG5cdH1cblxuXHRwcml2YXRlIG5vcm1hbGl6ZUdlb21ldHJ5KCkge1xuXHRcdHRoaXMudmVydGV4LmZvckVhY2goKHYpID0+IHtcblx0XHRcdHYubm9ybWFsaXplKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIGNoZWNrQWxsVHJpYW5nbGVzQ29tcGxldGUoZmFjZXM6IE1hcDxudW1iZXIsIEVkZ2VbXT4pIHtcblxuXHRcdGxldCBjID0gMDtcblx0XHRsZXQgaW5jOiBhbnkgPSB7fTtcblx0XHRmYWNlcy5mb3JFYWNoKChmLCBmYWNlSW5kZXgpID0+IHtcblx0XHRcdGlmIChmLmxlbmd0aCAhPT0gMykge1xuXHRcdFx0XHRjKys7XG5cdFx0XHRcdGluY1tmYWNlSW5kZXhdID0gZjtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmIChjICE9PSAwKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhpbmMpO1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBpbmNvbXBsZXRlIGZhY2VzOiAke2N9YCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSByZVRyaWFuZ3VsYXRlR2VvbWV0cnkoKSB7XG5cblx0XHRjb25zdCBuZXdWZXJ0aWNlczogVmVydGV4W10gPSBbXTtcblx0XHRjb25zdCBuZXdJbmRleDogbnVtYmVyW10gPSBbXTtcblxuXHRcdGNvbnN0IGZhY2VzID0gbmV3IE1hcDxudW1iZXIsIEVkZ2VbXT4oKTtcdC8vIGZhY2VJZCwgdmVydGljZXNcblxuXHRcdGNvbnN0IHByb2Nlc3MgPSAoZWRnZTogRWRnZSwgZjA6IG51bWJlcikgPT4ge1xuXHRcdFx0bGV0IGFyID0gZmFjZXMuZ2V0KGYwKTtcblx0XHRcdGlmIChhciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGFyID0gW107XG5cdFx0XHRcdGZhY2VzLnNldChmMCwgYXIpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXIuaW5kZXhPZihlZGdlKSA9PT0gLTEpIHtcblx0XHRcdFx0YXIucHVzaChlZGdlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBhZGRDdXQgPSAoYzogRWRnZSkgPT4ge1xuXHRcdFx0cHJvY2VzcyhjLCBjLmZhY2VJbmRpY2VzWzBdKTtcblx0XHRcdHByb2Nlc3MoYywgYy5mYWNlSW5kaWNlc1sxXSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgYWRkRm9sZCA9IChmb2xkOiBGYWNlc0VkZ2UpID0+IHtcblx0XHRcdHByb2Nlc3MoZm9sZC5lZGdlLCBmb2xkLmZyb21GYWNlSW5kZXgpO1xuXHRcdFx0cHJvY2Vzcyhmb2xkLmVkZ2UsIGZvbGQudG9GYWNlSW5kZXgpO1xuXHRcdH1cblxuXHRcdHRoaXMuZm9sZHNNU1QuZm9yRWFjaChmb2xkID0+IHtcblx0XHRcdGFkZEZvbGQoZm9sZCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmN1dHMuZm9yRWFjaChjID0+IHtcblx0XHRcdGFkZEN1dChjKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuY2hlY2tBbGxUcmlhbmdsZXNDb21wbGV0ZShmYWNlcyk7XG5cblx0XHRjb25zdCBmYWNlUmVtYXAgPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpO1xuXHRcdHRoaXMuZmFjZXNJbmZvID0gbmV3IE1hcDxudW1iZXIsIEZhY2VJbmZvPigpO1xuXG5cdFx0Ly8gYnVpbGQgbmV3IGdlb21ldHJ5LlxuXHRcdC8vIG51bWJlciBvZiBmYWNlcyBpcyBjb25zdGFudC5cblx0XHRmYWNlcy5mb3JFYWNoKChlZGdlcywgZmFjZUluZGV4KSA9PiB7XG5cblx0XHRcdGNvbnN0IHZlcnRpY2VzID0gW1xuXHRcdFx0XHR0aGlzLmluZGV4W2ZhY2VJbmRleCAqIDNdLFxuXHRcdFx0XHR0aGlzLmluZGV4W2ZhY2VJbmRleCAqIDMgKyAxXSxcblx0XHRcdFx0dGhpcy5pbmRleFtmYWNlSW5kZXggKiAzICsgMl1cblx0XHRcdF07XG5cblx0XHRcdGNvbnN0IG52MCA9IHRoaXMudmVydGV4W3ZlcnRpY2VzWzBdXS5jbG9uZSgpO1xuXHRcdFx0bnYwLmluZGV4ID0gbmV3VmVydGljZXMubGVuZ3RoO1xuXHRcdFx0Y29uc3QgbnYxID0gdGhpcy52ZXJ0ZXhbdmVydGljZXNbMV1dLmNsb25lKCk7XG5cdFx0XHRudjEuaW5kZXggPSBuZXdWZXJ0aWNlcy5sZW5ndGggKyAxO1xuXHRcdFx0Y29uc3QgbnYyID0gdGhpcy52ZXJ0ZXhbdmVydGljZXNbMl1dLmNsb25lKCk7XG5cdFx0XHRudjIuaW5kZXggPSBuZXdWZXJ0aWNlcy5sZW5ndGggKyAyO1xuXG5cdFx0XHRuZXdWZXJ0aWNlcy5wdXNoKG52MCwgbnYxLCBudjIpO1xuXG5cdFx0XHRjb25zdCBpID0gbmV3SW5kZXgubGVuZ3RoO1xuXHRcdFx0bmV3SW5kZXgucHVzaChpLCBpICsgMSwgaSArIDIpO1xuXG5cdFx0XHRjb25zdCBuaSA9IChpIC8gMykgfCAwO1xuXHRcdFx0ZmFjZVJlbWFwLnNldChmYWNlSW5kZXgsIG5pKTtcblxuXHRcdFx0Y29uc3Qgb3JpZ2luYWxWZXJ0aWNlcyA9IFtudjAsIG52MSwgbnYyXVxuXG5cdFx0XHQvLyB0aGlzIHdvdWxkIHdvcmsgdG9vLCBidXQgSSB3YW50IGRlYnVnIG5vcm1hbCBpbiB0aGUgY2VudGVyIG9mIGVhY2ggZmFjZS5cblx0XHRcdC8vIGNvbnN0IG5vcm1hbCA9IHRoaXMubm9ybWFsRm9yVmVydGljZXMob3JpZ2luYWxWZXJ0aWNlcyk7XG5cdFx0XHRjb25zdCBub3JtYWwgPSBNeXJpYWhlZHJhbC5nZXRDZW50ZXJQb2ludChvcmlnaW5hbFZlcnRpY2VzLCB0cnVlKTtcblxuXHRcdFx0dGhpcy5mYWNlc0luZm8uc2V0KG5pLCB7XG5cdFx0XHRcdGlkOiBuaSxcblx0XHRcdFx0cHJldklkOiBmYWNlSW5kZXgsXG5cdFx0XHRcdGVkZ2VzLFxuXHRcdFx0XHR2ZXJ0aWNlczogb3JpZ2luYWxWZXJ0aWNlcyxcblx0XHRcdFx0cHJldlZlcnRpY2VzSW5kaWNlczogdmVydGljZXMsXG5cdFx0XHRcdG5vcm1hbCxcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5lZGdlcy5mb3JFYWNoKGUgPT4ge1xuXHRcdFx0ZS5mYWNlSW5kaWNlc1swXSA9IGZhY2VSZW1hcC5nZXQoZS5mYWNlSW5kaWNlc1swXSk7XG5cdFx0XHRlLmZhY2VJbmRpY2VzWzFdID0gZmFjZVJlbWFwLmdldChlLmZhY2VJbmRpY2VzWzFdKTtcblxuXHRcdH0pO1xuXG5cdFx0dGhpcy52ZXJ0ZXggPSBuZXdWZXJ0aWNlcztcblx0XHR0aGlzLmluZGV4ID0gbmV3SW5kZXg7XG5cdH1cblxuXHRwcml2YXRlIHVuZm9sZFNldHVwKG5lZWRzUmV0cmlhbmd1bGF0aW9uOiBib29sZWFuKSB7XG5cblx0XHR0aGlzLmJ1aWxkRm9sZGluZ1RyZWUoKTtcblxuXHRcdGlmIChuZWVkc1JldHJpYW5ndWxhdGlvbikge1xuXHRcdFx0dGhpcy5yZVRyaWFuZ3VsYXRlR2VvbWV0cnkoKTtcblx0XHR9XG5cblx0XHR0aGlzLm9yaWdpbmFsVmVydGljZXMgPSB0aGlzLnZlcnRleDtcblxuXHRcdHRoaXMudXYgPSB0aGlzLmNhbGN1bGF0ZVVWKCk7XG5cdFx0dGhpcy5zZXRGb2xkc09yaWVudGF0aW9ucygpO1xuXG5cdFx0Y29uc29sZS5sb2coYERlYnVnIGluZm86YCk7XG5cdFx0aWYgKHRoaXMubWlyeWFoZWRyb25HZW9tZXRyeSkge1xuXHRcdFx0Y29uc29sZS5sb2coYCAgT3JpZ2luYWw6ICR7dGhpcy5taXJ5YWhlZHJvbkdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aH0tJHt0aGlzLm1pcnlhaGVkcm9uR2VvbWV0cnkuZmFjZXMubGVuZ3RofS0ke3RoaXMubWlyeWFoZWRyb25HZW9tZXRyeS5lZGdlcy5sZW5ndGh9YCk7XG5cdFx0fVxuXHRcdGNvbnNvbGUubG9nKGAgIEdlb21ldHJ5OiAke3RoaXMub3JpZ2luYWxWZXJ0aWNlcy5sZW5ndGh9LSR7dGhpcy5mYWNlc0luZm8uc2l6ZX1gKTtcblx0XHRjb25zb2xlLmxvZyhgICBGb2xkcy9DdXRzOiAke3RoaXMuZm9sZHNNU1QubGVuZ3RofS8ke3RoaXMuY3V0cz8ubGVuZ3RoID8/IDB9YCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRDZW50ZXJQb2ludCh2OiBWZXJ0ZXhbXSwgbm9ybWFsaXplOiBib29sZWFuKTogbnVtYmVyW10ge1xuXHRcdGxldCBueCA9ICh2WzBdLnggKyB2WzFdLnggKyB2WzJdLngpIC8gMztcblx0XHRsZXQgbnkgPSAodlswXS55ICsgdlsxXS55ICsgdlsyXS55KSAvIDM7XG5cdFx0bGV0IG56ID0gKHZbMF0ueiArIHZbMV0ueiArIHZbMl0ueikgLyAzO1xuXG5cdFx0aWYgKG5vcm1hbGl6ZSkge1xuXHRcdFx0Y29uc3QgbCA9IDEgLyBNYXRoLnNxcnQobnggKiBueCArIG55ICogbnkgKyBueiAqIG56KTtcblx0XHRcdG54ICo9IGw7XG5cdFx0XHRueSAqPSBsO1xuXHRcdFx0bnogKj0gbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gW254LCBueSwgbnpdO1xuXHR9XG5cblx0cHJpdmF0ZSBzZXRGb2xkc09yaWVudGF0aW9ucygpIHtcblxuXHRcdHRoaXMuZm9sZHNNU1QuZm9yRWFjaChmb2xkID0+IHRoaXMuc2V0dXBDb21tb25yb3RhdGlvbkF4aXNWZXJ0aWNlcyhmb2xkKSk7XG5cblx0XHR0aGlzLnNldHVwR2VvbWV0cnkoKTtcblx0XHR0aGlzLnJvb3RzLmZvckVhY2gocm9vdCA9PiB7XG5cdFx0XHR0aGlzLmNhbGN1bGF0ZU9yaWVudGF0aW9ucyhyb290KVxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZG90KHYwOiBudW1iZXJbXSwgdjE6IG51bWJlcltdKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdjBbMF0gKiB2MVswXSArIHYwWzFdICogdjFbMV0gKyB2MFsyXSAqIHYxWzJdO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZSBmb2xkIGFuZ2xlcyBiZWZvcmUvYWZ0ZXIgcm90YXRpb24gb3ZlciBjb21tb24gYXhpcyB0byBkZXRlcm1pbmUgd2hhdCBpcyBpbndhcmRzLW91dHdhcmRzLlxuXHQgKiBXZSBleHBlY3QgdGhlIG15cmlhaGVkcm9uIHRvIGJlIDEwMCUgZmxhdCBhZnRlciB1bmZvbGRpbmcgcHJvY2Vzcy5cblx0ICovXG5cdHByaXZhdGUgY2FsY3VsYXRlT3JpZW50YXRpb25zKG5vZGU6IEZhY2VzRWRnZSkge1xuXHRcdG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjID0+IHtcblx0XHRcdHRoaXMuY2FsY3VsYXRlT3JpZW50YXRpb25zKGMpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gZ2V0IHN0YXJ0aW5nIGFuZ2xlXG5cdFx0Y29uc3QgbjAgPSB0aGlzLmZhY2VzSW5mby5nZXQobm9kZS5mcm9tRmFjZUluZGV4KS5ub3JtYWw7XG5cdFx0Y29uc3QgbjEgPSB0aGlzLmZhY2VzSW5mby5nZXQobm9kZS50b0ZhY2VJbmRleCkubm9ybWFsO1xuXHRcdGNvbnN0IGFuZ2xlMCA9IE15cmlhaGVkcmFsLmRvdChuMCwgbjEpO1xuXG5cdFx0Ly8gcm90YXRlIGFyb3VuZCBjb21tb24gYXhpc1xuXHRcdHRoaXMuc2V0dXBRdWF0ZXJuaW9uRm9yKG5vZGUsIDEpO1xuXHRcdGNvbnN0IHZyZWYgPSBub2RlLmNvbW1vbkF4aXNWZXJ0aWNlc1swXTtcblx0XHR0aGlzLmZhY2VzSW5mby5nZXQobm9kZS50b0ZhY2VJbmRleCkudmVydGljZXMuZm9yRWFjaCh2ID0+IHtcblx0XHRcdE15cmlhaGVkcmFsLnJvdGF0ZVdpdGgocTAsIHYsIHZyZWYpO1xuXHRcdH0pO1xuXHRcdGNvbnN0IG5ld04xID0gdGhpcy5ub3JtYWxGb3JGYWNlSW5kZXgobm9kZS50b0ZhY2VJbmRleCk7XG5cblx0XHQvLyBnZXQgbmV3IGFuZ2xlXG5cdFx0Y29uc3QgYW5nbGUxID0gTXlyaWFoZWRyYWwuZG90KG4wLCBuZXdOMSk7XG5cblx0XHQvLyBzZXQgdW5mb2xkaW5nIG9yaWVudGF0aW9uXG5cdFx0bm9kZS5vcmllbnRhdGlvbk11bHRpcGxpZXIgPSAoYW5nbGUxIDwgYW5nbGUwKSA/IC0xIDogMTtcblxuXHRcdC8vIHJlc3RvcmUgcm90YXRlZCBmYWNlIHZlcnRpY2VzXG5cdFx0Y29uc3QgZiA9IHRoaXMuZmFjZXNJbmZvLmdldChub2RlLnRvRmFjZUluZGV4KTtcblx0XHRmLnZlcnRpY2VzLmZvckVhY2goKHYsIGkpID0+IHtcblx0XHRcdGYudmVydGljZXNbaV0uY29weSh0aGlzLm9yaWdpbmFsVmVydGljZXNbdi5pbmRleF0pO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBzZXR1cENvbW1vbnJvdGF0aW9uQXhpc1ZlcnRpY2VzKGZvbGQ6IEZhY2VzRWRnZSkge1xuXG5cdFx0Y29uc3QgZmkwID0gdGhpcy5mYWNlc0luZm8uZ2V0KGZvbGQuZnJvbUZhY2VJbmRleCk7XG5cdFx0Y29uc3QgZmkxID0gdGhpcy5mYWNlc0luZm8uZ2V0KGZvbGQudG9GYWNlSW5kZXgpO1xuXG5cdFx0Y29uc3Qgcm90YXRpb25FZGdlVmVydGljZXNJbmRpY2VzID0gZmkwLnByZXZWZXJ0aWNlc0luZGljZXMuZmlsdGVyKHYgPT4ge1xuXHRcdFx0cmV0dXJuIGZpMS5wcmV2VmVydGljZXNJbmRpY2VzLmluZGV4T2YodikgIT09IC0xO1x0XHQvLyB2YWxvcmVzIGNvbXVuZXNcblx0XHR9KTtcblxuXHRcdGZvbGQuY29tbW9uQXhpc1ZlcnRpY2VzID0gcm90YXRpb25FZGdlVmVydGljZXNJbmRpY2VzLm1hcCh2ID0+IHtcblx0XHRcdHJldHVybiBmaTAudmVydGljZXNbZmkwLnByZXZWZXJ0aWNlc0luZGljZXMuaW5kZXhPZih2KV07XG5cdFx0fSk7XG5cblx0XHQvLyBub3QgdGhlIHNhbWUgdmVydGljZXMgaW5kaWNlcy4gR3JhdGljdWxlIHVzZXMgYW4gYWQtaG9jIHRyaWFuZ2xlIHBhaXJpbmcgcHJvY2Vzcyxcblx0XHQvLyBhbmQgdGhpcyBtaWdodCBub3Qgd29yayBhcyBleHBlY3RlZC4gQ2hlY2sgZm9yIGRpZmYgcG9pbnRzLlxuXHRcdGlmIChmb2xkLmNvbW1vbkF4aXNWZXJ0aWNlcy5sZW5ndGggIT09IDIpIHtcblx0XHRcdGZvbGQuY29tbW9uQXhpc1ZlcnRpY2VzID0gZmkwLnZlcnRpY2VzLmZpbHRlcih2ID0+IHtcblx0XHRcdFx0cmV0dXJuIGZpMS52ZXJ0aWNlcy5maW5kKHYwID0+IHYwLmVxdWFscyh2KSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHVuZm9sZFByb2Nlc3Moc2NhbGU6IG51bWJlcikge1xuXHRcdC8vIGxldCB0ID0gRGF0ZS5ub3coKTtcblx0XHR0aGlzLnJvb3RzLmZvckVhY2goZiA9PiB0aGlzLnVuZm9sZEltcGwoZiwgc2NhbGUpKTtcblx0XHQvLyB0ID0gRGF0ZS5ub3coKSAtIHQ7XG5cdFx0Ly8gY29uc29sZS5sb2coYHVuZm9sZCB2ZXJ0aWNlcyB0b29rICR7dH1tcy5gKTtcblx0fVxuXG5cdHByaXZhdGUgc2V0dXBHZW9tZXRyeSgpIHtcblx0XHR0aGlzLnZlcnRleCA9IHRoaXMub3JpZ2luYWxWZXJ0aWNlcy5tYXAodiA9PiB7XG5cdFx0XHRyZXR1cm4gdi5jbG9uZSgpXG5cdFx0fSk7XG5cdFx0dGhpcy5mYWNlc0luZm8uZm9yRWFjaChmID0+IHtcblx0XHRcdGYudmVydGljZXMuZm9yRWFjaCgodiwgaSkgPT4ge1xuXHRcdFx0XHRmLnZlcnRpY2VzW2ldID0gdGhpcy52ZXJ0ZXhbdi5pbmRleF07XG5cdFx0XHR9KTtcblx0XHRcdGYubm9ybWFsID0gVmVydGV4Lm5vcm1hbEZvclZlcnRpY2VzKGYudmVydGljZXMpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHVibGljIHVuZm9sZChzY2FsZTogbnVtYmVyKSB7XG5cblx0XHR0aGlzLnNldHVwR2VvbWV0cnkoKTtcblxuXHRcdHRoaXMudW5mb2xkUHJvY2VzcyhzY2FsZSk7XG5cblx0XHR0aGlzLmZvbGRzID0gdGhpcy5mb2xkc01TVC5tYXAoZSA9PiB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRmMDogZS5lZGdlLmZhY2VJbmRpY2VzWzBdLFxuXHRcdFx0XHRmMTogZS5lZGdlLmZhY2VJbmRpY2VzWzFdLFxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBub3JtYWxGb3JGYWNlSW5kZXgoaTogbnVtYmVyKSB7XG5cdFx0cmV0dXJuIFZlcnRleC5ub3JtYWxGb3JWZXJ0aWNlcyh0aGlzLmZhY2VzSW5mby5nZXQoaSkudmVydGljZXMpO1xuXHR9XG5cblx0cHJpdmF0ZSB1bmZvbGRJbXBsKG5vZGU6IEZhY2VzRWRnZSwgc2NhbGU6IG51bWJlcikge1xuXHRcdG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjID0+IHtcblx0XHRcdHRoaXMudW5mb2xkSW1wbChjLCBzY2FsZSlcblx0XHR9KTtcblxuXHRcdHRoaXMudW5mb2xkTm9kZVJlYyhub2RlLCBzY2FsZSk7XG5cdH1cblxuXHRwcml2YXRlIHNldHVwUXVhdGVybmlvbkZvcihub2RlOiBGYWNlc0VkZ2UsIHNjYWxlOiBudW1iZXIpIHtcblx0XHRjb25zdCBmaTAgPSB0aGlzLmZhY2VzSW5mby5nZXQobm9kZS5mcm9tRmFjZUluZGV4KTtcblx0XHRjb25zdCBmaTEgPSB0aGlzLmZhY2VzSW5mby5nZXQobm9kZS50b0ZhY2VJbmRleCk7XG5cblx0XHRjb25zdCBOMCA9IGZpMC5ub3JtYWw7XG5cdFx0Y29uc3QgTjEgPSBmaTEubm9ybWFsO1xuXG5cdFx0Y29uc3QgYWMgPSBNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgTXlyaWFoZWRyYWwuZG90KE4wLCBOMSkpKTtcblx0XHRsZXQgZGlmZkFuZ2xlID0gc2NhbGUgKlxuXHRcdFx0TWF0aC5hY29zKGFjKSAqXG5cdFx0XHRub2RlLm9yaWVudGF0aW9uTXVsdGlwbGllcjtcblxuXHRcdGNvbnN0IHJvdGF0aW9uRWRnZVZlcnRpY2VzID0gbm9kZS5jb21tb25BeGlzVmVydGljZXM7XG5cdFx0a25uWzBdID0gcm90YXRpb25FZGdlVmVydGljZXNbMV0ueCAtIHJvdGF0aW9uRWRnZVZlcnRpY2VzWzBdLng7XG5cdFx0a25uWzFdID0gcm90YXRpb25FZGdlVmVydGljZXNbMV0ueSAtIHJvdGF0aW9uRWRnZVZlcnRpY2VzWzBdLnk7XG5cdFx0a25uWzJdID0gcm90YXRpb25FZGdlVmVydGljZXNbMV0ueiAtIHJvdGF0aW9uRWRnZVZlcnRpY2VzWzBdLno7XG5cdFx0Y29uc3QgZSA9IFZlY3RvcjMubm9ybWFsaXplKGtubiwga25uKTtcblxuXHRcdFF1YXRlcm5pb24uZnJvbUF4aXNBbmRBbmdsZShxMCwgZSwgZGlmZkFuZ2xlKTtcblx0fVxuXG5cdHByaXZhdGUgdW5mb2xkTm9kZVJlYyhub2RlOiBGYWNlc0VkZ2UsIHNjYWxlOiBudW1iZXIpIHtcblx0XHR0aGlzLnNldHVwUXVhdGVybmlvbkZvcihub2RlLCBzY2FsZSk7XG5cdFx0dGhpcy5yb3RhdGVQb2ludFJlY1F1YXRlcmlvbihub2RlLCBub2RlLmNvbW1vbkF4aXNWZXJ0aWNlc1swXSwgcTApO1xuXHR9XG5cblx0cHJpdmF0ZSByb3RhdGVQb2ludFJlY1F1YXRlcmlvbihuOiBGYWNlc0VkZ2UsIHZyZWY6IFZlcnRleCwgcTA6IEZsb2F0MzJBcnJheSkge1xuXG5cdFx0bi5jaGlsZHJlbi5mb3JFYWNoKGMgPT4ge1xuXHRcdFx0dGhpcy5yb3RhdGVQb2ludFJlY1F1YXRlcmlvbihjLCB2cmVmLCBxMCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmZhY2VzSW5mby5nZXQobi50b0ZhY2VJbmRleCkudmVydGljZXMuZm9yRWFjaCh2ID0+IHtcblxuXHRcdFx0TXlyaWFoZWRyYWwucm90YXRlV2l0aChxMCwgdiwgdnJlZik7XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyByb3RhdGVXaXRoKHEwOiBGbG9hdDMyQXJyYXksIHY6IFZlcnRleCwgdnJlZjogVmVydGV4KSB7XG5cdFx0a25uUDBbMF0gPSB2LnggLSB2cmVmLng7XG5cdFx0a25uUDBbMV0gPSB2LnkgLSB2cmVmLnk7XG5cdFx0a25uUDBbMl0gPSB2LnogLSB2cmVmLno7XG5cblx0XHRjb25zdCBycDAgPSBRdWF0ZXJuaW9uLnJvdGF0ZShxMCwga25uUDApO1xuXG5cdFx0di54ID0gcnAwWzBdICsgdnJlZi54O1xuXHRcdHYueSA9IHJwMFsxXSArIHZyZWYueTtcblx0XHR2LnogPSBycDBbMl0gKyB2cmVmLno7XG5cdH1cbn0iLCJleHBvcnQgdHlwZSBWZXJ0ZXhUeXBlID0gbnVtYmVyW107XG5leHBvcnQgdHlwZSBGYWNlVHlwZSA9IG51bWJlcltdO1xuZXhwb3J0IHR5cGUgRWRnZVR5cGUgPSBudW1iZXJbXTtcblxuZXhwb3J0IGludGVyZmFjZSBNeXJpYWhlZHJvbkdlb21ldHJ5IHtcblx0bmFtZTogc3RyaW5nO1xuXHR2ZXJ0aWNlczogVmVydGV4VHlwZVtdO1xuXHRlZGdlcz86IEVkZ2VUeXBlW107XG5cdGZhY2VzOiBGYWNlVHlwZVtdO1xufVxuXG5leHBvcnQgY29uc3QgT2N0YWhlZHJvbkdlb21ldHJ5OiBNeXJpYWhlZHJvbkdlb21ldHJ5ID0ge1xuXHRuYW1lOiAnb2N0YWhlZHJvbicsXG5cdHZlcnRpY2VzOiBbXG5cdFx0WzAsIDEsIDBdLFxuXHRcdFsxLCAwLCAwXSxcblx0XHRbMCwgMCwgLTFdLFxuXHRcdFstMSwgMCwgMF0sXG5cdFx0WzAsIDAsIDFdLFxuXHRcdFswLCAtMSwgMF1cblx0XSxcblx0ZmFjZXM6IFtcblx0XHRbMCwxLDJdLFxuXHRcdFswLDIsM10sXG5cdFx0WzAsMyw0XSxcblx0XHRbMCw0LDFdLFxuXHRcdFs1LDIsMV0sXG5cdFx0WzUsMywyXSxcblx0XHRbNSw0LDNdLFxuXHRcdFs1LDEsNF1cblx0XVxufVxuXG5leHBvcnQgY29uc3QgVGV0cmFoZWRyb25HZW9tZXRyeTogTXlyaWFoZWRyb25HZW9tZXRyeSA9IHtcblxuXHRuYW1lOiAndGV0cmFoZWRyb24nLFxuXHR2ZXJ0aWNlczogW1xuXHRcdFswLjAsIC0xLjAsIDIuMF0sXG5cdFx0WzEuNzMyMDUwODEsIC0xLjAsIC0xLjBdLFxuXHRcdFstMS43MzIwNTA4MSwgLTEuMCwgLTEuMF0sXG5cdFx0WzAuMCwgMi4wLCAwLjBdLFxuXHRdLFxuXHRlZGdlczogW1syLCAwXSwgWzAsIDFdLCBbMywgMF0sIFsxLCAyXSwgWzIsIDNdLCBbMywgMV1dLFxuXHRmYWNlczogW1xuXHRcdFswLCAyLCAxXSxcblx0XHRbMCwgMywgMl0sXG5cdFx0WzAsIDEsIDNdLFxuXHRcdFsxLCAyLCAzXSxcblx0XVxufTtcblxuZXhwb3J0IGNvbnN0IEN1YmVHZW9tZXRyeTogTXlyaWFoZWRyb25HZW9tZXRyeSA9IHtcblxuXHRuYW1lOiAnY3ViZScsXG5cdHZlcnRpY2VzOiBbXG5cdFx0WzAuNSwgLTAuNSwgLTAuNV0sXG5cdFx0Wy0wLjUsIC0wLjUsIC0wLjVdLFxuXHRcdFstMC41LCAtMC41LCAwLjVdLFxuXHRcdFswLjUsIC0wLjUsIDAuNV0sXG5cdFx0WzAuNSwgMC41LCAtMC41XSxcblx0XHRbLTAuNSwgMC41LCAtMC41XSxcblx0XHRbLTAuNSwgMC41LCAwLjVdLFxuXHRcdFswLjUsIDAuNSwgMC41XSxcblx0XSxcblxuXHRmYWNlczogW1xuXHRcdFx0WzIsIDEsIDBdLCBbMywgMiwgMF0sXG5cdFx0XHRbMywgMCwgNF0sIFs3LCAzLCA0XSxcblx0XHRcdFswLCAxLCA1XSwgWzQsIDAsIDVdLFxuXHRcdFx0WzEsIDIsIDZdLCBbNSwgMSwgNl0sXG5cdFx0XHRbMiwgMywgN10sIFs2LCAyLCA3XSxcblx0XHRcdFs0LCA1LCA2XSwgWzcsIDQsIDZdLFxuXHRcdF0sXG5cblx0ZWRnZXM6IFtcblx0XHRbMiwwXSxbMywwXSxbMyw0XSxcblx0XHRbMCwxXSxbNCwwXSxbMCw1XSxcblx0XHRbMSwyXSxbNSwxXSxbMSw2XSxcblx0XHRbMiwzXSxbMyw3XSxbNiwyXSxcblx0XHRbMiw3XSxbNCw1XSxbNSw2XSxcblx0XHRbNyw0XSxbNCw2XSxbNiw3XVxuXHRdXG59XG5cbmV4cG9ydCBjb25zdCBJY29zYWhlZHJvbkdlb21ldHJ5OiBNeXJpYWhlZHJvbkdlb21ldHJ5ID0ge1xuXHRuYW1lOiAnaWNvc2FoZWRyb24nLFxuXHR2ZXJ0aWNlczogW1xuXHRcdFstMC4yNjI4NjUwMCwgMCwgMC40MjUzMjUwMF0sXG5cdFx0WzAuMjYyODY1MDAsIDAsIDAuNDI1MzI1MDBdLFxuXHRcdFstMC4yNjI4NjUwMCwgMCwgLTAuNDI1MzI1MDBdLFxuXHRcdFswLjI2Mjg2NTAwLCAwLCAtMC40MjUzMjUwMF0sXG5cdFx0WzAsIDAuNDI1MzI1MDAsIDAuMjYyODY1MDBdLFxuXHRcdFswLCAwLjQyNTMyNTAwLCAtMC4yNjI4NjUwMF0sXG5cdFx0WzAsIC0wLjQyNTMyNTAwLCAwLjI2Mjg2NTAwXSxcblx0XHRbMCwgLTAuNDI1MzI1MDAsIC0wLjI2Mjg2NTAwXSxcblx0XHRbMC40MjUzMjUwMCwgMC4yNjI4NjUwMCwgMF0sXG5cdFx0Wy0wLjQyNTMyNTAwLCAwLjI2Mjg2NTAwLCAwXSxcblx0XHRbMC40MjUzMjUwMCwgLTAuMjYyODY1MDAsIDBdLFxuXHRcdFstMC40MjUzMjUwMCwgLTAuMjYyODY1MDAsIDBdLFxuXHRdLFxuXHRmYWNlczogW1xuXHRcdFswLCA2LCAxXSxcblx0XHRbMCwgMTEsIDZdLFxuXHRcdFsxLCA0LCAwXSxcblx0XHRbMSwgOCwgNF0sXG5cdFx0WzEsIDEwLCA4XSxcblx0XHRbMiwgNSwgM10sXG5cdFx0WzIsIDksIDVdLFxuXHRcdFsyLCAxMSwgOV0sXG5cdFx0WzMsIDcsIDJdLFxuXHRcdFszLCAxMCwgN10sXG5cdFx0WzQsIDgsIDVdLFxuXHRcdFs0LCA5LCAwXSxcblx0XHRbNSwgOCwgM10sXG5cdFx0WzUsIDksIDRdLFxuXHRcdFs2LCAxMCwgMV0sXG5cdFx0WzYsIDExLCA3XSxcblx0XHRbNywgMTAsIDZdLFxuXHRcdFs3LCAxMSwgMl0sXG5cdFx0WzgsIDEwLCAzXSxcblx0XHRbOSwgMTEsIDBdXG5cdF1cbn1cblxuIiwiaW1wb3J0IFNoYWRlciwge1NoYWRlclZBT0luZm8sIFZBT0dlb21ldHJ5SW5mb30gZnJvbSBcIi4vU2hhZGVyXCI7XG5pbXBvcnQgRW5naW5lIGZyb20gXCIuLi9FbmdpbmVcIjtcbmltcG9ydCBNYXRlcmlhbCBmcm9tIFwiLi4vTWF0ZXJpYWxcIjtcbmltcG9ydCBSZW5kZXJDb21wb25lbnQgZnJvbSBcIi4uL1JlbmRlckNvbXBvbmVudFwiO1xuXG5leHBvcnQgY2xhc3MgRW52aXJvbm1lbnRNYXBTaGFkZXIgZXh0ZW5kcyBTaGFkZXIge1xuXG5cdGNvbnN0cnVjdG9yKGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LCByZWZyYWN0aXZlPzogYm9vbGVhbikge1xuXHRcdHN1cGVyKHtcblx0XHRcdGdsLFxuXHRcdFx0dmVydGV4IDogYCN2ZXJzaW9uIDMwMCBlc1xuXHRcdFx0XG5cdFx0XHRcdHByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xuXHRcdFx0XHRcblx0XHRcdFx0bGF5b3V0IChsb2NhdGlvbiA9IDApIGluIHZlYzMgYVBvc2l0aW9uO1xuXHRcdFx0XHRsYXlvdXQgKGxvY2F0aW9uID0gMSkgaW4gdmVjMyBhTm9ybWFsO1xuXHRcdFx0XHRsYXlvdXQgKGxvY2F0aW9uID0gMikgaW4gbWF0NCBhTW9kZWw7XG5cdFx0XHRcdFxuXHRcdFx0XHR1bmlmb3JtIG1hdDQgdVByb2plY3Rpb247XG5cdFx0XHRcdHVuaWZvcm0gbWF0NCB1TW9kZWxWaWV3O1xuXHRcdFx0XHRcblx0XHRcdFx0b3V0IHZlYzMgdk5vcm1hbDtcblx0XHRcdFx0b3V0IHZlYzMgdk1vZGVsUG9zaXRpb247XG5cdFx0XHRcdFxuXHRcdFx0XHR2b2lkIG1haW4oKSB7XHRcdFx0XHRcdFxuXHRcdFx0XHRcdHZNb2RlbFBvc2l0aW9uID0gdmVjMyhhTW9kZWwgKiB2ZWM0KGFQb3NpdGlvbiwgMS4wKSk7XG5cdFx0XHRcdFx0Ly8gdG8gY29wZSB3aXRoIG5vbiB1bmlmb3JtIHNjYWxlcyAobm9ybWFsIG1hdHJpeClcblx0XHRcdFx0XHQvLyBidWdidWc6IGNhbGN1bGF0ZSBpbiBjcHUsIGFuZCBwYXNzIGFzIGFub3RoZXIgaW5zdGFuY2UgYXR0cmlidXRlLlxuXHRcdFx0XHRcdHZOb3JtYWwgPSBtYXQzKHRyYW5zcG9zZShpbnZlcnNlKGFNb2RlbCkpKSphTm9ybWFsO1x0XG5cdFx0XHRcdFx0Z2xfUG9zaXRpb24gPSB1UHJvamVjdGlvbiAqIHVNb2RlbFZpZXcgKiBhTW9kZWwgKiB2ZWM0KGFQb3NpdGlvbiwgMS4wKTtcblx0XHRcdFx0fVxuXHRcdFx0YCxcblx0XHRcdGZyYWdtZW50OiBgI3ZlcnNpb24gMzAwIGVzXG5cdFx0XHRcblx0XHRcdFx0cHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG5cdFx0XHRcdFxuXHRcdFx0XHR1bmlmb3JtIHNhbXBsZXJDdWJlIHVTa3lib3g7XG5cdFx0XHRcdHVuaWZvcm0gdmVjMyB1Q2FtZXJhUG9zO1xuXHRcdFx0XHR1bmlmb3JtIGZsb2F0IHVSZWZyYWN0aW9uRmFjdG9yO1xuXHRcdFx0XHRcblx0XHRcdFx0aW4gdmVjMyB2Tm9ybWFsO1xuXHRcdFx0XHRpbiB2ZWMzIHZNb2RlbFBvc2l0aW9uO1xuXHRcdFx0XHRcblx0XHRcdFx0b3V0IHZlYzQgY29sb3I7XG5cdFx0XHRcdFxuXHRcdFx0XHQjaWZkZWYgUkVGUkFDVElWRVxuXHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHR2ZWM0IHJlZnJhY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRmbG9hdCByYXRpbyA9IDEuMDAgLyB1UmVmcmFjdGlvbkZhY3Rvcjtcblx0XHRcdFx0XHRcdHZlYzMgSSA9IG5vcm1hbGl6ZSh2TW9kZWxQb3NpdGlvbi11Q2FtZXJhUG9zKTtcblx0XHRcdFx0XHRcdHZlYzMgUiA9IHJlZnJhY3QoSSwgbm9ybWFsaXplKHZOb3JtYWwpLCByYXRpbyk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGV4dHVyZSh1U2t5Ym94LCBSKTtcblx0XHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR2b2lkIG1haW4oKSB7XG5cdFx0XHRcdFx0XHRjb2xvciA9IHJlZnJhY3Rpb24oKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCNlbHNlIFxuXHRcdFx0XHRcdHZlYzQgcmVmbGVjdGlvbigpIHtcblx0XHRcdFx0XHRcdHZlYzMgSSA9IG5vcm1hbGl6ZSh2TW9kZWxQb3NpdGlvbi11Q2FtZXJhUG9zKTtcblx0XHRcdFx0XHRcdHZlYzMgUiA9IHJlZmxlY3QoSSwgbm9ybWFsaXplKHZOb3JtYWwpKTtcblx0XHRcdFx0XHRcdHJldHVybiB0ZXh0dXJlKHVTa3lib3gsIFIpO1x0XHRcdFx0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHZvaWQgbWFpbigpIHtcblx0XHRcdFx0XHRcdGNvbG9yID0gcmVmbGVjdGlvbigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0I2VuZGlmXG5cdFx0XHRgLFxuXHRcdFx0dW5pZm9ybXM6IFsndVByb2plY3Rpb24nLCAndU1vZGVsVmlldycsICd1U2t5Ym94JywgJ3VDYW1lcmFQb3MnLCAndVJlZnJhY3Rpb25GYWN0b3InXSxcblx0XHRcdGF0dHJpYnV0ZXM6IFsnYVBvc2l0aW9uJywgJ2FOb3JtYWwnLCAnYU1vZGVsJ10sXG5cdFx0XHRkZWZpbmVzOiByZWZyYWN0aXZlID8geydSRUZSQUNUSVZFJzogJzEnfSA6IHt9XG5cdFx0fSk7XG5cblx0XHRpZiAocmVmcmFjdGl2ZSkge1xuXHRcdFx0dGhpcy51c2UoKTtcblx0XHRcdHRoaXMuc2V0MUYoXCJ1UmVmcmFjdGlvbkZhY3RvclwiLCAxLjUyKTtcblx0XHRcdHRoaXMubm90VXNlKCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKGU6IEVuZ2luZSwgaW5mbzogU2hhZGVyVkFPSW5mbywgcmM6IFJlbmRlckNvbXBvbmVudCkge1xuXHRcdGNvbnN0IGdsID0gZS5nbDtcblxuXHRcdHRoaXMudXNlKCk7XG5cdFx0dGhpcy5zZXRNYXRyaXg0ZnYoXCJ1UHJvamVjdGlvblwiLCBmYWxzZSwgZS5wcm9qZWN0aW9uTWF0cml4KCkpO1xuXHRcdHJjLmdldE1hdGVyaWFsKCkuZGVmaW5pdGlvbi5kaWZmdXNlLmVuYWJsZUFzVW5pdChnbCwgMCk7XG5cdFx0dGhpcy5zZXQxSShcInVTa3lib3hcIiwgMCk7XG5cdFx0dGhpcy5zZXRNYXRyaXg0ZnYoXCJ1TW9kZWxWaWV3XCIsIGZhbHNlLCBlLmNhbWVyYU1hdHJpeCgpKTtcblx0XHRjb25zdCBjYW1lcmFQb3MgPSBlLmNhbWVyYVBvc2l0aW9uKCk7XG5cdFx0dGhpcy5zZXQzRihcInVDYW1lcmFQb3NcIiwgY2FtZXJhUG9zWzBdLCBjYW1lcmFQb3NbMV0sIGNhbWVyYVBvc1syXSk7XG5cblx0XHRnbC5iaW5kVmVydGV4QXJyYXkoaW5mby52YW8pO1xuXG5cdFx0aW5mby5pbnN0YW5jZUJ1ZmZlci5kcmF3KGdsLCBpbmZvLnZlcnRleENvdW50LCBpbmZvLmluc3RhbmNlQ291bnQpO1xuXHRcdC8vIGlmIChpbmZvLmluZGV4QnVmZmVyICE9PSBudWxsKSB7XG5cdFx0Ly8gXHRnbC5kcmF3RWxlbWVudHNJbnN0YW5jZWQoZ2wuVFJJQU5HTEVTLCBpbmZvLnZlcnRleENvdW50LCBnbC5VTlNJR05FRF9TSE9SVCwgMCwgaW5mby5pbnN0YW5jZUNvdW50KTtcblx0XHQvLyB9IGVsc2Uge1xuXHRcdC8vIFx0Z2wuZHJhd0FycmF5c0luc3RhbmNlZChnbC5UUklBTkdMRVMsIDAsIGluZm8udmVydGV4Q291bnQsIGluZm8uaW5zdGFuY2VDb3VudCk7XG5cdFx0Ly8gfVxuXG5cdFx0Z2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xuXHRcdHRoaXMubm90VXNlKCk7XG5cdH1cblxuXHRjcmVhdGVWQU8oZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQsIGdlb21ldHJ5SW5mbzogVkFPR2VvbWV0cnlJbmZvLCBtYXRlcmlhbDogTWF0ZXJpYWwpIDogU2hhZGVyVkFPSW5mbyB7XG5cblx0XHRjb25zdCBpbnN0YW5jZUNvdW50ID0gZ2VvbWV0cnlJbmZvLmluc3RhbmNlQ291bnQgfHwgMTtcblxuXHRcdGNvbnN0IHZhbyA9IGdsLmNyZWF0ZVZlcnRleEFycmF5KCk7XG5cdFx0Z2wuYmluZFZlcnRleEFycmF5KHZhbyk7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG5cdFx0XHRnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShpKTtcblx0XHR9XG5cblx0XHRjb25zdCBnbEdlb21ldHJ5QnVmZmVyID0gU2hhZGVyLmNyZWF0ZUF0dHJpYnV0ZUluZm8oZ2wsIDAsIGdlb21ldHJ5SW5mby52ZXJ0ZXgsIDEyLCAwKTtcblx0XHRjb25zdCBnbE5vcm1hbEJ1ZmZlciA9IFNoYWRlci5jcmVhdGVBdHRyaWJ1dGVJbmZvKGdsLCAxLCBnZW9tZXRyeUluZm8ubm9ybWFsLCAxMiwgMCk7XG5cdFx0Y29uc3QgZ2xJbnN0YW5jZWRNb2RlbE1hdHJpeEJ1ZmZlciA9IFNoYWRlci5jcmVhdGVJbnN0YW5jZWRNb2RlbE1hdHJpeChnbCwgaW5zdGFuY2VDb3VudCwgMiwgISFnZW9tZXRyeUluZm8uaW5kZXgpO1xuXHRcdGxldCBnbEJ1ZmZlckluZGV4OiBXZWJHTEJ1ZmZlciA9IG51bGw7XG5cdFx0bGV0IHZlcnRleENvdW50ID0gKGdlb21ldHJ5SW5mby52ZXJ0ZXgubGVuZ3RoLzMpfDA7XG5cdFx0aWYgKGdlb21ldHJ5SW5mby5pbmRleCE9PW51bGwpIHtcblx0XHRcdGdsQnVmZmVySW5kZXggPSBnbC5jcmVhdGVCdWZmZXIoKTtcblx0XHRcdGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGdsQnVmZmVySW5kZXgpO1xuXHRcdFx0Z2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgZ2VvbWV0cnlJbmZvLmluZGV4LCBnbC5TVEFUSUNfRFJBVyk7XG5cdFx0XHR2ZXJ0ZXhDb3VudCA9IGdlb21ldHJ5SW5mby5pbmRleC5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0Ly8gcmVzdG9yZSBudWxsIHZhb1xuXHRcdGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRzaGFkZXI6IHRoaXMsXG5cdFx0XHR2YW8sXG5cdFx0XHRnZW9tZXRyeUJ1ZmZlcjogZ2xHZW9tZXRyeUJ1ZmZlcixcblx0XHRcdG5vcm1hbEJ1ZmZlcjogZ2xOb3JtYWxCdWZmZXIsXG5cdFx0XHRpbnN0YW5jZUJ1ZmZlcjogZ2xJbnN0YW5jZWRNb2RlbE1hdHJpeEJ1ZmZlcixcblx0XHRcdGluc3RhbmNlQ291bnQ6IGluc3RhbmNlQ291bnQsXG5cdFx0XHRpbmRleEJ1ZmZlcjogZ2xCdWZmZXJJbmRleCxcblx0XHRcdHZlcnRleENvdW50LFxuXHRcdFx0dXZCdWZmZXI6IG51bGwsXG5cdFx0XHRyZW5kZXJNb2RlOiBtYXRlcmlhbC5yZW5kZXJNb2RlID8/IHRoaXMuX2dsLlRSSUFOR0xFUyxcblx0XHR9O1xuXHR9XG59IiwiaW1wb3J0IFNoYWRlciwge1NoYWRlclZBT0luZm8sIFZBT0dlb21ldHJ5SW5mb30gZnJvbSBcIi4vU2hhZGVyXCI7XG5pbXBvcnQgTWF0cml4NCBmcm9tIFwiLi4vLi4vbWF0aC9NYXRyaXg0XCI7XG5pbXBvcnQgRW5naW5lIGZyb20gXCIuLi9FbmdpbmVcIjtcbmltcG9ydCBNYXRlcmlhbCBmcm9tIFwiLi4vTWF0ZXJpYWxcIjtcbmltcG9ydCBSZW5kZXJDb21wb25lbnQgZnJvbSBcIi4uL1JlbmRlckNvbXBvbmVudFwiO1xuXG4vKipcbiAqIGp1c3QgZHJhdyBnZW9tZXRyeSBpbiBhIHBsYWluIHBpbmsgY29sb3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVsbFNoYWRlciBleHRlbmRzIFNoYWRlciB7XG5cblx0Y29uc3RydWN0b3IoZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQpIHtcblx0XHRzdXBlcih7XG5cdFx0XHRnbCxcblx0XHRcdHZlcnRleCA6IGAjdmVyc2lvbiAzMDAgZXNcblx0XHRcdFx0XG5cdFx0XHRcdHByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xuXG5cdFx0XHRcdGxheW91dChsb2NhdGlvbiA9IDApIGluIHZlYzMgYVBvc2l0aW9uO1xuXHRcdFx0XHRcblx0XHRcdFx0dW5pZm9ybSBtYXQ0IHVQcm9qZWN0aW9uO1xuXHRcdFx0XHR1bmlmb3JtIG1hdDQgdU1vZGVsVmlldztcblx0XHRcdFx0dW5pZm9ybSBtYXQ0IHVNb2RlbFRyYW5zZm9ybTtcblxuXHRcdFx0XHR2b2lkIG1haW4oKSB7XG5cdFx0XHRcdFx0Z2xfUG9zaXRpb24gPSB1UHJvamVjdGlvbiAqIHVNb2RlbFZpZXcgKiB1TW9kZWxUcmFuc2Zvcm0gKiB2ZWM0KGFQb3NpdGlvbiwgMS4wKTtcblx0XHRcdFx0XHRnbF9Qb2ludFNpemUgPSA1LjA7XG5cdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHRgLFxuXHRcdFx0ZnJhZ21lbnQ6IGAjdmVyc2lvbiAzMDAgZXNcblx0XHRcdFx0XG5cdFx0XHRcdHByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OyBcblx0XHRcdFx0XG5cdFx0XHRcdHVuaWZvcm0gdmVjNCB1Q29sb3I7XG5cdFx0XHRcdFxuXHRcdFx0XHRvdXQgdmVjNCBjb2xvcjtcblxuXHRcdFx0XHR2b2lkIG1haW4oKSB7XG5cdFx0XHRcdFx0Y29sb3IgPSB1Q29sb3I7XG5cdFx0XHRcdH1cblx0XHRcdGAsXG5cdFx0XHRhdHRyaWJ1dGVzIDogW1wiYVBvc2l0aW9uXCJdLFxuXHRcdFx0dW5pZm9ybXM6IFtcInVQcm9qZWN0aW9uXCIsIFwidU1vZGVsVmlld1wiLCBcInVNb2RlbFRyYW5zZm9ybVwiLCBcInVDb2xvclwiXVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5zZXRNYXRyaXg0ZnYoXCJ1UHJvamVjdGlvblwiLCBmYWxzZSwgTWF0cml4NC5jcmVhdGUoKSk7XG5cdFx0dGhpcy5zZXRNYXRyaXg0ZnYoXCJ1TW9kZWxWaWV3XCIsIGZhbHNlLCBNYXRyaXg0LmNyZWF0ZSgpKTtcblx0fVxuXG5cdHJlbmRlcihlOiBFbmdpbmUsIGluZm86IFNoYWRlclZBT0luZm8sIHJjOiBSZW5kZXJDb21wb25lbnQpIHtcblx0XHRjb25zdCBnbCA9IGUuZ2w7XG5cblx0XHR0aGlzLnVzZSgpO1xuXHRcdHRoaXMuc2V0TWF0cml4NGZ2KFwidVByb2plY3Rpb25cIiwgZmFsc2UsIGUucHJvamVjdGlvbk1hdHJpeCgpKTtcblx0XHR0aGlzLnNldE1hdHJpeDRmdihcInVNb2RlbFZpZXdcIiwgZmFsc2UsIGUuY2FtZXJhTWF0cml4KCkpO1xuXHRcdHRoaXMuc2V0TWF0cml4NGZ2KFwidU1vZGVsVHJhbnNmb3JtXCIsIGZhbHNlLCByYy5nZXRNYXRyaXgoKSk7XG5cdFx0dGhpcy5zZXQ0RlYoXCJ1Q29sb3JcIiwgcmMuZ2V0TWF0ZXJpYWwoKS5kZWZpbml0aW9uLmNvbG9yKTtcblxuXHRcdGdsLmJpbmRWZXJ0ZXhBcnJheShpbmZvLnZhbyk7XG5cblx0XHRpZiAoaW5mby5pbmRleEJ1ZmZlciAhPT0gbnVsbCkge1xuXHRcdFx0Z2wuZHJhd0VsZW1lbnRzKGluZm8ucmVuZGVyTW9kZSwgaW5mby52ZXJ0ZXhDb3VudCwgZ2wuVU5TSUdORURfU0hPUlQsIDApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRnbC5kcmF3QXJyYXlzKGluZm8ucmVuZGVyTW9kZSwgMCwgaW5mby52ZXJ0ZXhDb3VudCk7XG5cdFx0fVxuXG5cdFx0Z2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xuXHRcdHRoaXMubm90VXNlKCk7XG5cdH1cblxuXHRjcmVhdGVWQU8oZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQsIGdlb21ldHJ5SW5mbzogVkFPR2VvbWV0cnlJbmZvLCBtYXRlcmlhbDogTWF0ZXJpYWwpOiBTaGFkZXJWQU9JbmZvIHtcblx0XHRjb25zdCB2YW8gPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xuXHRcdGdsLmJpbmRWZXJ0ZXhBcnJheSh2YW8pO1xuXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IDE7IGkrKykge1xuXHRcdFx0Z2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoaSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaW5zdGFuY2VDb3VudCA9IGdlb21ldHJ5SW5mby5pbnN0YW5jZUNvdW50IHx8IDE7XG5cblx0XHRjb25zdCBnbEdlb21ldHJ5QnVmZmVyID0gU2hhZGVyLmNyZWF0ZUF0dHJpYnV0ZUluZm8oZ2wsIDAsIGdlb21ldHJ5SW5mby52ZXJ0ZXgsIDEyLCAwKTtcblx0XHRsZXQgZ2xCdWZmZXJJbmRleDogV2ViR0xCdWZmZXIgPSBudWxsO1xuXHRcdGxldCB2ZXJ0ZXhDb3VudCA9IChnZW9tZXRyeUluZm8udmVydGV4Lmxlbmd0aC8zKXwwO1xuXHRcdGlmIChnZW9tZXRyeUluZm8uaW5kZXgpIHtcblx0XHRcdGdsQnVmZmVySW5kZXggPSBnbC5jcmVhdGVCdWZmZXIoKTtcblx0XHRcdGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGdsQnVmZmVySW5kZXgpO1xuXHRcdFx0Z2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgZ2VvbWV0cnlJbmZvLmluZGV4LCBnbC5TVEFUSUNfRFJBVyk7XG5cdFx0XHR2ZXJ0ZXhDb3VudCA9IGdlb21ldHJ5SW5mby5pbmRleC5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0Z2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHNoYWRlcjogdGhpcyxcblx0XHRcdHZhbyxcblx0XHRcdGluc3RhbmNlQ291bnQsXG5cdFx0XHR2ZXJ0ZXhDb3VudCxcblx0XHRcdGdlb21ldHJ5QnVmZmVyOiBnbEdlb21ldHJ5QnVmZmVyLFxuXHRcdFx0bm9ybWFsQnVmZmVyOiBudWxsLFxuXHRcdFx0aW5zdGFuY2VCdWZmZXI6IG51bGwsXG5cdFx0XHRpbmRleEJ1ZmZlcjogZ2xCdWZmZXJJbmRleCxcblx0XHRcdHV2QnVmZmVyOiBudWxsLFxuXHRcdFx0cmVuZGVyTW9kZTogbWF0ZXJpYWwucmVuZGVyTW9kZSA/PyB0aGlzLl9nbC5UUklBTkdMRVMsXG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IEVuZ2luZSBmcm9tIFwiLi4vRW5naW5lXCI7XG5pbXBvcnQgTWF0ZXJpYWwgZnJvbSBcIi4uL01hdGVyaWFsXCI7XG5pbXBvcnQgUmVuZGVyQ29tcG9uZW50IGZyb20gXCIuLi9SZW5kZXJDb21wb25lbnRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTaGFkZXJJbml0aWFsaXplciB7XG5cdGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0O1xuXHRjb21tb24/OiBzdHJpbmcsXG4gICAgdmVydGV4OiBzdHJpbmd8c3RyaW5nW10sXG4gICAgZnJhZ21lbnQ6IHN0cmluZ3xzdHJpbmdbXSxcbiAgICB1bmlmb3Jtczogc3RyaW5nW10sXG4gICAgYXR0cmlidXRlczogc3RyaW5nW10sXG4gICAgZGVmaW5lcz86IHtba2V5OnN0cmluZ106c3RyaW5nfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNoYWRlclZBT0luZm8ge1xuXHRzaGFkZXI6IFNoYWRlcjtcblx0dmFvOiBXZWJHTFZlcnRleEFycmF5T2JqZWN0O1xuXHRnZW9tZXRyeUJ1ZmZlcjogV2ViR0xCdWZmZXI7XG5cdHV2QnVmZmVyOiBXZWJHTEJ1ZmZlcjtcblx0bm9ybWFsQnVmZmVyOiBXZWJHTEJ1ZmZlcjtcblx0aW5kZXhCdWZmZXI6IFdlYkdMQnVmZmVyO1xuXHRpbnN0YW5jZUJ1ZmZlcjogTW9kZWxNYXRyaXhJbnN0YW5jaW5nSW5mbztcblx0dmVydGV4Q291bnQ6IG51bWJlcjtcblx0aW5zdGFuY2VDb3VudDogbnVtYmVyO1xuXHRiYWNrRmFjZURpc2FibGVkPzogYm9vbGVhbjtcblx0cmVuZGVyTW9kZTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZBT0dlb21ldHJ5SW5mbyB7XG5cdHZlcnRleDogRmxvYXQzMkFycmF5O1xuXHR1dj86IEZsb2F0MzJBcnJheTtcblx0bm9ybWFsPzogRmxvYXQzMkFycmF5O1xuXHRpbmRleD86IFVpbnQxNkFycmF5O1xuXHRpbnN0YW5jZUNvdW50PzogbnVtYmVyO1xuXHRjdWxsRGlzYWJsZWQ/OiBib29sZWFuO1xufVxuXG4vLyBtYWtlIGluc3RhbmNpbmcgYmF0Y2hlcyB0YWtpbmcgYXQgbW9zdCBNQVhfQlVGRkVSX0lOU1RBTkNFIGJ5dGVzLlxuY29uc3QgQllURVNfUEVSX0lOU1RBTkNFID0gMTYqNDtcbmNvbnN0IE1BWF9CVUZGRVJfSU5TVEFOQ0UgPSA2NTUzNjtcblxuZXhwb3J0IGNsYXNzIE1vZGVsTWF0cml4SW5zdGFuY2luZ0luZm8ge1xuXHRyZWFkb25seSBidWZmZXI6IFdlYkdMQnVmZmVyO1xuXHRyZWFkb25seSBhdHRyaWJ1dGVJbmRleDogbnVtYmVyO1xuXHRyZWFkb25seSBpc0luZGV4ZWQ6IGJvb2xlYW47XG5cdHJlYWRvbmx5IGluc3RhbmNlQ291bnQ6IG51bWJlcjtcblxuXHRjb25zdHJ1Y3RvcihnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dCwgYWlkOiBudW1iZXIsIGluc3RhbmNlQ291bnQ6IG51bWJlciwgaW5kZXhlZDogYm9vbGVhbikge1xuXHRcdHRoaXMuYXR0cmlidXRlSW5kZXggPSBhaWQ7XG5cblx0XHR0aGlzLmlzSW5kZXhlZCA9IGluZGV4ZWQ7XG5cdFx0dGhpcy5idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcblx0XHRnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5idWZmZXIpO1xuXHRcdGNvbnN0IGZidWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KGluc3RhbmNlQ291bnQqMTYpO1xuXHRcdGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBmYnVmZmVyLCBnbC5EWU5BTUlDX0RSQVcpO1xuXG5cdFx0dGhpcy5pbnN0YW5jZUNvdW50ID0gaW5zdGFuY2VDb3VudDtcblx0fVxuXG5cdGRpc3Bvc2UoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xuXHRcdGdsLmRlbGV0ZUJ1ZmZlcih0aGlzLmJ1ZmZlcik7XG5cdH1cblxuXHRkcmF3KGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LCB2ZXJ0ZXhDb3VudDogbnVtYmVyLCBpbnN0YW5jZUNvdW50OiBudW1iZXIpIHtcblxuXHRcdGluc3RhbmNlQ291bnQgPSBNYXRoLm1pbihpbnN0YW5jZUNvdW50LCB0aGlzLmluc3RhbmNlQ291bnQpO1xuXG5cdFx0Ly8gYmF0Y2ggaW5zdGFuY2VzIGluZm8uXG5cdFx0Ly8gYW55IG1vYmlsZSBncHUgd291bGQgcHJvYmFibHkgbGltaXQgdGhlIGJ1ZmZlciB0byAxNmtcblx0XHQvLyBhbnkgZGVza3RvcCB3aWxsIGJlIG9rIHdpdGggNjVrIGluc3RhbmNlcy5cblx0XHRjb25zdCBiYXRjaGVzID0gTWF0aC5tYXgoMSwoKGluc3RhbmNlQ291bnQgKiBCWVRFU19QRVJfSU5TVEFOQ0UpIC8gTUFYX0JVRkZFUl9JTlNUQU5DRSkgfCAwKTtcblx0XHRjb25zdCBtYXhJbnN0YW5jZXNQZXJCYXRjaCA9IGJhdGNoZXMgPT09IDAgPyBpbnN0YW5jZUNvdW50IDogTUFYX0JVRkZFUl9JTlNUQU5DRSAvIEJZVEVTX1BFUl9JTlNUQU5DRTtcblxuXHRcdGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmJ1ZmZlcik7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0XHRcdGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuYXR0cmlidXRlSW5kZXggKyBpKTtcblx0XHRcdGdsLnZlcnRleEF0dHJpYkRpdmlzb3IodGhpcy5hdHRyaWJ1dGVJbmRleCArIGksIDEpO1xuXHRcdH1cblxuXHRcdGZvcihsZXQgaiA9IDA7IGogPCBiYXRjaGVzOyBqKysgKSB7XG5cblx0XHRcdGNvbnN0IGNvdW50ID0gaiA8IGJhdGNoZXMtMSA/XG5cdFx0XHRcdG1heEluc3RhbmNlc1BlckJhdGNoIDpcblx0XHRcdFx0aW5zdGFuY2VDb3VudCAtIChiYXRjaGVzLTEpKm1heEluc3RhbmNlc1BlckJhdGNoO1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHRcdFx0XHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuYXR0cmlidXRlSW5kZXggKyBpLCA0LFxuXHRcdFx0XHRcdGdsLkZMT0FULCBmYWxzZSxcblx0XHRcdFx0XHQ2NCwgaSAqIDE2ICsgaipNQVhfQlVGRkVSX0lOU1RBTkNFICk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLmlzSW5kZXhlZCkge1xuXHRcdFx0XHRnbC5kcmF3RWxlbWVudHNJbnN0YW5jZWQoZ2wuVFJJQU5HTEVTLCB2ZXJ0ZXhDb3VudCwgZ2wuVU5TSUdORURfU0hPUlQsIDAsIGNvdW50KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGdsLmRyYXdBcnJheXNJbnN0YW5jZWQoZ2wuVFJJQU5HTEVTLCAwLCB2ZXJ0ZXhDb3VudCwgY291bnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbCk7XG5cdH1cblxuXHR1cGRhdGVXaXRoKGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LCBsb2NhbHM6IEZsb2F0MzJBcnJheSkge1xuXHRcdGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmJ1ZmZlcik7XG5cdFx0Z2wuYnVmZmVyU3ViRGF0YShnbC5BUlJBWV9CVUZGRVIsIDAsIGxvY2FscywgMCwgTWF0aC5taW4odGhpcy5pbnN0YW5jZUNvdW50KjE2LCBsb2NhbHMubGVuZ3RoKSk7XG5cdH1cbn1cblxuLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBTaGFkZXIge1xuXG5cdHByb3RlY3RlZCByZWFkb25seSBfZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ7XG5cblx0cHJvdGVjdGVkIF91bmlmb3JtczogeyBba2V5OiBzdHJpbmddOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB9ID0ge307XG5cblx0cHJvdGVjdGVkIF9hdHRyaWJ1dGVzOiB7IFtrZXk6IHN0cmluZ106IEdMaW50IH0gPSB7fTtcblxuXHRwcm90ZWN0ZWQgX3NoYWRlclByb2dyYW06IFdlYkdMUHJvZ3JhbSA9IG51bGw7XG5cblx0cHJvdGVjdGVkIGNvbnN0cnVjdG9yKGluaXQ6IFNoYWRlckluaXRpYWxpemVyKSB7XG5cdFx0dGhpcy5fZ2wgPSBpbml0LmdsO1xuXHRcdHRoaXMuX19pbml0KGluaXQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0U2hhZGVyKGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LCB0eXBlOiBudW1iZXIsIHNoYWRlcl90ZXh0OiBzdHJpbmcpOiBXZWJHTFByb2dyYW0ge1xuXG5cdFx0bGV0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcblxuXHRcdGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNoYWRlcl90ZXh0KTtcblx0XHRnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG5cdFx0Y29uc3QgcmVzID0gZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpO1xuXHRcdGlmIChyZXMgIT09IG51bGwgJiYgcmVzICE9PSBcIlwiKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGBTaGFkZXIgaW5mbyBsb2c6ICcke3Jlc30nIGZvciBzaGFkZXI6ICR7c2hhZGVyX3RleHR9YCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNoYWRlcjtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFNoYWRlckRlZihkZWY6IHN0cmluZyB8IHN0cmluZ1tdLCBkZWZpbmVzPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSwgY29tbW9uPzogc3RyaW5nKTogc3RyaW5nIHtcblxuXHRcdGxldCByZXQgPSBcIlwiO1xuXG5cdFx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkZWYpID09PSBcIltvYmplY3QgQXJyYXldXCIpIHtcblx0XHRcdHJldCA9IChkZWYgYXMgc3RyaW5nW10pLmpvaW4oJ1xcbicpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXQgPSBkZWYgYXMgc3RyaW5nO1xuXHRcdH1cblxuXHRcdGxldCBzZGVmaW5lczogc3RyaW5nW10gPSBbXTtcblx0XHRpZiAoZGVmaW5lcyAhPT0gdm9pZCAwKSB7XG5cdFx0XHRPYmplY3Qua2V5cyhkZWZpbmVzKS5mb3JFYWNoKGQgPT4ge1xuXHRcdFx0XHRzZGVmaW5lcy5wdXNoKGAjZGVmaW5lICR7ZH0gJHtkZWZpbmVzW2RdfWApO1xuXHRcdFx0fSlcblx0XHR9XG5cblx0XHRjb25zdCBsaW5lcyA9IHJldC5zcGxpdCgnXFxuJyk7XG5cdFx0aWYgKGxpbmVzWzBdLnN0YXJ0c1dpdGgoXCIjdmVyc2lvblwiKSkge1xuXHRcdFx0bGluZXMuc3BsaWNlKDEsIDAsIC4uLnNkZWZpbmVzKTtcblx0XHR9XG5cblx0XHRpZiAoY29tbW9uIT09dW5kZWZpbmVkKSB7XG5cdFx0XHRjb21tb24gPSBgJHtjb21tb259XFxuYDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29tbW9uID0gJyc7XG5cdFx0fVxuXHRcdHJldHVybiBgJHtjb21tb259JHtsaW5lcy5qb2luKCdcXG4nKX1gO1xuXHR9XG5cblx0cHJpdmF0ZSBfX2luaXQoc2hhZGVyRGVmOiBTaGFkZXJJbml0aWFsaXplcikge1xuXG5cdFx0Y29uc3QgZ2wgPSB0aGlzLl9nbDtcblxuXHRcdHRoaXMuX3NoYWRlclByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG5cdFx0Z2wuYXR0YWNoU2hhZGVyKFxuXHRcdFx0dGhpcy5fc2hhZGVyUHJvZ3JhbSxcblx0XHRcdFNoYWRlci5nZXRTaGFkZXIoZ2wsIGdsLlZFUlRFWF9TSEFERVIsIFNoYWRlci5nZXRTaGFkZXJEZWYoc2hhZGVyRGVmLnZlcnRleCwgc2hhZGVyRGVmLmRlZmluZXMsIHNoYWRlckRlZi5jb21tb24pKVxuXHRcdCk7XG5cblx0XHRnbC5hdHRhY2hTaGFkZXIoXG5cdFx0XHR0aGlzLl9zaGFkZXJQcm9ncmFtLFxuXHRcdFx0U2hhZGVyLmdldFNoYWRlcihnbCwgZ2wuRlJBR01FTlRfU0hBREVSLCBTaGFkZXIuZ2V0U2hhZGVyRGVmKHNoYWRlckRlZi5mcmFnbWVudCwgc2hhZGVyRGVmLmRlZmluZXMsIHNoYWRlckRlZi5jb21tb24pKVxuXHRcdCk7XG5cblx0XHRnbC5saW5rUHJvZ3JhbSh0aGlzLl9zaGFkZXJQcm9ncmFtKTtcblx0XHRnbC51c2VQcm9ncmFtKHRoaXMuX3NoYWRlclByb2dyYW0pO1xuXG5cdFx0dGhpcy5pbml0aWFsaXplVW5pZm9ybXMoc2hhZGVyRGVmLnVuaWZvcm1zLCBnbCk7XG5cdFx0dGhpcy5pbml0aWFsaXplQXR0cmlidXRlcyhzaGFkZXJEZWYuYXR0cmlidXRlcywgZ2wpO1xuXHR9XG5cblx0cHJpdmF0ZSBpbml0aWFsaXplQXR0cmlidXRlcyhhdHRyaWJ1dGVzOiBzdHJpbmdbXSwgZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQpIHtcblx0XHRhdHRyaWJ1dGVzLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRjb25zdCBhdHRyaWQgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLl9zaGFkZXJQcm9ncmFtLCBhdHRyKTtcblx0XHRcdGlmIChhdHRyaWQgIT09IC0xKSB7XG5cdFx0XHRcdHRoaXMuX2F0dHJpYnV0ZXNbYXR0cl0gPSBhdHRyaWQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGBBdHRyaWJ1dGUgJHthdHRyfSB1bmtub3duIGluIHByb2dyYW0uYCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIGluaXRpYWxpemVVbmlmb3Jtcyh1bmlmb3Jtczogc3RyaW5nW10sIGdsKSB7XG5cdFx0dW5pZm9ybXMuZm9yRWFjaCh1bmlmb3JtID0+IHtcblx0XHRcdGNvbnN0IGxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuX3NoYWRlclByb2dyYW0sIHVuaWZvcm0pO1xuXHRcdFx0aWYgKGxvY2F0aW9uID09PSBudWxsKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoYFVuaWZvcm0gJHt1bmlmb3JtfSBub3QgZm91bmQgaW4gcHJvZ3JhbS5gKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX3VuaWZvcm1zW3VuaWZvcm1dID0gbG9jYXRpb247XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHR1c2UoKSB7XG5cdFx0dGhpcy5fZ2wudXNlUHJvZ3JhbSh0aGlzLl9zaGFkZXJQcm9ncmFtKTtcblx0XHRPYmplY3Qua2V5cyh0aGlzLl9hdHRyaWJ1dGVzKS5mb3JFYWNoKGsgPT5cblx0XHRcdHRoaXMuX2dsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuX2F0dHJpYnV0ZXNba10pKTtcblx0fVxuXG5cdG5vdFVzZSgpIHtcblx0XHR0aGlzLl9nbC51c2VQcm9ncmFtKG51bGwpO1xuXHRcdE9iamVjdC5rZXlzKHRoaXMuX2F0dHJpYnV0ZXMpLmZvckVhY2goayA9PlxuXHRcdFx0dGhpcy5fZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuX2F0dHJpYnV0ZXNba10pKTtcblx0fVxuXG5cdHNldDFGKG5hbWU6IHN0cmluZywgdjogbnVtYmVyKSB7XG5cdFx0dGhpcy5fZ2wudW5pZm9ybTFmKHRoaXMuX3VuaWZvcm1zW25hbWVdLCB2KTtcblx0fVxuXG5cdHNldDJGKG5hbWU6IHN0cmluZywgdjA6IG51bWJlciwgdjE6IG51bWJlcikge1xuXHRcdHRoaXMuX2dsLnVuaWZvcm0yZih0aGlzLl91bmlmb3Jtc1tuYW1lXSwgdjAsIHYxKTtcblx0fVxuXG5cdHNldDNGKG5hbWU6IHN0cmluZywgdjA6IG51bWJlciwgdjE6IG51bWJlciwgdjI6IG51bWJlcikge1xuXHRcdHRoaXMuX2dsLnVuaWZvcm0zZih0aGlzLl91bmlmb3Jtc1tuYW1lXSwgdjAsIHYxLCB2Mik7XG5cdH1cblxuXHRzZXQzRlYobmFtZTogc3RyaW5nLCBiOiBGbG9hdDMyQXJyYXkpIHtcblx0XHR0aGlzLl9nbC51bmlmb3JtM2Z2KHRoaXMuX3VuaWZvcm1zW25hbWVdLCBiKTtcblx0fVxuXG5cdHNldDRGVihuYW1lOiBzdHJpbmcsIGI6IEZsb2F0MzJBcnJheSkge1xuXHRcdHRoaXMuX2dsLnVuaWZvcm00ZnYodGhpcy5fdW5pZm9ybXNbbmFtZV0sIGIpO1xuXHR9XG5cblx0c2V0NEYobmFtZTogc3RyaW5nLCB2MDogbnVtYmVyLCB2MTogbnVtYmVyLCB2MjogbnVtYmVyLCB2MzogbnVtYmVyKSB7XG5cdFx0dGhpcy5fZ2wudW5pZm9ybTRmKHRoaXMuX3VuaWZvcm1zW25hbWVdLCB2MCwgdjEsIHYyLCB2Myk7XG5cdH1cblxuXHRzZXQxSShuYW1lOiBzdHJpbmcsIHY6IG51bWJlcikge1xuXHRcdHRoaXMuX2dsLnVuaWZvcm0xaSh0aGlzLl91bmlmb3Jtc1tuYW1lXSwgdik7XG5cdH1cblxuXHRzZXQySShuYW1lOiBzdHJpbmcsIHYwOiBudW1iZXIsIHYxOiBudW1iZXIpIHtcblx0XHR0aGlzLl9nbC51bmlmb3JtMmkodGhpcy5fdW5pZm9ybXNbbmFtZV0sIHYwLCB2MSk7XG5cdH1cblxuXHRzZXQzSShuYW1lOiBzdHJpbmcsIHYwOiBudW1iZXIsIHYxOiBudW1iZXIsIHYyOiBudW1iZXIpIHtcblx0XHR0aGlzLl9nbC51bmlmb3JtM2kodGhpcy5fdW5pZm9ybXNbbmFtZV0sIHYwLCB2MSwgdjIpO1xuXHR9XG5cblx0c2V0TWF0cml4NGZ2KG5hbWU6IHN0cmluZywgdHJhbnNwb3NlOiBib29sZWFuLCBtYXRyaXg6IEZsb2F0MzJBcnJheSwgc3JjT2Zmc2V0PzogbnVtYmVyLCBzcmNMZW5ndGg/OiBudW1iZXIpIHtcblx0XHR0aGlzLl9nbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMuX3VuaWZvcm1zW25hbWVdLCB0cmFuc3Bvc2UsIG1hdHJpeCwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpO1xuXHR9XG5cblx0YWJzdHJhY3QgcmVuZGVyKGU6IEVuZ2luZSwgaW5mbzogU2hhZGVyVkFPSW5mbywgcmM6IFJlbmRlckNvbXBvbmVudCk7XG5cblx0cHJvdGVjdGVkIHN0YXRpYyBjcmVhdGVJbnN0YW5jZWRNb2RlbE1hdHJpeChnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dCwgaW5zdGFuY2VDb3VudDogbnVtYmVyLCBhdHRyaWJ1dGVJZDogbnVtYmVyLCBpbmRleGVkOiBib29sZWFuKTogTW9kZWxNYXRyaXhJbnN0YW5jaW5nSW5mbyB7XG5cblx0XHRyZXR1cm4gbmV3IE1vZGVsTWF0cml4SW5zdGFuY2luZ0luZm8oZ2wsIGF0dHJpYnV0ZUlkLCBpbnN0YW5jZUNvdW50LCBpbmRleGVkKTtcblx0fVxuXG5cdHByb3RlY3RlZCBzdGF0aWMgY3JlYXRlQXR0cmlidXRlSW5mbyhnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dCwgYXR0cmlidXRlSWQ6IG51bWJlciwgZGF0YTogRmxvYXQzMkFycmF5LCBzdHJpZGU6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpOiBXZWJHTEJ1ZmZlciB7XG5cdFx0Y29uc3QgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG5cdFx0Z2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XG5cdFx0Z2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIGRhdGEsIGdsLlNUQVRJQ19EUkFXKTtcblx0XHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dHJpYnV0ZUlkLCBzdHJpZGUgLyA0LCBnbC5GTE9BVCwgZmFsc2UsIHN0cmlkZSwgb2Zmc2V0KTtcblx0XHRnbC52ZXJ0ZXhBdHRyaWJEaXZpc29yKGF0dHJpYnV0ZUlkLCAwKTtcblxuXHRcdHJldHVybiBidWZmZXI7XG5cdH1cblxuXHRhYnN0cmFjdCBjcmVhdGVWQU8oZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQsIGdlb21WQU86IFZBT0dlb21ldHJ5SW5mbywgbWF0ZXJpYWw6IE1hdGVyaWFsKTogU2hhZGVyVkFPSW5mbztcbn0iLCJpbXBvcnQgU2hhZGVyLCB7U2hhZGVyVkFPSW5mbywgVkFPR2VvbWV0cnlJbmZvfSBmcm9tIFwiLi9TaGFkZXJcIjtcbmltcG9ydCBFbmdpbmUgZnJvbSBcIi4uL0VuZ2luZVwiO1xuaW1wb3J0IE1hdGVyaWFsIGZyb20gXCIuLi9NYXRlcmlhbFwiO1xuaW1wb3J0IFJlbmRlckNvbXBvbmVudCBmcm9tIFwiLi4vUmVuZGVyQ29tcG9uZW50XCI7XG5cbi8qKlxuICogU2t5Ym94IHNoYWRlciB3aGljaCBkcmF3cyBhIGN1YmVtYXAgb250byBhIGN1YmUuXG4gKiBUaGUgY3ViZSBrZWVwcyBhbHdheXMgb24gdGhlIHNhbWUgcG9zaXRpb24sIHJlZ2FyZGxlc3MgdGhlIGNhbWVyYSBwb3NpdGlvbi4gSGVuY2UsIHdlIGdldCBmcm9tIHRoZSBjYW1lcmEgbWF0cml4IGp1c3RcbiAqIGluZm9ybWF0aW9uIHJlZ2FyZGluZyB0cmFuc2Zvcm1hdGlvbiwgYW5kIG5vdCB0cmFuc2xhdGlvbi5cbiAqXG4gKiBUaGlzIHNoYWRlciBpcyBleHBlY3RlZCB0byBydW4gdGhlIGxhc3QgdGhpbmcgb24gdGhlIHJlbmRlcmVyLiBUaGlzIHdpbGwgc3BlZWQgdGhpbmdzIHVwIGEgbG9nLCBzaW5jZSBubyBleHRyYSBwaXhlbFxuICogb3ZlcmRyYXcgd2lsbCBiZSBwZXJmb3JtZWQuXG4gKiBUbyBkbyBzbywgd2UgdHJpY2sgZ2xfUG9zaXRpb24gYW5kIGR1cGxpY2F0ZSBwb3NpdGlvbi53IG9udG8gcG9zaXRpb24uei4gVGh1cyB0aGUgcHJvamVjdGlvbiBwaGFzZSB3aWxsIGp1c3QgbWFrZSB6ID0gMS5cbiAqIFdlIHRodXMgdHJpY2sgdGhlIGRlcHRoIGJ1ZmZlciB0byB0aGluayB0aGUgY3ViZSBpcyB6PTEsIG1heGltdW0gZGVwdGguIFRoaXMgd2lsbCBtYWtlIHRoZSBkZXB0aCB0ZXN0IGZhaWwgc2hvdWxkIGFueVxuICogb3RoZXIgb2JqZWN0IGhhcyBiZWVuIHdyaXR0ZW4gdG8gdGhlIHNhbWUgcGl4ZWwuXG4gKiBTbyB0aGUgc2t5Ym94IHdpbGwgb25seSByZW5kZXIgb24gcGl4ZWxzIHdoZXJlIHRoZXJlJ3Mgbm8gcHJldmlvdXMgb2JqZWN0LiBJdCB3aWxsIGFsc28gZmlsbCBkZXB0aCB0byBtYXhpbXVtIHZhbHVlIG9mIDEuXG4gKlxuICogV2UgYWxzbyBuZWVkIHRvIGNoYW5nZSB0aGUgZGVwdGggZnVuY3Rpb24gdG8gR0xfTEVRVUFMIGZyb20gR0xfRVFVQUwuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNreWJveFNoYWRlciBleHRlbmRzIFNoYWRlciB7XG5cblx0Y29uc3RydWN0b3IoZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQpIHtcblx0XHRzdXBlcih7XG5cdFx0XHRnbCxcblx0XHRcdHZlcnRleDogYCN2ZXJzaW9uIDMwMCBlc1xuXHRcdFx0XG5cdFx0XHRcdHByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xuXHRcdFx0XHRcblx0XHRcdFx0bGF5b3V0IChsb2NhdGlvbiA9IDApIGluIHZlYzMgYVBvc2l0aW9uO1xuXHRcdFx0XHRcblx0XHRcdFx0b3V0IHZlYzMgdlRleENvb3Jkcztcblx0XHRcdFx0XG5cdFx0XHRcdHVuaWZvcm0gbWF0NCB1UHJvamVjdGlvbjtcblx0XHRcdFx0dW5pZm9ybSBtYXQ0IHVWaWV3O1xuXHRcdFx0XHRcblx0XHRcdFx0dm9pZCBtYWluKCkge1xuXHRcdFx0XHRcdHZUZXhDb29yZHMgPSBhUG9zaXRpb247XG5cdFx0XHRcdFx0dmVjNCBwb3MgPSB1UHJvamVjdGlvbiAqIHVWaWV3ICogdmVjNChhUG9zaXRpb24sIDEuMCk7XG5cdFx0XHRcdFx0Z2xfUG9zaXRpb24gPSBwb3MueHl3dztcblx0XHRcdFx0fVxuXHRcdFx0YCxcblx0XHRcdGZyYWdtZW50OiBgI3ZlcnNpb24gMzAwIGVzXG5cdFx0XHRcblx0XHRcdFx0cHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG5cdFx0XHRcdFxuXHRcdFx0XHRpbiB2ZWMzIHZUZXhDb29yZHM7XG5cdFx0XHRcdG91dCB2ZWM0IGNvbG9yO1xuXHRcdFx0XHRcblx0XHRcdFx0dW5pZm9ybSBzYW1wbGVyQ3ViZSB1U2FtcGxlcjtcblx0XHRcdFx0XG5cdFx0XHRcdHZvaWQgbWFpbigpIHtcblx0XHRcdFx0XHRjb2xvciA9IHRleHR1cmUodVNhbXBsZXIsIHZUZXhDb29yZHMpO1xuXHRcdFx0XHR9XG5cdFx0XHRgLFxuXHRcdFx0dW5pZm9ybXM6IFsndVByb2plY3Rpb24nLCAndVZpZXcnLCAndVNhbXBsZXInXSxcblx0XHRcdGF0dHJpYnV0ZXM6IFsnYVBvc2l0aW9uJ11cblx0XHR9KVxuXHR9XG5cblx0Y3JlYXRlVkFPKGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LCBnZW9tZXRyeUluZm86IFZBT0dlb21ldHJ5SW5mbywgbWF0ZXJpYWw6IE1hdGVyaWFsKSA6IFNoYWRlclZBT0luZm8ge1xuXG5cdFx0Y29uc3QgdmFvID0gZ2wuY3JlYXRlVmVydGV4QXJyYXkoKTtcblx0XHRnbC5iaW5kVmVydGV4QXJyYXkodmFvKTtcblxuXG5cdFx0Y29uc3QgZ2xHZW9tZXRyeUJ1ZmZlciA9IFNoYWRlci5jcmVhdGVBdHRyaWJ1dGVJbmZvKGdsLCAwLCBnZW9tZXRyeUluZm8udmVydGV4LCAxMiwgMCk7XG5cblx0XHRsZXQgZ2xCdWZmZXJJbmRleCA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuXHRcdGxldCB2ZXJ0ZXhDb3VudCA9IGdlb21ldHJ5SW5mby5pbmRleC5sZW5ndGg7XG5cdFx0Z2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgZ2xCdWZmZXJJbmRleCk7XG5cdFx0Z2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgZ2VvbWV0cnlJbmZvLmluZGV4LCBnbC5TVEFUSUNfRFJBVyk7XG5cblx0XHRnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSgwKTtcblx0XHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKDAsIDMsIGdsLkZMT0FULCBmYWxzZSwgMTIsIDApO1xuXHRcdGdsLnZlcnRleEF0dHJpYkRpdmlzb3IoMCwgMCk7XG5cblx0XHRnbC5iaW5kVmVydGV4QXJyYXkobnVsbCk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0c2hhZGVyOiB0aGlzLFxuXHRcdFx0dmFvLFxuXHRcdFx0Z2VvbWV0cnlCdWZmZXI6IGdsR2VvbWV0cnlCdWZmZXIsXG5cdFx0XHR2ZXJ0ZXhDb3VudDogdmVydGV4Q291bnQsXG5cdFx0XHRpbmRleEJ1ZmZlcjogZ2xCdWZmZXJJbmRleCxcblx0XHRcdHV2QnVmZmVyOiBudWxsLFxuXHRcdFx0aW5zdGFuY2VCdWZmZXI6IG51bGwsXG5cdFx0XHRpbnN0YW5jZUNvdW50OiAxLFxuXHRcdFx0bm9ybWFsQnVmZmVyOiBudWxsLFxuXHRcdFx0cmVuZGVyTW9kZTogdGhpcy5fZ2wuVFJJQU5HTEVTLFxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcihlOiBFbmdpbmUsIGluZm86IFNoYWRlclZBT0luZm8sIHJjOiBSZW5kZXJDb21wb25lbnQpIHtcblxuXHRcdGNvbnN0IGdsID0gZS5nbDtcblxuXHRcdHRoaXMudXNlKCk7XG5cdFx0dGhpcy5zZXRNYXRyaXg0ZnYoXCJ1UHJvamVjdGlvblwiLCBmYWxzZSwgZS5wcm9qZWN0aW9uTWF0cml4KCkpO1xuXHRcdHRoaXMuc2V0TWF0cml4NGZ2KFwidVZpZXdcIiwgZmFsc2UsIGUudmlld01hdHJpeCgpKTtcblxuXHRcdHJjLmdldE1hdGVyaWFsKCkuZGVmaW5pdGlvbi5kaWZmdXNlLmVuYWJsZUFzVW5pdChnbCwgMCk7XG5cdFx0dGhpcy5zZXQxSShcInVTYW1wbGVyXCIsIDApO1xuXG5cdFx0Z2wuZGVwdGhGdW5jKGdsLkxFUVVBTCk7XHQvLyB0cmljayBkZXB0aFxuXHRcdGdsLmJpbmRWZXJ0ZXhBcnJheShpbmZvLnZhbyk7XG5cblx0XHQvLyBpbnZlcnQgY3ViZSBub3JtYWxzIHRvIHNlZSBmcm9tIHRoZSBpbnNpZGUuICh3ZSBhcmUgaW5zaWRlIHRoZSBza3lib3gpXG5cdFx0Z2wuY3VsbEZhY2UoZ2wuRlJPTlQpO1xuXHRcdGdsLmRyYXdFbGVtZW50cyhnbC5UUklBTkdMRVMsIDM2LCBnbC5VTlNJR05FRF9TSE9SVCwgMCk7XG5cdFx0Z2wuY3VsbEZhY2UoZ2wuQkFDSyk7XG5cdFx0Z2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xuXHRcdGdsLmRlcHRoRnVuYyhnbC5MRVNTKTtcblxuXHRcdHRoaXMubm90VXNlKCk7XG5cdH1cbn0iLCJpbXBvcnQgU2hhZGVyLCB7U2hhZGVyVkFPSW5mbywgVkFPR2VvbWV0cnlJbmZvfSBmcm9tIFwiLi9TaGFkZXJcIjtcbmltcG9ydCBNYXRyaXg0IGZyb20gXCIuLi8uLi9tYXRoL01hdHJpeDRcIjtcbmltcG9ydCBFbmdpbmUgZnJvbSBcIi4uL0VuZ2luZVwiO1xuaW1wb3J0IE1hdGVyaWFsIGZyb20gXCIuLi9NYXRlcmlhbFwiO1xuaW1wb3J0IFJlbmRlckNvbXBvbmVudCBmcm9tIFwiLi4vUmVuZGVyQ29tcG9uZW50XCI7XG5pbXBvcnQge0RpcmVjdGlvbmFsTGlnaHQsIFBvaW50TGlnaHR9IGZyb20gXCIuLi9MaWdodFwiO1xuXG5cbi8qKlxuICoganVzdCBkcmF3IGdlb21ldHJ5IGluIGEgcGxhaW4gcGluayBjb2xvclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0dXJlU2hhZGVyIGV4dGVuZHMgU2hhZGVyIHtcblxuXHRsaWdodCA9IHRydWU7XG5cblx0Y29uc3RydWN0b3IoZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQsIGRlZmluZXM/OiB7W2tleTpzdHJpbmddOiBzdHJpbmd9KSB7XG5cdFx0c3VwZXIoe1xuXHRcdFx0Z2wsXG5cdFx0XHRjb21tb246IGAjdmVyc2lvbiAzMDAgZXNcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdHByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gZGlyZWN0aW9uYWwgbGlnaHRzLCBcblx0XHRcdFx0c3RydWN0IExpZ2h0IHtcblx0XHRcdFx0XHQvLyBcdFx0XHRcdHBvaW50IGxpZ2h0XG5cdFx0XHRcdFx0dmVjMyBwb3NpdGlvbjtcblx0XHRcdFx0XHRmbG9hdCBjb25zdGFudDtcblx0XHRcdFx0XHRmbG9hdCBsaW5lYXI7XG5cdFx0XHRcdFx0ZmxvYXQgcXVhZHJhdGljO1x0XHRcdFx0XHRcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBcdFx0XHRcdGRpcmVjdGlvbmFsIGxpZ2h0XG5cdFx0XHRcdFx0dmVjMyBkaXJlY3Rpb247XHRcblx0XHRcdFx0ICBcblx0XHRcdFx0XHR2ZWMzIGFtYmllbnQ7XG5cdFx0XHRcdFx0dmVjMyBkaWZmdXNlO1xuXHRcdFx0XHRcdHZlYzMgc3BlY3VsYXI7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly9cdFx0XHRcdHNwb3QgbGlnaHRcblx0XHRcdFx0XHRmbG9hdCBjdXRvZmY7XG5cdFx0XHRcdH07XG5cdFx0XHRcdFxuIFx0XHRcdFx0c3RydWN0IE1hdGVyaWFsIHtcblx0XHRcdFx0XHRmbG9hdCAgICAgYW1iaWVudDtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRzYW1wbGVyMkQgZGlmZnVzZTtcblx0XHRcdFx0XHRzYW1wbGVyMkQgc3BlY3VsYXI7XG5cdFx0XHRcdFx0ZmxvYXQgICAgIHNoaW5pbmVzcztcblx0XHRcdCAgIFx0fTsgIFxuXHRcdFx0XHRcblx0XHRcdGAsXG5cdFx0XHR2ZXJ0ZXg6IGBcdFx0XHRcdFx0XG5cdFx0XHRcdGxheW91dChsb2NhdGlvbiA9IDApIGluIHZlYzMgYVBvc2l0aW9uO1xuXHRcdFx0XHRsYXlvdXQobG9jYXRpb24gPSAxKSBpbiB2ZWMyIGFUZXh0dXJlO1xuXHRcdFx0XHRsYXlvdXQobG9jYXRpb24gPSAyKSBpbiB2ZWMzIGFOb3JtYWw7XG5cdFx0XHRcdGxheW91dChsb2NhdGlvbiA9IDQpIGluIG1hdDQgYU1vZGVsO1xuXHRcdFx0XHRcblx0XHRcdFx0dW5pZm9ybSBtYXQ0IHVQcm9qZWN0aW9uO1xuXHRcdFx0XHR1bmlmb3JtIG1hdDQgdU1vZGVsVmlldztcblx0XHRcdFx0dW5pZm9ybSBMaWdodCB1TGlnaHQ7XG5cdFx0XHRcdFxuXHRcdFx0XHRvdXQgdmVjMiB2VGV4dHVyZVBvcztcblx0XHRcdFx0b3V0IHZlYzMgdk5vcm1hbDtcblx0XHRcdFx0b3V0IHZlYzMgdkZyYWdtZW50UG9zO1xuXG5cdFx0XHRcdHZvaWQgbWFpbigpIHtcblx0XHRcdFx0XHR2VGV4dHVyZVBvcyA9IGFUZXh0dXJlO1xuXHRcdFx0XHRcdHZOb3JtYWwgPSBtYXQzKHRyYW5zcG9zZShpbnZlcnNlKGFNb2RlbCkpKSAqIGFOb3JtYWw7XHQvLyBub3JtYWwgbWF0cml4XG5cdFx0XHRcdFx0dkZyYWdtZW50UG9zID0gKGFNb2RlbCAqIHZlYzQoYVBvc2l0aW9uLCAxLjApKS54eXo7XG5cdFx0XHRcdFx0Z2xfUG9zaXRpb24gPSB1UHJvamVjdGlvbiAqIHVNb2RlbFZpZXcgKiBhTW9kZWwgKiB2ZWM0KGFQb3NpdGlvbiwgMS4wKTtcblx0XHRcdFx0fVxuXHRcdFx0YCxcblx0XHRcdGZyYWdtZW50OiBgXG5cdFx0XHRcdFxuXHRcdFx0XHR1bmlmb3JtIHZlYzMgdVZpZXdQb3M7XG5cdFx0XHRcdHVuaWZvcm0gTGlnaHQgdUxpZ2h0O1xuXHRcdFx0XHR1bmlmb3JtIE1hdGVyaWFsIHVNYXRlcmlhbDtcblx0XHRcdFx0XG5cdFx0XHRcdGluIHZlYzIgdlRleHR1cmVQb3M7XG5cdFx0XHRcdGluIHZlYzMgdk5vcm1hbDtcblx0XHRcdFx0aW4gdmVjMyB2RnJhZ21lbnRQb3M7XG5cblx0XHRcdFx0b3V0IHZlYzQgY29sb3I7XG5cdFx0XHRcdFxuXHRcdFx0XHR2ZWMzIGdldEFtYmllbnQoKSB7XG5cdFx0XHRcdFx0dmVjMyBkaWZmdXNlQ29sb3IgPSB0ZXh0dXJlKHVNYXRlcmlhbC5kaWZmdXNlLCB2VGV4dHVyZVBvcykueHl6O1xuXHRcdFx0XHRcdHJldHVybiAodUxpZ2h0LmFtYmllbnQgKyB1TWF0ZXJpYWwuYW1iaWVudCkgKiBkaWZmdXNlQ29sb3I7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHZlYzMgZ2V0RGlmZnVzZSh2ZWMzIG5vcm1hbCwgdmVjMyBsaWdodERpcikge1xuXHRcdFx0XHRcdGZsb2F0IGRpZmYgPSBtYXgoZG90KG5vcm1hbCwgbGlnaHREaXIpLCAwLjApO1xuXHRcdFx0XHRcdHZlYzMgZGlmZnVzZUNvbG9yID0gdGV4dHVyZSh1TWF0ZXJpYWwuZGlmZnVzZSwgdlRleHR1cmVQb3MpLnh5ejtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRyZXR1cm4gZGlmZiAqIHVMaWdodC5kaWZmdXNlICogZGlmZnVzZUNvbG9yO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHR2ZWMzIGdldFNwZWN1bGFyKHZlYzMgbm9ybWFsLCB2ZWMzIGxpZ2h0RGlyKSB7XG5cdFx0XHRcdFx0ZmxvYXQgc3BlY3VsYXIgPSAwLjA7XG5cdFx0XHRcdFx0aWYgKGRvdChub3JtYWwsIGxpZ2h0RGlyKT4wLjApIHtcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR2ZWMzIHZpZXdEaXIgPSBub3JtYWxpemUodVZpZXdQb3MgLSB2RnJhZ21lbnRQb3MpO1xuXHRcdFx0XHRcdFx0I2lmZGVmIFBIT05HXG5cdFx0XHRcdFx0XHRcdC8vIHBob25nXG5cdFx0XHRcdFx0XHRcdHZlYzMgcmVmbGVjdCA9IC1yZWZsZWN0KGxpZ2h0RGlyLCBub3JtYWwpO1xuXHRcdFx0XHRcdFx0XHRzcGVjdWxhciA9IHBvdyhtYXgoZG90KHZpZXdEaXIsIHJlZmxlY3QpLCAwLjApLCB1TWF0ZXJpYWwuc2hpbmluZXNzKTtcblx0XHRcdFx0XHRcdCNlbHNlXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdC8vIGJsaW5uIHBob25nXG5cdFx0XHRcdFx0XHRcdHZlYzMgaGFsZndheURpciA9IG5vcm1hbGl6ZShsaWdodERpciArIHZpZXdEaXIpO1xuXHRcdFx0XHRcdFx0XHRzcGVjdWxhciA9IHBvdyhtYXgoZG90KG5vcm1hbCwgaGFsZndheURpciksIDAuMCksIHVNYXRlcmlhbC5zaGluaW5lc3MpO1xuXHRcdFx0XHRcdFx0I2VuZGlmXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHJldHVybiB1TGlnaHQuc3BlY3VsYXIgKiBzcGVjdWxhciAqIHZlYzModGV4dHVyZSh1TWF0ZXJpYWwuc3BlY3VsYXIsIHZUZXh0dXJlUG9zKSk7IFxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHR2ZWM0IGRpcmVjdGlvbmFsKCkge1xuXHRcdFx0XHRcdHZlYzMgbGlnaHREaXIgPSBub3JtYWxpemUoLXVMaWdodC5kaXJlY3Rpb24pO1xuXHRcdFx0XHRcdHJldHVybiB2ZWM0KDAsMCwwLDApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHR2ZWMzIHBvaW50KCkge1xuXHRcdFx0XHRcdHZlYzMgbm9ybSA9IFx0XHRub3JtYWxpemUodk5vcm1hbCk7XG5cdFx0XHRcdFx0dmVjMyBsaWdodERpciA9IFx0bm9ybWFsaXplKHVMaWdodC5wb3NpdGlvbiAtIHZGcmFnbWVudFBvcyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dmVjMyBjb2xvciA9IGdldEFtYmllbnQoKSArIGdldERpZmZ1c2Uobm9ybSwgbGlnaHREaXIpXG5cdFx0XHRcdFx0XHRcdFx0XHQjaWZkZWYgU1BFQ1VMQVIgXG5cdFx0XHRcdFx0XHRcdFx0XHQgKyBnZXRTcGVjdWxhcihub3JtLCBsaWdodERpcilcblx0XHRcdFx0XHRcdFx0XHRcdCNlbmRpZlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHQjaWZkZWYgU1BFQ1VMQVJcblx0XHRcdFx0XHRcdGZsb2F0IGRpc3RhbmNlID0gXHRsZW5ndGgodUxpZ2h0LnBvc2l0aW9uIC0gdkZyYWdtZW50UG9zKTtcblx0XHRcdFx0XHRcdGZsb2F0IGF0dGVudWF0aW9uID0gcG93KDEuMCAvIChcdHVMaWdodC5jb25zdGFudCArIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1TGlnaHQubGluZWFyICogZGlzdGFuY2UgKyBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dUxpZ2h0LnF1YWRyYXRpYyAqIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQoZGlzdGFuY2UgKiBkaXN0YW5jZSkpLCAuNDUpO1x0Ly8gZ2FtbWEgICAgXG5cdCBcblx0XHRcdFx0XHRcdGNvbG9yLnh5eiA9IGNvbG9yLnh5eiAqIGF0dGVudWF0aW9uO1xuIFx0XHRcdFx0XHQjZW5kaWZcblxuIFx0XHRcdFx0XHRjb2xvci54eXogPSBwb3coY29sb3IueHl6LCB2ZWMzKC40NSkpO1x0Ly8gZ2FtbWFcbiBcdFx0XHRcdFx0XG4gXHRcdFx0XHRcdHJldHVybiBjb2xvcjtcblx0XHRcdFx0fVx0XHRcdFx0XG5cblx0XHRcdFx0dm9pZCBtYWluKCkge1xuXHRcdFx0XHRcdGNvbG9yID0gdmVjNChwb2ludCgpLCAxLjApOyBcblx0XHRcdFx0XHQvLyBjb2xvciA9IHZlYzQodmVjMyhnbF9GcmFnQ29vcmQueiksIDEuMCk7XG5cdFx0XHRcdH1cblx0XHRcdGAsXG5cdFx0XHRhdHRyaWJ1dGVzOiBbXCJhUG9zaXRpb25cIiwgXCJhVGV4dHVyZVwiLCBcImFOb3JtYWxcIiwgXCJhTW9kZWxcIl0sXG5cdFx0XHR1bmlmb3JtczogW1xuXHRcdFx0XHRcInVQcm9qZWN0aW9uXCIsXG5cdFx0XHRcdFwidU1vZGVsVmlld1wiLFxuXG5cdFx0XHRcdFwidUxpZ2h0LnBvc2l0aW9uXCIsXG5cdFx0XHRcdFwidUxpZ2h0LmNvbnN0YW50XCIsXG5cdFx0XHRcdFwidUxpZ2h0LmxpbmVhclwiLFxuXHRcdFx0XHRcInVMaWdodC5xdWFkcmF0aWNcIixcblxuXHRcdFx0XHRcInVMaWdodC5kaXJlY3Rpb25cIixcblxuXHRcdFx0XHRcInVMaWdodC5hbWJpZW50XCIsXG5cdFx0XHRcdFwidUxpZ2h0LmRpZmZ1c2VcIixcblx0XHRcdFx0XCJ1TGlnaHQuc3BlY3VsYXJcIixcblxuXHRcdFx0XHRcInVNYXRlcmlhbC5hbWJpZW50XCIsXG5cdFx0XHRcdFwidU1hdGVyaWFsLmRpZmZ1c2VcIixcblx0XHRcdFx0XCJ1TWF0ZXJpYWwuc3BlY3VsYXJcIixcblx0XHRcdFx0XCJ1TWF0ZXJpYWwuc2hpbmluZXNzXCIsXG5cdFx0XHRdLFxuXHRcdFx0ZGVmaW5lczogZGVmaW5lcyA/PyB7XG5cdFx0XHRcdFwiU1BFQ1VMQVJcIjogXCIxXCIsXG5cdFx0XHR9LFxuXHRcdH0pO1xuXG5cdFx0dGhpcy5saWdodCA9IGRlZmluZXM9PT11bmRlZmluZWQ7XG5cblx0XHR0aGlzLnNldE1hdHJpeDRmdihcInVQcm9qZWN0aW9uXCIsIGZhbHNlLCBNYXRyaXg0LmNyZWF0ZSgpKTtcblx0XHR0aGlzLnNldE1hdHJpeDRmdihcInVNb2RlbFZpZXdcIiwgZmFsc2UsIE1hdHJpeDQuY3JlYXRlKCkpO1xuXHRcdHRoaXMuc2V0M0YoXCJ1TGlnaHQucG9zaXRpb25cIiwgMCwgMSwgMCk7XG5cdFx0dGhpcy5zZXQzRihcInVMaWdodC5kaXJlY3Rpb25cIiwgMCwgMSwgMCk7XG5cdFx0dGhpcy5zZXQzRihcInVMaWdodC5hbWJpZW50XCIsIC4yLCAuMiwgLjIpO1xuXHRcdHRoaXMuc2V0M0YoXCJ1TGlnaHQuZGlmZnVzZVwiLCAuNSwgLjUsIC41KTtcblx0XHR0aGlzLnNldDNGKFwidUxpZ2h0LnNwZWN1bGFyXCIsIDEsIDEsIDEpO1xuXG5cdFx0Ly8gZm9yIGRpZmZlcmVudCBwb2ludCBsaWdodCB2YWx1ZXMgZGVjYXksIGNoZWNrOlxuXHRcdC8vIGh0dHA6Ly93aWtpLm9ncmUzZC5vcmcvdGlraS1pbmRleC5waHA/cGFnZT0tUG9pbnQrTGlnaHQrQXR0ZW51YXRpb25cblx0XHR0aGlzLnNldDFGKFwidUxpZ2h0LmNvbnN0YW50XCIsIDEuMCk7XG5cdFx0dGhpcy5zZXQxRihcInVMaWdodC5saW5lYXJcIiwgMC4wNDUpO1xuXHRcdHRoaXMuc2V0MUYoXCJ1TGlnaHQucXVhZHJhdGljXCIsIDAuMDA3NSk7XG5cdH1cblxuXHR1c2UoKSB7XG5cdFx0Y29uc3QgZ2wgPSB0aGlzLl9nbDtcblxuXHRcdGdsLnVzZVByb2dyYW0odGhpcy5fc2hhZGVyUHJvZ3JhbSk7XG5cdH1cblxuXHRub3RVc2UoKSB7XG5cdFx0Y29uc3QgZ2wgPSB0aGlzLl9nbDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGk8NzsgaSsrICkge1xuXHRcdFx0Z2wudmVydGV4QXR0cmliRGl2aXNvcihpLCAwKTtcblx0XHRcdGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheShpKTtcblx0XHR9XG5cblx0XHRnbC51c2VQcm9ncmFtKG51bGwpO1xuXHR9XG5cblx0Y3JlYXRlVkFPKGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LCBnZW9tZXRyeUluZm86IFZBT0dlb21ldHJ5SW5mbywgbWF0ZXJpYWw6IE1hdGVyaWFsKSA6IFNoYWRlclZBT0luZm8ge1xuXG5cdFx0Y29uc3QgdmFvID0gZ2wuY3JlYXRlVmVydGV4QXJyYXkoKTtcblx0XHRnbC5iaW5kVmVydGV4QXJyYXkodmFvKTtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHRcdGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGkpO1xuXHRcdFx0Z2wudmVydGV4QXR0cmliRGl2aXNvcihpLDApO1xuXHRcdH1cblxuXHRcdGNvbnN0IGluc3RhbmNlQ291bnQgPSBnZW9tZXRyeUluZm8uaW5zdGFuY2VDb3VudCB8fCAxO1xuXG5cdFx0Y29uc3QgZ2xHZW9tZXRyeUJ1ZmZlciA9IFNoYWRlci5jcmVhdGVBdHRyaWJ1dGVJbmZvKGdsLCAwLCBnZW9tZXRyeUluZm8udmVydGV4LCAxMiwgMCk7XG5cdFx0Y29uc3QgZ2xVVkJ1ZmZlciA9IFNoYWRlci5jcmVhdGVBdHRyaWJ1dGVJbmZvKGdsLCAxLCBnZW9tZXRyeUluZm8udXYsIDgsIDApO1xuXHRcdGNvbnN0IGdsTm9ybWFsQnVmZmVyID0gU2hhZGVyLmNyZWF0ZUF0dHJpYnV0ZUluZm8oZ2wsIDIsIGdlb21ldHJ5SW5mby5ub3JtYWwsIDEyLCAwKTtcblxuXHRcdGNvbnN0IGFtb2RlbExvYyA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuX3NoYWRlclByb2dyYW0sIFwiYU1vZGVsXCIpO1xuXHRcdGNvbnN0IGdsSW5zdGFuY2VkTW9kZWxUcmFuc2Zvcm1CdWZmZXIgPSBTaGFkZXIuY3JlYXRlSW5zdGFuY2VkTW9kZWxNYXRyaXgoZ2wsIGluc3RhbmNlQ291bnQsIGFtb2RlbExvYywgISFnZW9tZXRyeUluZm8uaW5kZXgpO1xuXG5cdFx0bGV0IGdsQnVmZmVySW5kZXg6IFdlYkdMQnVmZmVyID0gbnVsbDtcblx0XHRsZXQgdmVydGV4Q291bnQgPSAoZ2VvbWV0cnlJbmZvLnZlcnRleC5sZW5ndGgvMyl8MDtcblx0XHRpZiAoZ2VvbWV0cnlJbmZvLmluZGV4KSB7XG5cdFx0XHRnbEJ1ZmZlckluZGV4ID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG5cdFx0XHRnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBnbEJ1ZmZlckluZGV4KTtcblx0XHRcdGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGdlb21ldHJ5SW5mby5pbmRleCwgZ2wuU1RBVElDX0RSQVcpO1xuXHRcdFx0dmVydGV4Q291bnQgPSBnZW9tZXRyeUluZm8uaW5kZXgubGVuZ3RoO1xuXHRcdH1cblxuXHRcdGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRzaGFkZXI6IHRoaXMsXG5cdFx0XHR2YW8sXG5cdFx0XHRnZW9tZXRyeUJ1ZmZlcjogZ2xHZW9tZXRyeUJ1ZmZlcixcblx0XHRcdHV2QnVmZmVyOiBnbFVWQnVmZmVyLFxuXHRcdFx0aW5kZXhCdWZmZXI6IGdsQnVmZmVySW5kZXgsXG5cdFx0XHRpbnN0YW5jZUJ1ZmZlcjogZ2xJbnN0YW5jZWRNb2RlbFRyYW5zZm9ybUJ1ZmZlcixcblx0XHRcdG5vcm1hbEJ1ZmZlcjogZ2xOb3JtYWxCdWZmZXIsXG5cdFx0XHR2ZXJ0ZXhDb3VudDogdmVydGV4Q291bnQsXG5cdFx0XHRpbnN0YW5jZUNvdW50LFxuXHRcdFx0YmFja0ZhY2VEaXNhYmxlZDogZ2VvbWV0cnlJbmZvLmN1bGxEaXNhYmxlZCxcblx0XHRcdHJlbmRlck1vZGU6IG1hdGVyaWFsLnJlbmRlck1vZGUgPz8gdGhpcy5fZ2wuVFJJQU5HTEVTLFxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXIoZTogRW5naW5lLCBpbmZvOiBTaGFkZXJWQU9JbmZvLCByYzogUmVuZGVyQ29tcG9uZW50KSB7XG5cblx0XHRjb25zdCBnbCA9IGUuZ2w7XG5cblx0XHRpZiAoaW5mby5iYWNrRmFjZURpc2FibGVkKSB7XG5cdFx0XHR0aGlzLl9nbC5kaXNhYmxlKHRoaXMuX2dsLkNVTExfRkFDRSk7XG5cdFx0fVxuXG5cdFx0dGhpcy51c2UoKTtcblx0XHR0aGlzLnNldE1hdHJpeDRmdihcInVQcm9qZWN0aW9uXCIsIGZhbHNlLCBlLnByb2plY3Rpb25NYXRyaXgoKSk7XG5cdFx0dGhpcy5zZXRNYXRyaXg0ZnYoXCJ1TW9kZWxWaWV3XCIsIGZhbHNlLCBlLmNhbWVyYU1hdHJpeCgpKTtcblxuXHRcdGNvbnN0IG1hdGVyaWFsID0gcmMuZ2V0TWF0ZXJpYWwoKS5kZWZpbml0aW9uO1xuXG5cdFx0bWF0ZXJpYWwuZGlmZnVzZS5lbmFibGVBc1VuaXQoZ2wsIDApO1xuXHRcdHRoaXMuc2V0MUkoXCJ1TWF0ZXJpYWwuZGlmZnVzZVwiLCAwKTtcblx0XHR0aGlzLnNldDFGKFwidU1hdGVyaWFsLmFtYmllbnRcIiwgbWF0ZXJpYWwuYW1iaWVudCk7XG5cblx0XHRjb25zdCBsaWdodCA9IGUubGlnaHRbJ3BvaW50J10gYXMgUG9pbnRMaWdodDtcblx0XHRpZiAodGhpcy5saWdodCkge1xuXHRcdFx0bWF0ZXJpYWwuc3BlY3VsYXIuZW5hYmxlQXNVbml0KGdsLCAxKTtcblx0XHRcdHRoaXMuc2V0MUkoXCJ1TWF0ZXJpYWwuc3BlY3VsYXJcIiwgMSk7XG5cdFx0XHR0aGlzLnNldDFGKFwidU1hdGVyaWFsLnNoaW5pbmVzc1wiLCBtYXRlcmlhbC5zaGluaW5lc3MpO1xuXHRcdFx0dGhpcy5zZXQzRlYoXCJ1TGlnaHQuc3BlY3VsYXJcIiwgbGlnaHQuZ2V0U3BlY3VsYXIoKSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zZXQzRlYoXCJ1TGlnaHQuZGlmZnVzZVwiLCBsaWdodC5nZXREaWZmdXNlKCkpO1xuXHRcdHRoaXMuc2V0M0ZWKFwidUxpZ2h0LnBvc2l0aW9uXCIsIGxpZ2h0LmdldFBvc2l0aW9uKCkpO1xuXHRcdHRoaXMuc2V0M0ZWKFwidUxpZ2h0LmFtYmllbnRcIiwgbGlnaHQuZ2V0QW1iaWVudCgpKTtcblxuXHRcdHRoaXMuc2V0M0ZWKFwidVZpZXdQb3NcIiwgZS5jYW1lcmFQb3NpdGlvbigpKTtcblxuXHRcdGdsLmJpbmRWZXJ0ZXhBcnJheShpbmZvLnZhbyk7XG5cblx0XHQvLyBpZiAoaW5mby5pbmRleEJ1ZmZlcikge1xuXHRcdC8vIFx0Z2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5mby5pbmRleEJ1ZmZlcik7XG5cdFx0Ly8gfVxuXG5cdFx0aW5mby5pbnN0YW5jZUJ1ZmZlci5kcmF3KGdsLCBpbmZvLnZlcnRleENvdW50LCBpbmZvLmluc3RhbmNlQ291bnQpO1xuXG5cdFx0Z2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xuXHRcdHRoaXMubm90VXNlKCk7XG5cblx0XHRpZiAoaW5mby5iYWNrRmFjZURpc2FibGVkKSB7XG5cdFx0XHR0aGlzLl9nbC5lbmFibGUodGhpcy5fZ2wuQ1VMTF9GQUNFKTtcblx0XHR9XG5cblx0fVxufSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRW5naW5lXzEgPSByZXF1aXJlKFwiLi9yZW5kZXIvRW5naW5lXCIpO1xuY29uc3QgUGxhdGZvcm1fMSA9IHJlcXVpcmUoXCIuL3BsYXRmb3JtL1BsYXRmb3JtXCIpO1xuY29uc3QgVGV4dHVyZV8xID0gcmVxdWlyZShcIi4vcmVuZGVyL1RleHR1cmVcIik7XG5jb25zdCBMb2FkZXJfMSA9IHJlcXVpcmUoXCIuL3BsYXRmb3JtL0xvYWRlclwiKTtcbm5ldyBMb2FkZXJfMS5Mb2FkZXIoKS5hZGRJbWFnZShbXG4gICAgXCJhc3NldHMvbGF2YS5qcGdcIixcbiAgICBcImFzc2V0cy9kaWZmdXNlLnBuZ1wiLFxuICAgIFwiYXNzZXRzL3NwZWN1bGFyLnBuZ1wiLFxuICAgIFwiYXNzZXRzL2VhcnRoLmpwZ1wiLFxuICAgIFwiYXNzZXRzL21vb24uanBnXCIsXG4gICAgXCJhc3NldHMvanVwaXRlci5qcGdcIixcbiAgICBcImFzc2V0cy9jdWJlbWFwMy9iYWNrLnBuZ1wiLFxuICAgIFwiYXNzZXRzL2N1YmVtYXAzL2JvdHRvbS5wbmdcIixcbiAgICBcImFzc2V0cy9jdWJlbWFwMy9mcm9udC5wbmdcIixcbiAgICBcImFzc2V0cy9jdWJlbWFwMy9sZWZ0LnBuZ1wiLFxuICAgIFwiYXNzZXRzL2N1YmVtYXAzL3JpZ2h0LnBuZ1wiLFxuICAgIFwiYXNzZXRzL2N1YmVtYXAzL3RvcC5wbmdcIixcbl0pLmxvYWQoKGwpID0+IHtcbiAgICBjb25zdCBlID0gbmV3IEVuZ2luZV8xLmRlZmF1bHQod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgY29uc3QgZ2wgPSBlLmdsO1xuICAgIGUuYWRkVGV4dHVyZShcImVhcnRoXCIsIFRleHR1cmVfMS5kZWZhdWx0LmluaXRpYWxpemUoZ2wsIHtcbiAgICAgICAgZWxlbWVudDogbC5nZXRJbWFnZShcImVhcnRoLmpwZ1wiKSxcbiAgICAgICAgd3JhcF9tb2RlOiBnbC5SRVBFQVQsXG4gICAgICAgIG1pbkZpbHRlcjogZ2wuTElORUFSX01JUE1BUF9MSU5FQVIsXG4gICAgfSkpO1xuICAgIGUuYWRkVGV4dHVyZShcImp1cGl0ZXJcIiwgVGV4dHVyZV8xLmRlZmF1bHQuaW5pdGlhbGl6ZShnbCwge1xuICAgICAgICBlbGVtZW50OiBsLmdldEltYWdlKFwianVwaXRlci5qcGdcIiksXG4gICAgICAgIHdyYXBfbW9kZTogZ2wuUkVQRUFULFxuICAgICAgICBtaW5GaWx0ZXI6IGdsLkxJTkVBUl9NSVBNQVBfTElORUFSLFxuICAgIH0pKTtcbiAgICBlLmFkZFRleHR1cmUoXCJtb29uXCIsIFRleHR1cmVfMS5kZWZhdWx0LmluaXRpYWxpemUoZ2wsIHtcbiAgICAgICAgZWxlbWVudDogbC5nZXRJbWFnZShcIm1vb24uanBnXCIpLFxuICAgICAgICB3cmFwX21vZGU6IGdsLlJFUEVBVCxcbiAgICAgICAgbWluRmlsdGVyOiBnbC5MSU5FQVJfTUlQTUFQX0xJTkVBUixcbiAgICB9KSk7XG4gICAgZS5hZGRUZXh0dXJlKFwiZGlmZnVzZVwiLCBUZXh0dXJlXzEuZGVmYXVsdC5pbml0aWFsaXplKGdsLCB7XG4gICAgICAgIGVsZW1lbnQ6IGwuZ2V0SW1hZ2UoXCJkaWZmdXNlLnBuZ1wiKSxcbiAgICAgICAgd3JhcF9tb2RlOiBnbC5DTEFNUF9UT19FREdFLFxuICAgICAgICBtaW5GaWx0ZXI6IGdsLkxJTkVBUl9NSVBNQVBfTElORUFSLFxuICAgIH0pKTtcbiAgICBlLmFkZFRleHR1cmUoXCJzcGVjdWxhclwiLCBUZXh0dXJlXzEuZGVmYXVsdC5pbml0aWFsaXplKGdsLCB7XG4gICAgICAgIGVsZW1lbnQ6IGwuZ2V0SW1hZ2UoXCJsYXZhLmpwZ1wiKSxcbiAgICAgICAgd3JhcF9tb2RlOiBnbC5DTEFNUF9UT19FREdFLFxuICAgICAgICBtaW5GaWx0ZXI6IGdsLkxJTkVBUl9NSVBNQVBfTElORUFSLFxuICAgIH0pKTtcbiAgICBlLmFkZFRleHR1cmUoXCJjdWJlbWFwXCIsIFRleHR1cmVfMS5kZWZhdWx0LmluaXRpYWxpemVDdWJlTWFwKGdsLCBsLmdldEltYWdlc1dpdGgoW1wibGVmdC5wbmdcIiwgXCJyaWdodC5wbmdcIiwgXCJ0b3AucG5nXCIsIFwiYm90dG9tLnBuZ1wiLCBcImJhY2sucG5nXCIsIFwiZnJvbnQucG5nXCJdKSkpO1xuICAgIGUuaW5pdCgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXYpID0+IHtcbiAgICAgICAgZS5rZXlib2FyZEV2ZW50KGV2LmtleSwgdHJ1ZSk7XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXYpID0+IHtcbiAgICAgICAgZS5rZXlib2FyZEV2ZW50KGV2LmtleSwgZmFsc2UpO1xuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIChldikgPT4ge1xuICAgICAgICBlLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICB9KTtcbiAgICBQbGF0Zm9ybV8xLmRlZmF1bHQuY2FudmFzLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFBsYXRmb3JtXzEuZGVmYXVsdC5jYW52YXMucmVxdWVzdFBvaW50ZXJMb2NrKCk7XG4gICAgfTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybG9ja2NoYW5nZScsIGxvY2tDaGFuZ2VBbGVydCwgZmFsc2UpO1xuICAgIHJ1bigpO1xuICAgIGZ1bmN0aW9uIGxvY2tDaGFuZ2VBbGVydCgpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnBvaW50ZXJMb2NrRWxlbWVudCA9PT0gUGxhdGZvcm1fMS5kZWZhdWx0LmNhbnZhcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1RoZSBwb2ludGVyIGxvY2sgc3RhdHVzIGlzIG5vdyBsb2NrZWQnKTtcbiAgICAgICAgICAgIFBsYXRmb3JtXzEuZGVmYXVsdC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB1cGRhdGVQb3NpdGlvbiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1RoZSBwb2ludGVyIGxvY2sgc3RhdHVzIGlzIG5vdyB1bmxvY2tlZCcpO1xuICAgICAgICAgICAgUGxhdGZvcm1fMS5kZWZhdWx0LmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHVwZGF0ZVBvc2l0aW9uLCBmYWxzZSk7XG4gICAgICAgICAgICBmaXJzdFBvaW50ZXJMb2NrUG9zaXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBmaXJzdFBvaW50ZXJMb2NrUG9zaXRpb24gPSB0cnVlO1xuICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uKGV2KSB7XG4gICAgICAgIGlmIChmaXJzdFBvaW50ZXJMb2NrUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGZpcnN0UG9pbnRlckxvY2tQb3NpdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZS5tb3VzZUV2ZW50KGV2Lm1vdmVtZW50WCwgZXYubW92ZW1lbnRZKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBydW4oKSB7XG4gICAgICAgIGZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgICAgICAgICBlLnJlbmRlcigxNi42Nik7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWFpbi5qcy5tYXAiXX0=

require('Main');
