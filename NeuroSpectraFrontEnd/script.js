document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      if (hamburger && hamburger.classList.contains("active")) {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      }

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Demo Section Functionality
  const dataButtons = document.querySelectorAll(".data-btn")
  const analyzeBtn = document.getElementById("analyze-btn")
  const analysisResults = document.getElementById("analysis-results")
  const canvas = document.getElementById("demo-canvas")

  if (dataButtons && analyzeBtn && analysisResults && canvas) {
    // Set up canvas
    const ctx = canvas.getContext("2d")
    canvas.width = canvas.parentElement.clientWidth
    canvas.height = canvas.parentElement.clientHeight

    // Initialize demo visualization
    drawInitialVisualization(ctx, canvas.width, canvas.height)

    // Data type selection
    dataButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        dataButtons.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")

        // Update visualization based on selected data type
        const dataType = btn.getAttribute("data-type")
        updateVisualization(ctx, canvas.width, canvas.height, dataType)
      })
    })

    // Analyze button click
    analyzeBtn.addEventListener("click", () => {
      // Show loading animation
      showLoadingAnimation(ctx, canvas.width, canvas.height)

      // Simulate analysis process
      setTimeout(() => {
        const activeDataType = document.querySelector(".data-btn.active").getAttribute("data-type")
        const selectedAge = document.getElementById("age").value

        // Show results
        analysisResults.classList.remove("hidden")

        // Animate progress bars
        animateProgressBar("pattern-progress", "pattern-value", getRandomValue(65, 95))
        animateProgressBar("correlation-progress", "correlation-value", getRandomValue(70, 90))
        animateProgressBar("confidence-progress", "confidence-value", getRandomValue(60, 85))

        // Update result text
        updateResultText(activeDataType, selectedAge)

        // Draw final visualization
        drawResultVisualization(ctx, canvas.width, canvas.height, activeDataType)
      }, 2000)
    })
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Validate form (simple validation)
      if (!name || !email || !message) {
        alert("Please fill in all required fields.")
        return
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      submitBtn.disabled = true
      submitBtn.textContent = "Sending..."

      setTimeout(() => {
        alert("Thank you for your message! We will get back to you soon.")
        contactForm.reset()
        submitBtn.disabled = false
        submitBtn.textContent = "Send Message"
      }, 1500)
    })
  }
})

// Demo Visualization Functions
function drawInitialVisualization(ctx, width, height) {
  ctx.clearRect(0, 0, width, height)

  // Draw background grid
  ctx.strokeStyle = "#e0e0e0"
  ctx.lineWidth = 1

  const gridSize = 30
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }

  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // Draw instruction text
  ctx.fillStyle = "#666"
  ctx.font = "16px Arial"
  ctx.textAlign = "center"
  ctx.fillText('Select data type and click "Analyze Data" to see the AI in action', width / 2, height / 2)
}

function updateVisualization(ctx, width, height, dataType) {
  ctx.clearRect(0, 0, width, height)

  // Draw background grid
  ctx.strokeStyle = "#e0e0e0"
  ctx.lineWidth = 1

  const gridSize = 30
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }

  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // Draw data type specific visualization
  ctx.fillStyle = "#666"
  ctx.font = "16px Arial"
  ctx.textAlign = "center"

  let dataTypeText = ""
  switch (dataType) {
    case "behavioral":
      dataTypeText = "Behavioral Data Analysis"
      drawBehavioralPreview(ctx, width, height)
      break
    case "visual":
      dataTypeText = "Visual Data Analysis"
      drawVisualPreview(ctx, width, height)
      break
    case "neurological":
      dataTypeText = "Neurological Data Analysis"
      drawNeurologicalPreview(ctx, width, height)
      break
    default:
      dataTypeText = 'Select data type and click "Analyze Data"'
  }

  ctx.fillText(dataTypeText, width / 2, 30)
}

function drawBehavioralPreview(ctx, width, height) {
  // Draw behavioral data preview (simplified representation)
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) / 4

  // Draw radar chart background
  ctx.beginPath()
  ctx.strokeStyle = "#ccc"
  ctx.fillStyle = "rgba(106, 76, 147, 0.1)"

  for (let i = 3; i <= 6; i++) {
    ctx.beginPath()
    ctx.arc(centerX, centerY, (radius * i) / 6, 0, Math.PI * 2)
    ctx.stroke()
  }

  // Draw radar chart axes
  const categories = 6
  ctx.strokeStyle = "#999"

  for (let i = 0; i < categories; i++) {
    const angle = (Math.PI * 2 * i) / categories
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
    ctx.stroke()

    // Draw category labels
    ctx.fillStyle = "#666"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"
    ctx.fillText(
      ["Social", "Communication", "Repetitive", "Sensory", "Attention", "Play"][i],
      centerX + (radius + 20) * Math.cos(angle),
      centerY + (radius + 20) * Math.sin(angle),
    )
  }

  // Draw "Click Analyze" text
  ctx.fillStyle = "#6a4c93"
  ctx.font = "14px Arial"
  ctx.textAlign = "center"
  ctx.fillText('Click "Analyze Data" to process behavioral patterns', centerX, height - 30)
}

