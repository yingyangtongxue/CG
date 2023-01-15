const drawLine = (context, start, end) => {
  const dx = Math.abs(end[0] - start[0])
  const dy = Math.abs(end[1] - start[1])
  const m = (end[1] - start[1]) / (end[0] - start[0])
  const now = { x: 0, y: 0 }
  let vertices = []

  if(dx > dy){ drawingX(context, start, end, now, m, vertices) } else { drawingY(context, start, end, now, m,vertices) }
  
  return vertices
} 


const drawingX = (context, start, end, now, m,vertices) => {
  now.x = start[0];
  if (start[0] <= end[0]) {
      let limit = end[0] + 1
      while (now.x < limit) {
          now.y = parseInt(m * (now.x - start[0]) + start[1]); 

          if (!(now.x === end[0] && now.y === end[1])) vertices.push({ x: now.x, y: now.y })

          context.fillRect(now.x, now.y, 1, 1)
          now.x++
      }
  } else {
      while (now.x > end[0]) {
          now.y = parseInt(m * (now.x - start[0]) + start[1])

          if (!(now.x === end[0] && now.y === end[1])) vertices.push({ x: now.x, y: now.y })

          context.fillRect(now.x, now.y, 1, 1)
          now.x--
      }
  }   
}

const drawingY = (context, start, end, now, m,vertices) => {
  now.y = start[1]
  let limit = end[1] + 1
  if (start[1] < limit) {
      while (now.y <= end[1]) {
          now.x = (now.y - start[1]) / m + start[0]    
          
          if (!(now.x === end[0] && now.y === end[1])) vertices.push({ x: now.x, y: now.y })

          context.fillRect(now.x, now.y, 1, 1)
          now.y++
      }
  } else {
      while (now.y > end[1]) {
          now.x = (now.y - start[1]) / m + start[0]

          if (!(now.x === end[0] && now.y === end[1])) vertices.push({ x: now.x, y: now.y })

          context.fillRect(now.x, now.y, 1, 1);
          now.y--
      }
  }   
}

export { drawLine }