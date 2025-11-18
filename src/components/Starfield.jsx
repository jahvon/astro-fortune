import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    let scene, camera, renderer, stars
    let mouseX = 0, mouseY = 0

    const initStarfield = () => {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 5

      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)

      // Create particles
      const starGeometry = new THREE.BufferGeometry()
      const starCount = 3000
      const positions = new Float32Array(starCount * 3)
      const colors = new Float32Array(starCount * 3)

      for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100
        positions[i + 1] = (Math.random() - 0.5) * 100
        positions[i + 2] = (Math.random() - 0.5) * 100

        // Purple/blue color palette
        colors[i] = 0.5 + Math.random() * 0.5     // R
        colors[i + 1] = 0.3 + Math.random() * 0.4 // G
        colors[i + 2] = 0.8 + Math.random() * 0.2 // B
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const starMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
      })

      stars = new THREE.Points(starGeometry, starMaterial)
      scene.add(stars)
    }

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate stars slowly
      stars.rotation.y += 0.0002
      stars.rotation.x += 0.0001

      // Parallax effect
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    initStarfield()
    animate()

    document.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} id="starfield" />
}