function drawVisualPreview(ctx, width, height) {
  // Draw visual data preview (eye tracking heatmap simulation)
  const centerX = width / 2
  const centerY = height / 2

  // Draw face outline
  ctx.beginPath()
  ctx.arc(centerX, centerY - 30, 80, 0, Math.PI * 2)
  ctx.strokeStyle = "#ccc"
  ctx.stroke()

  // Draw eyes
  ctx.beginPath()
  ctx.arc(centerX - 30, centerY - 50, 15, 0, Math.PI * 2)
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(centerX + 30, centerY - 50, 15, 0, Math.PI * 2)
  ctx.stroke()

  // Draw mouth
  ctx.beginPath()
  ctx.arc(centerX, centerY, 30, 0.2 * Math.PI, 0.8 * Math.PI)
  ctx.stroke()

  // Draw heatmap points (semi-transparent)
  const points = [
    { x: centerX - 30, y: centerY - 50, r: 20 },
    { x: centerX + 30, y: centerY - 50, r: 20 },
    { x: centerX, y: centerY - 20, r: 15 },
    { x: centerX, y: centerY + 20, r: 10 },
  ]

  for (const point of points) {
    const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.r)
    gradient.addColorStop(0, "rgba(255, 0, 0, 0.3)")
    gradient.addColorStop(1, "rgba(255, 0, 0, 0)")

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2)
    ctx.fill()
  }

  // Draw "Click Analyze" text
  ctx.fillStyle = "#6a4c93"
  ctx.font = "14px Arial"
  ctx.textAlign = "center"
  ctx.fillText('Click "Analyze Data" to process visual attention patterns', centerX, height - 30)
}

function drawNeurologicalPreview(ctx, width, height) {
  // Draw neurological data preview (brain activity simulation)
  const centerX = width / 2
  const centerY = height / 2

  // Draw brain outline
  ctx.beginPath()
  ctx.ellipse(centerX, centerY, 100, 80, 0, 0, Math.PI * 2)
  ctx.strokeStyle = "#ccc"
  ctx.stroke()

  // Draw brain sections
  ctx.beginPath()
  ctx.moveTo(centerX - 100, centerY)
  ctx.lineTo(centerX + 100, centerY)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(centerX, centerY - 80)
  ctx.lineTo(centerX, centerY + 80)
  ctx.stroke()

  // Draw activity points
  const regions = [
    { x: centerX - 50, y: centerY - 30, color: "rgba(25, 130, 196, 0.3)" },
    { x: centerX + 50, y: centerY - 30, color: "rgba(25, 130, 196, 0.3)" },
    { x: centerX - 30, y: centerY + 40, color: "rgba(138, 201, 38, 0.3)" },
    { x: centerX + 30, y: centerY + 40, color: "rgba(138, 201, 38, 0.3)" },
  ]

  for (const region of regions) {
    const gradient = ctx.createRadialGradient(region.x, region.y, 0, region.x, region.y, 30)
    gradient.addColorStop(0, region.color)
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(region.x, region.y, 30, 0, Math.PI * 2)
    ctx.fill()
  }

  // Draw EEG-like lines
  ctx.strokeStyle = "#999"
  ctx.beginPath()
  ctx.moveTo(width / 4, height - 50)

  for (let x = width / 4; x < (width * 3) / 4; x += 5) {
    const y = height - 50 + Math.sin((x - width / 4) / 10) * 10
    ctx.lineTo(x, y)
  }

  ctx.stroke()

  // Draw "Click Analyze" text
  ctx.fillStyle = "#6a4c93"
  ctx.font = "14px Arial"
  ctx.textAlign = "center"
  ctx.fillText('Click "Analyze Data" to process neurological patterns', centerX, height - 30)
}

function showLoadingAnimation(ctx, width, height) {
  ctx.clearRect(0, 0, width, height)

  // Draw loading text
  ctx.fillStyle = "#6a4c93"
  ctx.font = "18px Arial"
  ctx.textAlign = "center"
  ctx.fillText("Analyzing data...", width / 2, height / 2 - 20)

  // Draw loading spinner
  const centerX = width / 2
  const centerY = height / 2 + 20
  const radius = 20

  let startAngle = 0

  function drawSpinner() {
    ctx.clearRect(centerX - radius - 10, centerY - radius - 10, radius * 2 + 20, radius * 2 + 20)

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + Math.PI * 1.5)
    ctx.strokeStyle = "#6a4c93"
    ctx.lineWidth = 4
    ctx.stroke()

    startAngle += 0.1

    if (document.getElementById("analysis-results").classList.contains("hidden")) {
      requestAnimationFrame(drawSpinner)
    }
  }

  drawSpinner()
}

