/**
 * Includes various methods for generating random vectors from different distributions.
 */
export let RandVec

;(function(_RandVec) {
  function random2() {
    return {
      x: Math.random(),
      y: Math.random()
    }
  }

  _RandVec.random2 = random2

  function random3() {
    return {
      x: Math.random(),
      y: Math.random(),
      z: Math.random()
    }
  }

  _RandVec.random3 = random3

  function circle() {
    const phi = Math.random() * Math.PI * 2
    return {
      x: Math.cos(phi),
      y: Math.sin(phi)
    }
  }

  _RandVec.circle = circle

  function disk() {
    const rand = random2()
    const phi = rand.x * Math.PI * 2
    const radius = Math.sqrt(rand.y)
    return {
      x: radius * Math.cos(phi),
      y: radius * Math.sin(phi)
    }
  }

  _RandVec.disk = disk

  function sphere() {
    const rand = random2()
    const phi = rand.x * Math.PI * 2
    const sint = 2 * Math.sqrt(rand.y * (1 - rand.y))
    return {
      x: Math.cos(phi) * sint,
      y: 1 - 2 * rand.y,
      z: Math.sin(phi) * sint
    }
  }

  _RandVec.sphere = sphere

  function hemisphere() {
    const rand = random2()
    const phi = rand.x * Math.PI * 2
    const sint = Math.sqrt(rand.y * (2 - rand.y))
    return {
      x: Math.cos(phi) * sint,
      y: 1 - rand.y,
      z: Math.sin(phi) * sint
    }
  }

  _RandVec.hemisphere = hemisphere

  function cosHemisphere() {
    const rand = random2()
    const phi = rand.x * Math.PI * 2
    const sint = Math.sqrt(rand.y)
    return {
      x: Math.cos(phi) * sint,
      y: Math.sqrt(1 - rand.y),
      z: Math.sin(phi) * sint
    }
  }

  _RandVec.cosHemisphere = cosHemisphere

  function cap(t) {
    const rand = random2()
    const phi = rand.x * Math.PI * 2
    const u = rand.y * (1 - Math.cos(t))
    const sint = Math.sqrt(u * (2 - u))
    return {
      x: Math.cos(phi) * sint,
      y: 1 - u,
      z: Math.sin(phi) * sint
    }
  }

  _RandVec.cap = cap
})(RandVec || (RandVec = {}))
