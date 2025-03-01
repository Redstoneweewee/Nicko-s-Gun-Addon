import { Direction } from "@minecraft/server"

/**
 * Includes various 3D vector functions and values.
 */
export let Vec3

;(function(_Vec) {
  const Zero = (_Vec.Zero = {
    x: 0,
    y: 0,
    z: 0
  })

  const One = (_Vec.One = {
    x: 1,
    y: 1,
    z: 1
  })

  const Up = (_Vec.Up = {
    x: 0,
    y: 1,
    z: 0
  })

  const Down = (_Vec.Down = {
    x: 0,
    y: -1,
    z: 0
  })

  const North = (_Vec.North = {
    x: 0,
    y: 0,
    z: -1
  })

  const South = (_Vec.South = {
    x: 0,
    y: 0,
    z: 1
  })

  const East = (_Vec.East = {
    x: 1,
    y: 0,
    z: 0
  })

  const West = (_Vec.West = {
    x: -1,
    y: 0,
    z: 0
  })

  const X = (_Vec.X = East)
  const Y = (_Vec.Y = Up)
  const Z = (_Vec.Z = South)

  function isVector3(v) {
    return typeof v === "object" && "x" in v && "y" in v && "z" in v
  }

  _Vec.isVector3 = isVector3

  function from(x, y, z) {
    if (typeof x === "number")
      return {
        x: x,
        y: y ?? x,
        z: z ?? x
      }
    if (Array.isArray(x) && x.length >= 3)
      return {
        x: x[0],
        y: x[1],
        z: x[2]
      }
    throw new Error("Invalid input values for vector construction.")
  }

  _Vec.from = from

  function fromBlockFace(face) {
    switch (face) {
      case "up":
        return Up
      case "down":
        return Down
      case "north":
        return North
      case "south":
        return South
      case "east":
        return East
      case "west":
        return West
    }
    throw new Error(
      "Argument was not of type 'block_face' or 'cardinal_direction'."
    )
  }

  _Vec.fromBlockFace = fromBlockFace

  function toBlockFace(v) {
    return toDirection(v).toLowerCase()
  }

  _Vec.toBlockFace = toBlockFace

  function fromDirection(d) {
    switch (d) {
      case Direction.Up:
        return Up
      case Direction.Down:
        return Down
      case Direction.North:
        return North
      case Direction.South:
        return South
      case Direction.East:
        return East
      case Direction.West:
        return West
    }
  }

  _Vec.fromDirection = fromDirection

  function toDirection(v) {
    const a = abs(v),
      max = Math.max(a.x, a.y, a.z)
    if (max === a.x) return v.x >= 0 ? Direction.East : Direction.West
    else if (max === a.y) return v.y >= 0 ? Direction.Up : Direction.Down
    else return v.z >= 0 ? Direction.South : Direction.North
  }

  _Vec.toDirection = toDirection

  function fromRGB(c) {
    return {
      x: c.red,
      y: c.green,
      z: c.blue
    }
  }

  _Vec.fromRGB = fromRGB

  function toRGB(v) {
    return {
      red: v.x,
      green: v.y,
      blue: v.z
    }
  }

  _Vec.toRGB = toRGB

  function toRotation(v) {
    return {
      x: -degrees(Math.asin(v.y)),
      y: -degrees(Math.atan2(v.x, v.z))
    }
  }

  _Vec.toRotation = toRotation
  function degrees(radians) {
    return (180 * radians) / Math.PI
  }

  function toArray(v) {
    const { x, y, z } = v
    return [x, y, z]
  }

  _Vec.toArray = toArray

  function toString(v) {
    return toArray(v).join(" ")
  }

  _Vec.toString = toString

  function parse(s) {
    const [x, y, z] = s.split(" ").map(Number)
    return {
      x,
      y,
      z
    }
  }

  _Vec.parse = parse

  function isNaN(v) {
    return Number.isNaN(v.x) || Number.isNaN(v.y) || Number.isNaN(v.z)
  }

  _Vec.isNaN = isNaN

  function isInf(v) {
    return !isFinite(v)
  }

  _Vec.isInf = isInf

  function isFinite(v) {
    return Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z)
  }

  _Vec.isFinite = isFinite

  function any(v) {
    return v.x !== 0 || v.y !== 0 || v.z !== 0
  }

  _Vec.any = any

  function all(v) {
    return v.x !== 0 && v.y !== 0 && v.z !== 0
  }

  _Vec.all = all

  function greaterThan(u, v) {
    return {
      x: u.x > v.x ? 1 : 0,
      y: u.y > v.y ? 1 : 0,
      z: u.z > v.z ? 1 : 0
    }
  }

  _Vec.greaterThan = greaterThan

  function lessThan(u, v) {
    return {
      x: u.x < v.x ? 1 : 0,
      y: u.y < v.y ? 1 : 0,
      z: u.z < v.z ? 1 : 0
    }
  }

  _Vec.lessThan = lessThan

  function greaterEqual(u, v) {
    return {
      x: u.x >= v.x ? 1 : 0,
      y: u.y >= v.y ? 1 : 0,
      z: u.z >= v.z ? 1 : 0
    }
  }

  _Vec.greaterEqual = greaterEqual

  function lessEqual(u, v) {
    return {
      x: u.x <= v.x ? 1 : 0,
      y: u.y <= v.y ? 1 : 0,
      z: u.z <= v.z ? 1 : 0
    }
  }

  _Vec.lessEqual = lessEqual

  function equal(u, v) {
    return u.x === v.x && u.y === v.y && u.z === v.z
  }

  _Vec.equal = equal

  function min(u, v) {
    return {
      x: Math.min(u.x, v.x),
      y: Math.min(u.y, v.y),
      z: Math.min(u.z, v.z)
    }
  }

  _Vec.min = min

  function max(u, v) {
    return {
      x: Math.max(u.x, v.x),
      y: Math.max(u.y, v.y),
      z: Math.max(u.z, v.z)
    }
  }

  _Vec.max = max

  function clamp(v, min, max) {
    return {
      x: Math.min(Math.max(v.x, min.x), max.x),
      y: Math.min(Math.max(v.y, min.y), max.y),
      z: Math.min(Math.max(v.z, min.z), max.z)
    }
  }

  _Vec.clamp = clamp

  function saturate(v) {
    return {
      x: Math.min(Math.max(v.x, 0), 1),
      y: Math.min(Math.max(v.y, 0), 1),
      z: Math.min(Math.max(v.z, 0), 1)
    }
  }

  _Vec.saturate = saturate

  function sign(v) {
    return {
      x: Math.sign(v.x),
      y: Math.sign(v.y),
      z: Math.sign(v.z)
    }
  }

  _Vec.sign = sign

  function floor(v) {
    return {
      x: Math.floor(v.x),
      y: Math.floor(v.y),
      z: Math.floor(v.z)
    }
  }

  _Vec.floor = floor

  function ceil(v) {
    return {
      x: Math.ceil(v.x),
      y: Math.ceil(v.y),
      z: Math.ceil(v.z)
    }
  }

  _Vec.ceil = ceil

  function frac(v) {
    return {
      x: v.x - Math.floor(v.x),
      y: v.y - Math.floor(v.y),
      z: v.z - Math.floor(v.z)
    }
  }

  _Vec.frac = frac

  function round(v) {
    return {
      x: Math.round(v.x),
      y: Math.round(v.y),
      z: Math.round(v.z)
    }
  }

  _Vec.round = round

  function mod(u, v) {
    return {
      x: u.x % v.x,
      y: u.y % v.y,
      z: u.z % v.z
    }
  }

  _Vec.mod = mod

  function neg(v) {
    return {
      x: -v.x,
      y: -v.y,
      z: -v.z
    }
  }

  _Vec.neg = neg

  function abs(v) {
    return {
      x: Math.abs(v.x),
      y: Math.abs(v.y),
      z: Math.abs(v.z)
    }
  }

  _Vec.abs = abs

  function add(v, ...args) {
    for (const arg of args)
      v = {
        x: v.x + arg.x,
        y: v.y + arg.y,
        z: v.z + arg.z
      }
    return v
  }

  _Vec.add = add

  function sub(v, ...args) {
    for (const arg of args)
      v = {
        x: v.x - arg.x,
        y: v.y - arg.y,
        z: v.z - arg.z
      }
    return v
  }

  _Vec.sub = sub

  function mul(v, m) {
    if (isVector3(m))
      return {
        x: v.x * m.x,
        y: v.y * m.y,
        z: v.z * m.z
      }
    else
      return {
        x: v.x * m,
        y: v.y * m,
        z: v.z * m
      }
  }

  _Vec.mul = mul

  function div(v, m) {
    if (isVector3(m))
      return {
        x: v.x / m.x,
        y: v.y / m.y,
        z: v.z / m.z
      }
    else
      return {
        x: v.x / m,
        y: v.y / m,
        z: v.z / m
      }
  }

  _Vec.div = div

  function sqrt(v) {
    return {
      x: Math.sqrt(v.x),
      y: Math.sqrt(v.y),
      z: Math.sqrt(v.z)
    }
  }

  _Vec.sqrt = sqrt

  function exp(v) {
    return {
      x: Math.exp(v.x),
      y: Math.exp(v.y),
      z: Math.exp(v.z)
    }
  }

  _Vec.exp = exp

  function exp2(v) {
    return {
      x: Math.pow(2, v.x),
      y: Math.pow(2, v.y),
      z: Math.pow(2, v.z)
    }
  }

  _Vec.exp2 = exp2

  function log(v) {
    return {
      x: Math.log(v.x),
      y: Math.log(v.y),
      z: Math.log(v.z)
    }
  }

  _Vec.log = log

  function log2(v) {
    return {
      x: Math.log2(v.x),
      y: Math.log2(v.y),
      z: Math.log2(v.z)
    }
  }

  _Vec.log2 = log2

  function log10(v) {
    return {
      x: Math.log10(v.x),
      y: Math.log10(v.y),
      z: Math.log10(v.z)
    }
  }

  _Vec.log10 = log10

  function pow(v, p) {
    if (isVector3(p))
      return {
        x: Math.pow(v.x, p.x),
        y: Math.pow(v.y, p.y),
        z: Math.pow(v.z, p.z)
      }
    else
      return {
        x: Math.pow(v.x, p),
        y: Math.pow(v.y, p),
        z: Math.pow(v.z, p)
      }
  }

  _Vec.pow = pow

  function sin(v) {
    return {
      x: Math.sin(v.x),
      y: Math.sin(v.y),
      z: Math.sin(v.z)
    }
  }

  _Vec.sin = sin

  function asin(v) {
    return {
      x: Math.asin(v.x),
      y: Math.asin(v.y),
      z: Math.asin(v.z)
    }
  }

  _Vec.asin = asin

  function sinh(v) {
    return {
      x: Math.sinh(v.x),
      y: Math.sinh(v.y),
      z: Math.sinh(v.z)
    }
  }

  _Vec.sinh = sinh

  function asinh(v) {
    return {
      x: Math.asinh(v.x),
      y: Math.asinh(v.y),
      z: Math.asinh(v.z)
    }
  }

  _Vec.asinh = asinh

  function cos(v) {
    return {
      x: Math.cos(v.x),
      y: Math.cos(v.y),
      z: Math.cos(v.z)
    }
  }

  _Vec.cos = cos

  function acos(v) {
    return {
      x: Math.acos(v.x),
      y: Math.acos(v.y),
      z: Math.acos(v.z)
    }
  }

  _Vec.acos = acos

  function cosh(v) {
    return {
      x: Math.cosh(v.x),
      y: Math.cosh(v.y),
      z: Math.cosh(v.z)
    }
  }

  _Vec.cosh = cosh

  function acosh(v) {
    return {
      x: Math.acosh(v.x),
      y: Math.acosh(v.y),
      z: Math.acosh(v.z)
    }
  }

  _Vec.acosh = acosh

  function tan(v) {
    return {
      x: Math.tan(v.x),
      y: Math.tan(v.y),
      z: Math.tan(v.z)
    }
  }

  _Vec.tan = tan

  function atan(v) {
    return {
      x: Math.atan(v.x),
      y: Math.atan(v.y),
      z: Math.atan(v.z)
    }
  }

  _Vec.atan = atan

  function tanh(v) {
    return {
      x: Math.tanh(v.x),
      y: Math.tanh(v.y),
      z: Math.tanh(v.z)
    }
  }

  _Vec.tanh = tanh

  function atanh(v) {
    return {
      x: Math.atanh(v.x),
      y: Math.atanh(v.y),
      z: Math.atanh(v.z)
    }
  }

  _Vec.atanh = atanh

  function above(v, s = 1) {
    return add(v, mul(Up, s))
  }

  _Vec.above = above

  function below(v, s = 1) {
    return add(v, mul(Down, s))
  }

  _Vec.below = below

  function north(v, s = 1) {
    return add(v, mul(North, s))
  }

  _Vec.north = north

  function south(v, s = 1) {
    return add(v, mul(South, s))
  }

  _Vec.south = south

  function east(v, s = 1) {
    return add(v, mul(East, s))
  }

  _Vec.east = east

  function west(v, s = 1) {
    return add(v, mul(West, s))
  }

  _Vec.west = west

  function dot(u, v) {
    return u.x * v.x + u.y * v.y + u.z * v.z
  }

  _Vec.dot = dot

  function cross(u, v) {
    return {
      x: u.y * v.z - u.z * v.y,
      y: u.z * v.x - u.x * v.z,
      z: u.x * v.y - u.y * v.x
    }
  }

  _Vec.cross = cross

  function length(v) {
    return Math.hypot(v.x, v.y, v.z)
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

  function refract(i, n, eta) {
    const cosi = -dot(i, n)
    const sin2t = eta * eta * (1 - cosi * cosi)
    const cost = Math.sqrt(1 - sin2t)
    return add(mul(i, eta), mul(n, eta * cosi - cost))
  }

  _Vec.refract = refract

  function lerp(u, v, t) {
    if (t === 0) return u
    if (t === 1) return v
    return {
      x: u.x + t * (v.x - u.x),
      y: u.y + t * (v.y - u.y),
      z: u.z + t * (v.z - u.z)
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

  function rotate(v, k, t) {
    const cost = Math.cos(t),
      sint = Math.sin(t)
    const par = mul(k, dot(v, k)),
      per = sub(v, par),
      kxv = cross(k, v)
    return add(par, add(mul(per, cost), mul(kxv, sint)))
  }

  _Vec.rotate = rotate
})(Vec3 || (Vec3 = {}))