function drawResultVisualization(ctx, width, height, dataType) {
  ctx.clearRect(0, 0, width, height)

  // Draw background
  ctx.fillStyle = "#f8f9fa"
  ctx.fillRect(0, 0, width, height)

  // Draw title
  ctx.fillStyle = "#6a4c93"
  ctx.font = "bold 18px Arial"
  ctx.textAlign = "center"
  ctx.fillText(`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} Data Analysis Results`, width / 2, 30)

  // Draw visualization based on data type
  switch (dataType) {
    case "behavioral":
      drawBehavioralResults(ctx, width, height)
      break
    case "visual":
      drawVisualResults(ctx, width, height)
      break
    case "neurological":
      drawNeurologicalResults(ctx, width, height)
      break
  }
}

function drawBehavioralResults(ctx, width, height) {
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) / 4

  // Draw radar chart background
  ctx.beginPath()
  ctx.strokeStyle = "#ccc"
  ctx.fillStyle = "rgba(106, 76, 147, 0.1)"

  for (let i = 3; i <= 6; i++) {
    ctx.beginPath()
    ctx.arc(centerX, centerY, (radius * i) / 6, 0, Math.PI * 2)
    ctx.stroke()
  }

  // Draw radar chart axes
  const categories = 6
  ctx.strokeStyle = "#999"

  for (let i = 0; i < categories; i++) {
    const angle = (Math.PI * 2 * i) / categories
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
    ctx.stroke()

    // Draw category labels
    ctx.fillStyle = "#666"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"
    ctx.fillText(
      ["Social", "Communication", "Repetitive", "Sensory", "Attention", "Play"][i],
      centerX + (radius + 20) * Math.cos(angle),
      centerY + (radius + 20) * Math.sin(angle),
    )
  }

  // Draw data points
  const dataPoints = [0.4, 0.3, 0.8, 0.7, 0.5, 0.3]
  ctx.beginPath()

  for (let i = 0; i < categories; i++) {
    const angle = (Math.PI * 2 * i) / categories
    const value = dataPoints[i]
    const x = centerX + radius * value * Math.cos(angle)
    const y = centerY + radius * value * Math.sin(angle)

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }

    // Draw point
    ctx.fillStyle = "#6a4c93"
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, Math.PI * 2)
    ctx.fill()
  }

  // Close the path and fill
  ctx.closePath()
  ctx.fillStyle = "rgba(106, 76, 147, 0.3)"
  ctx.fill()
  ctx.strokeStyle = "#6a4c93"
  ctx.lineWidth = 2
  ctx.stroke()

  // Draw legend
  ctx.fillStyle = "#333"
  ctx.font = "14px Arial"
  ctx.textAlign = "left"
  ctx.fillText(
    "Pattern indicates potential ASD markers in repetitive behaviors and sensory processing",
    20,
    height - 20,
  )
}

function drawVisualResults(ctx, width, height) {
  // Draw heatmap visualization
  const centerX = width / 2
  const centerY = height / 2

  // Draw face image (simplified)
  ctx.beginPath()
  ctx.arc(centerX, centerY - 30, 80, 0, Math.PI * 2)
  ctx.strokeStyle = "#ccc"
  ctx.stroke()

  // Draw eyes
  ctx.beginPath()
  ctx.arc(centerX - 30, centerY - 50, 15, 0, Math.PI * 2)
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(centerX + 30, centerY - 50, 15, 0, Math.PI * 2)
  ctx.stroke()

  // Draw mouth
  ctx.beginPath()
  ctx.arc(centerX, centerY, 30, 0.2 * Math.PI, 0.8 * Math.PI)
  ctx.stroke()

  // Draw heatmap
  const heatmapData = [
    { x: centerX - 30, y: centerY - 50, r: 25, intensity: 0.8 }, // Left eye
    { x: centerX + 30, y: centerY - 50, r: 15, intensity: 0.4 }, // Right eye
    { x: centerX, y: centerY - 90, r: 20, intensity: 0.6 }, // Forehead
    { x: centerX - 60, y: centerY - 20, r: 30, intensity: 0.7 }, // Left cheek
  ]

  for (const point of heatmapData) {
    const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.r)
    gradient.addColorStop(0, `rgba(255, 0, 0, ${point.intensity})`)
    gradient.addColorStop(1, "rgba(255, 0, 0, 0)")

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2)
    ctx.fill()
  }

  // Draw analysis notes
  ctx.fillStyle = "#333"
  ctx.font = "14px Arial"
  ctx.textAlign = "left"
  ctx.fillText("Atypical visual attention patterns detected - focus on peripheral features", 20, height - 40)
  ctx.fillText("Reduced eye contact and social gaze patterns observed", 20, height - 20)
}

