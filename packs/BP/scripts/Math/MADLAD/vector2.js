import { Mat2 } from "./matrix2"

/**
 * Includes various 2D vector functions and values.
 */
export let Vec2

;(function(_Vec) {
  const Zero = (_Vec.Zero = {
    x: 0,
    y: 0
  })

  const One = (_Vec.One = {
    x: 1,
    y: 1
  })

  const Up = (_Vec.Up = {
    x: 0,
    y: 1
  })

  const Down = (_Vec.Down = {
    x: 0,
    y: -1
  })

  const Left = (_Vec.Left = {
    x: -1,
    y: 0
  })

  const Right = (_Vec.Right = {
    x: 1,
    y: 0
  })

  const X = (_Vec.X = Right)
  const Y = (_Vec.Y = Up)

  function isVector2(v) {
    return typeof v === "object" && "x" in v && "y" in v
  }

  _Vec.isVector2 = isVector2

  function from(x, y) {
    if (Array.isArray(x) && x.length >= 2)
      return {
        x: x[0],
        y: x[1]
      }
    else if (typeof x === "number")
      return {
        x: x,
        y: y ?? x
      }
    throw new Error("Invalid input values for vector construction.")
  }

  _Vec.from = from

  function fromVectorXZ(v) {
    return {
      x: v.x,
      y: v.z
    }
  }

  _Vec.fromVectorXZ = fromVectorXZ

  function toVectorXZ(v) {
    return {
      x: v.x,
      z: v.y
    }
  }

  _Vec.toVectorXZ = toVectorXZ

  function toArray(v) {
    const { x, y } = v
    return [x, y]
  }

  _Vec.toArray = toArray

  function toString(v) {
    return toArray(v).join(" ")
  }

  _Vec.toString = toString

  function parse(s) {
    const [x, y] = s.split(" ").map(Number)
    return {
      x,
      y
    }
  }

  _Vec.parse = parse

  function isNaN(v) {
    return Number.isNaN(v.x) || Number.isNaN(v.y)
  }

  _Vec.isNaN = isNaN

  function isInf(v) {
    return !isFinite(v)
  }

  _Vec.isInf = isInf

  function isFinite(v) {
    return Number.isFinite(v.x) && Number.isFinite(v.y)
  }

  _Vec.isFinite = isFinite

  function any(v) {
    return v.x !== 0 || v.y !== 0
  }

  _Vec.any = any

  function all(v) {
    return v.x !== 0 && v.y !== 0
  }

  _Vec.all = all

  function greaterThan(u, v) {
    return {
      x: u.x > v.x ? 1 : 0,
      y: u.y > v.y ? 1 : 0
    }
  }

  _Vec.greaterThan = greaterThan

  function lessThan(u, v) {
    return {
      x: u.x < v.x ? 1 : 0,
      y: u.y < v.y ? 1 : 0
    }
  }

  _Vec.lessThan = lessThan

  function greaterEqual(u, v) {
    return {
      x: u.x >= v.x ? 1 : 0,
      y: u.y >= v.y ? 1 : 0
    }
  }

  _Vec.greaterEqual = greaterEqual

  function lessEqual(u, v) {
    return {
      x: u.x <= v.x ? 1 : 0,
      y: u.y <= v.y ? 1 : 0
    }
  }

  _Vec.lessEqual = lessEqual

  function equal(u, v) {
    return u.x === v.x && u.y === v.y
  }

  _Vec.equal = equal

  function min(u, v) {
    return {
      x: Math.min(u.x, v.x),
      y: Math.min(u.y, v.y)
    }
  }

  _Vec.min = min

  function max(u, v) {
    return {
      x: Math.max(u.x, v.x),
      y: Math.max(u.y, v.y)
    }
  }

  _Vec.max = max

  function clamp(v, min, max) {
    return {
      x: Math.min(Math.max(v.x, min.x), max.x),
      y: Math.min(Math.max(v.y, min.y), max.y)
    }
  }

  _Vec.clamp = clamp

  function saturate(v) {
    return {
      x: Math.min(Math.max(v.x, 0), 1),
      y: Math.min(Math.max(v.y, 0), 1)
    }
  }

  _Vec.saturate = saturate

  function sign(v) {
    return {
      x: Math.sign(v.x),
      y: Math.sign(v.y)
    }
  }

  _Vec.sign = sign

  function floor(v) {
    return {
      x: Math.floor(v.x),
      y: Math.floor(v.y)
    }
  }

  _Vec.floor = floor

  function ceil(v) {
    return {
      x: Math.ceil(v.x),
      y: Math.ceil(v.y)
    }
  }

  _Vec.ceil = ceil

  function frac(v) {
    return {
      x: v.x - Math.floor(v.x),
      y: v.y - Math.floor(v.y)
    }
  }

  _Vec.frac = frac

  function round(v) {
    return {
      x: Math.round(v.x),
      y: Math.round(v.y)
    }
  }

  _Vec.round = round

  function mod(u, v) {
    return {
      x: u.x % v.x,
      y: u.y % v.y
    }
  }

  _Vec.mod = mod

  function neg(v) {
    return {
      x: -v.x,
      y: -v.y
    }
  }

  _Vec.neg = neg

  function abs(v) {
    return {
      x: Math.abs(v.x),
      y: Math.abs(v.y)
    }
  }

  _Vec.abs = abs

  function add(v, ...args) {
    for (const arg of args)
      v = {
        x: v.x + arg.x,
        y: v.y + arg.y
      }
    return v
  }

  _Vec.add = add

  function sub(v, ...args) {
    for (const arg of args)
      v = {
        x: v.x - arg.x,
        y: v.y - arg.y
      }
    return v
  }

  _Vec.sub = sub

  function mul(v, m) {
    if (isVector2(m))
      return {
        x: v.x * m.x,
        y: v.y * m.y
      }
    else
      return {
        x: v.x * m,
        y: v.y * m
      }
  }

  _Vec.mul = mul

  function div(v, m) {
    if (isVector2(m))
      return {
        x: v.x / m.x,
        y: v.y / m.y
      }
    else
      return {
        x: v.x / m,
        y: v.y / m
      }
  }

  _Vec.div = div

  function sqrt(v) {
    return {
      x: Math.sqrt(v.x),
      y: Math.sqrt(v.y)
    }
  }

  _Vec.sqrt = sqrt

  function exp(v) {
    return {
      x: Math.exp(v.x),
      y: Math.exp(v.y)
    }
  }

  _Vec.exp = exp

  function exp2(v) {
    return {
      x: Math.pow(2, v.x),
      y: Math.pow(2, v.y)
    }
  }

  _Vec.exp2 = exp2

  function log(v) {
    return {
      x: Math.log(v.x),
      y: Math.log(v.y)
    }
  }

  _Vec.log = log

  function log2(v) {
    return {
      x: Math.log2(v.x),
      y: Math.log2(v.y)
    }
  }

  _Vec.log2 = log2

  function log10(v) {
    return {
      x: Math.log10(v.x),
      y: Math.log10(v.y)
    }
  }

  _Vec.log10 = log10

  function pow(v, p) {
    if (isVector2(p))
      return {
        x: Math.pow(v.x, p.x),
        y: Math.pow(v.y, p.y)
      }
    else
      return {
        x: Math.pow(v.x, p),
        y: Math.pow(v.y, p)
      }
  }

  _Vec.pow = pow

  function sin(v) {
    return {
      x: Math.sin(v.x),
      y: Math.sin(v.y)
    }
  }

  _Vec.sin = sin

  function asin(v) {
    return {
      x: Math.asin(v.x),
      y: Math.asin(v.y)
    }
  }

  _Vec.asin = asin

  function sinh(v) {
    return {
      x: Math.sinh(v.x),
      y: Math.sinh(v.y)
    }
  }

  _Vec.sinh = sinh

  function asinh(v) {
    return {
      x: Math.asinh(v.x),
      y: Math.asinh(v.y)
    }
  }

  _Vec.asinh = asinh

  function cos(v) {
    return {
      x: Math.cos(v.x),
      y: Math.cos(v.y)
    }
  }

  _Vec.cos = cos

  function acos(v) {
    return {
      x: Math.acos(v.x),
      y: Math.acos(v.y)
    }
  }

  _Vec.acos = acos

  function cosh(v) {
    return {
      x: Math.cosh(v.x),
      y: Math.cosh(v.y)
    }
  }

  _Vec.cosh = cosh

  function acosh(v) {
    return {
      x: Math.acosh(v.x),
      y: Math.acosh(v.y)
    }
  }

  _Vec.acosh = acosh

  function tan(v) {
    return {
      x: Math.tan(v.x),
      y: Math.tan(v.y)
    }
  }

  _Vec.tan = tan

  function atan(v) {
    return {
      x: Math.atan(v.x),
      y: Math.atan(v.y)
    }
  }

  _Vec.atan = atan

  function tanh(v) {
    return {
      x: Math.tanh(v.x),
      y: Math.tanh(v.y)
    }
  }

  _Vec.tanh = tanh

  function atanh(v) {
    return {
      x: Math.atanh(v.x),
      y: Math.atanh(v.y)
    }
  }

  _Vec.atanh = atanh

  function dot(u, v) {
    return u.x * v.x + u.y * v.y
  }

  _Vec.dot = dot

  function wedge(u, v) {
    return u.x * v.y - u.y * v.x
  }

  _Vec.wedge = wedge

  function length(v) {
    return Math.hypot(v.x, v.y)
  }

  _Vec.length = length

  function normalize(v) {
    return div(v, length(v))
  }

  _Vec.normalize = normalize

  function distance(u, v) {
    return length(sub(u, v))
  }

  _Vec.distance = distance

  function project(u, v) {
    return mul(v, dot(u, v) / dot(v, v))
  }

  _Vec.project = project

  function reject(u, v) {
    return sub(u, project(u, v))
  }

  _Vec.reject = reject

  function reflect(i, n) {
    return sub(i, mul(n, 2 * dot(n, i)))
  }

  _Vec.reflect = reflect

  function refract(i, n, e) {
    const cosi = -dot(i, n)
    const sin2t = e * e * (1 - cosi * cosi)
    const cost = Math.sqrt(1 - sin2t)
    return add(mul(i, e), mul(n, e * cosi - cost))
  }

  _Vec.refract = refract

  function lerp(u, v, t) {
    if (t === 0) return u
    if (t === 1) return v
    return {
      x: u.x + t * (v.x - u.x),
      y: u.y + t * (v.y - u.y)
    }
  }

  _Vec.lerp = lerp

  function slerp(u, v, t) {
    if (t === 0) return u
    if (t === 1) return v
    const cost = dot(u, v)
    const theta = Math.acos(cost)
    const sint = Math.sqrt(1 - cost * cost)
    const tu = Math.sin((1 - t) * theta) / sint
    const tv = Math.sin(t * theta) / sint
    return add(mul(u, tu), mul(v, tv))
  }

  _Vec.slerp = slerp

  function rotate(v, t) {
    const cost = Math.cos(t),
      sint = Math.sin(t)
    const rot = Mat2.from([cost, -sint, sint, cost])
    return Mat2.mul(rot, v)
  }

  _Vec.rotate = rotate
})(Vec2 || (Vec2 = {}))
