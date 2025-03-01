import { Vec2 } from "./vector2"

/**
 * Includes various 2x2 matrix functions and values.
 */
export let Mat2

;(function(_Mat) {
  const Identity = (_Mat.Identity = {
    m11: 1,
    m12: 0,
    m21: 0,
    m22: 1
  })

  function isMatrix2(m) {
    return (
      typeof m === "object" &&
      "m11" in m &&
      "m12" in m &&
      "m21" in m &&
      "m22" in m
    )
  }

  _Mat.isMatrix2 = isMatrix2

  function from(u, v) {
    if (Array.isArray(u) && u.length >= 4)
      return {
        m11: u[0],
        m12: u[1],
        m21: u[2],
        m22: u[3]
      }
    if (Vec2.isVector2(u) && v)
      return {
        m11: u.x,
        m12: v.x,
        m21: u.y,
        m22: v.y
      }
    throw new Error("Invalid input values for vector construction.")
  }

  _Mat.from = from

  function c1(m) {
    return {
      x: m.m11,
      y: m.m21
    }
  }

  _Mat.c1 = c1

  function c2(m) {
    return {
      x: m.m12,
      y: m.m22
    }
  }

  _Mat.c2 = c2

  function r1(m) {
    return {
      x: m.m11,
      y: m.m12
    }
  }

  _Mat.r1 = r1

  function r2(m) {
    return {
      x: m.m21,
      y: m.m22
    }
  }

  _Mat.r2 = r2

  function mul(m, t) {
    if (isMatrix2(t))
      return {
        m11: Vec2.dot(r1(m), c1(t)),
        m12: Vec2.dot(r1(m), c2(t)),
        m21: Vec2.dot(r2(m), c1(t)),
        m22: Vec2.dot(r2(m), c2(t))
      }
    else if (Vec2.isVector2(t))
      return {
        x: Vec2.dot(r1(m), t),
        y: Vec2.dot(r2(m), t)
      }
    else
      return {
        m11: m.m11 * t,
        m12: m.m12 * t,
        m21: m.m21 * t,
        m22: m.m22 * t
      }
  }

  _Mat.mul = mul

  function trace(m) {
    return m.m11 + m.m22
  }

  _Mat.trace = trace

  function determinant(m) {
    return m.m11 * m.m22 - m.m12 * m.m21
  }

  _Mat.determinant = determinant

  function transpose(m) {
    return {
      m11: m.m11,
      m12: m.m21,
      m21: m.m12,
      m22: m.m22
    }
  }

  _Mat.transpose = transpose

  function cofactor(m) {
    return {
      m11: m.m22,
      m12: -m.m21,
      m21: -m.m12,
      m22: m.m11
    }
  }

  _Mat.cofactor = cofactor

  function adjugate(m) {
    return {
      m11: m.m22,
      m12: -m.m12,
      m21: -m.m21,
      m22: m.m11
    }
  }

  _Mat.adjugate = adjugate

  function inverse(m) {
    const det = determinant(m)
    if (det === 0) throw new Error("Matrix is not invertible.")
    return mul(adjugate(m), 1 / det)
  }

  _Mat.inverse = inverse
})(Mat2 || (Mat2 = {}))