function drawNeurologicalResults(ctx, width, height) {
  const centerX = width / 2
  const centerY = height / 2 - 30

  // Draw brain outline
  ctx.beginPath()
  ctx.ellipse(centerX, centerY, 100, 80, 0, 0, Math.PI * 2)
  ctx.strokeStyle = "#ccc"
  ctx.stroke()

  // Draw brain sections
  ctx.beginPath()
  ctx.moveTo(centerX - 100, centerY)
  ctx.lineTo(centerX + 100, centerY)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(centerX, centerY - 80)
  ctx.lineTo(centerX, centerY + 80)
  ctx.stroke()

  // Draw activity regions
  const regions = [
    { x: centerX - 50, y: centerY - 30, r: 30, color: "rgba(255, 0, 0, 0.4)" },
    { x: centerX + 50, y: centerY - 30, r: 20, color: "rgba(255, 165, 0, 0.4)" },
    { x: centerX - 30, y: centerY + 40, r: 25, color: "rgba(255, 255, 0, 0.4)" },
    { x: centerX + 30, y: centerY + 40, r: 35, color: "rgba(0, 128, 0, 0.4)" },
  ]

  for (const region of regions) {
    const gradient = ctx.createRadialGradient(region.x, region.y, 0, region.x, region.y, region.r)
    gradient.addColorStop(0, region.color)
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(region.x, region.y, region.r, 0, Math.PI * 2)
    ctx.fill()
  }

  // Draw EEG graph
  const graphY = centerY + 120
  const graphHeight = 60
  const graphWidth = width - 100

  // Draw axes
  ctx.strokeStyle = "#999"
  ctx.beginPath()
  ctx.moveTo(50, graphY - graphHeight)
  ctx.lineTo(50, graphY + 10)
  ctx.lineTo(50 + graphWidth, graphY + 10)
  ctx.stroke()

  // Draw EEG line
  ctx.beginPath()
  ctx.moveTo(50, graphY)

  for (let x = 0; x < graphWidth; x += 2) {
    const normalPattern = Math.sin(x / 10) * 10
    const anomalyPattern = x > graphWidth / 2 ? Math.sin(x / 5) * 15 : 0
    const y = graphY + normalPattern + anomalyPattern
    ctx.lineTo(50 + x, y)
  }

  ctx.strokeStyle = "#6a4c93"
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Draw analysis notes
  ctx.fillStyle = "#333"
  ctx.font = "14px Arial"
  ctx.textAlign = "left"
  ctx.fillText("Atypical neural activity detected in temporal and frontal regions", 20, height - 40)
  ctx.fillText("EEG patterns show characteristic differences in processing social stimuli", 20, height - 20)
}

function updateResultText(dataType, age) {
  const resultText = document.getElementById("result-text")

  if (resultText) {
    let text = ""

    switch (dataType) {
      case "behavioral":
        text = "Analysis indicates potential ASD markers in repetitive behaviors and sensory processing. "
        text += "The pattern shows reduced social interaction and communication scores typical of ASD. "
        text += "Recommend further clinical evaluation."
        break
      case "visual":
        text = "Visual attention analysis shows atypical gaze patterns with reduced focus on social cues. "
        text += "Eye-tracking data indicates preference for peripheral rather than central facial features. "
        text += "This pattern is consistent with early ASD indicators."
        break
      case "neurological":
        text = "Neural activity analysis shows atypical patterns in regions associated with social processing. "
        text += "EEG data indicates differences in response to social stimuli compared to typical development. "
        text += "These patterns correlate with potential ASD biomarkers."
        break
    }

    resultText.textContent = text
  }
}

function animateProgressBar(progressId, valueId, targetValue) {
  const progressBar = document.getElementById(progressId)
  const valueElement = document.getElementById(valueId)

  if (progressBar && valueElement) {
    let currentValue = 0
    const duration = 1500 // ms
    const interval = 20 // ms
    const steps = duration / interval
    const increment = targetValue / steps

    const animation = setInterval(() => {
      currentValue += increment

      if (currentValue >= targetValue) {
        currentValue = targetValue
        clearInterval(animation)
      }

      progressBar.style.width = `${currentValue}%`
      valueElement.textContent = `${Math.round(currentValue)}%`
    }, interval)
  }
}

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

