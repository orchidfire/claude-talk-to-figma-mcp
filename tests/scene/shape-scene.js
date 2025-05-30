import { randomColor } from "../helper.js";
import { channel, runStep, ws } from "../test-runner.js";


/**
 * Applies horizontal auto-layout to a frame with wrapping and consistent spacing.
 * Configures padding, gaps, and sizing behavior for optimal shape arrangement.
 * @param {string} frameId - The Figma frame ID to apply auto-layout to
 * @returns {Promise} Test result object
 * @example
 * const result = await apply_autolayout('frame123');
 * if (result.pass) console.log('Auto-layout applied successfully');
 */
function apply_autolayout(frameId) {
  const params = {
    layout: {
      nodeId: frameId,
      mode: 'HORIZONTAL',
      itemSpacing: 20, // Horizontal gap between items
      counterAxisSpacing: 30, // Vertical gap between rows when wrapping
      paddingLeft: 10, // Horizontal padding
      paddingRight: 10, // Horizontal padding
      paddingTop: 15, // Vertical padding
      paddingBottom: 15, // Vertical padding
      primaryAxisSizing: 'FIXED',
      layoutWrap: 'WRAP'
    }
  };
  return runStep({
    ws, channel,
    command: 'set_auto_layout',
    params: params,
    assert: (response) => ({ 
      pass: response && response['0'] && response['0'].success === true && response['0'].nodeId === frameId,
      response 
    }),
    label: `apply_autolayout to frame ${frameId}`
  });
}


/**
 * Creates a main container frame for shape demonstrations with random styling.
 * @param {string} [parentId] - Optional parent frame ID for hierarchical organization
 * @returns {Promise} Test result with frame creation status
 * @example
 * const frameResult = await create_frame('parent123');
 * const frameId = frameResult.response?.ids?.[0];
 */
function create_frame(parentId) {
  const params = {
    x: 50, y: 100, width: 500, height: 300,
    name: 'Main Frame',
    fillColor: randomColor(),
    strokeColor: randomColor(),
    strokeWeight: Math.floor(Math.random() * 8) + 1,
    ...(parentId && { parentId })
  };
  return runStep({
    ws, channel,
    command: 'create_frame',
    params: { frame: params },
    assert: (response) => ({ pass: Array.isArray(response.ids) && response.ids.length > 0, response }),
    label: `create_frame (${params.name})`
  });
}

/**
 * Creates a rectangle shape with random styling and positioning.
 * @param {string|null} [parentId=null] - Optional parent frame ID for containment
 * @returns {Promise} Test result with rectangle creation status
 * @example
 * const rectResult = await create_rectangle('frame123');
 * const rectId = rectResult.response?.ids?.[0];
 */
function create_rectangle(parentId = null) {
  const params = {
    x: parentId ? 20 : 0, // Use relative coordinates if inside a parent
    y: parentId ? 20 : 0,
    width: 120, height: 80,
    name: 'UnitTestRectangle',
    cornerRadius: 12,
    fillColor: randomColor(),
    strokeColor: randomColor(),
    strokeWeight: Math.floor(Math.random() * 8) + 1
  };
  
  // Add parentId if provided
  if (parentId) {
    params.parentId = parentId;
  }
  
  return runStep({
    ws, channel,
    command: 'create_rectangle',
    params: { rectangle: params },
    assert: (response) => ({ pass: Array.isArray(response.ids) && response.ids.length > 0, response }),
    label: `create_rectangle (${params.name})`
  });
}

/**
 * Helper to create an ellipse in Figma for shape tests.
 * @param {string} parentId - Optional parent frame ID to place the ellipse inside
 * @returns {Promise<{label:string, pass:boolean, reason?:string, response:any}>}
 */
function create_ellipse(parentId = null) {
  const params = {
    x: parentId ? 30 : 50, // Use relative coordinates if inside a parent
    y: parentId ? 30 : 50,
    width: 100, height: 100,
    name: 'UnitTestEllipse',
    fillColor: randomColor(),
    strokeColor: randomColor(),
    strokeWeight: Math.floor(Math.random() * 8) + 1
  };
  
  // Add parentId if provided
  if (parentId) {
    params.parentId = parentId;
  }
  
  return runStep({
    ws, channel,
    command: 'create_ellipse',
    params: { ellipse: params },
    assert: (response) => ({ pass: Array.isArray(response.ids) && response.ids.length > 0, response }),
    label: `create_ellipse (${params.name})`
  });
}

/**
 * Helper to create a hexagon in Figma for shape tests.
 * @param {string} parentId - Optional parent frame ID to place the hexagon inside
 * @returns {Promise<{label:string, pass:boolean, reason?:string, response:any}>}
 */
function create_hexagon(parentId = null) {
  const params = {
    x: parentId ? 40 : 100, // Use relative coordinates if inside a parent
    y: parentId ? 40 : 100,
    width: 100, height: 100,
    sides: 6,
    name: 'UnitTestHexagon',
    fillColor: { r:1, g:0.6470588, b:0, a:1 },
    strokeColor: randomColor(),
    strokeWeight: Math.floor(Math.random() * 8) + 1
  };
  
  // Add parentId if provided
  if (parentId) {
    params.parentId = parentId;
  }
  
  return runStep({
    ws, channel,
    command: 'create_polygon',
    params: { polygon: params },
    assert: (response) => ({ pass: Array.isArray(response.ids) && response.ids.length > 0, response }),
    label: `create_polygon (${params.name})`
  });
}

/**
 * Helper to create an 8-pointed star in Figma for shape tests.
 * @param {string} parentId - Optional parent frame ID to place the star inside
 * @returns {Promise<{label:string, pass:boolean, reason?:string, response:any}>}
 */
function create_star(parentId = null) {
  const params = {
    x: parentId ? 10 : 200, // Use relative coordinates if inside a parent
    y: parentId ? 10 : 200,
    points: 8,
    innerRadius: 0.5,
    outerRadius: 1,
    name: 'UnitTestStar',
    fillColor: { r:1, g:0.8431373, b:0, a:1 },
    strokeColor: randomColor(),
    strokeWeight: Math.floor(Math.random() * 8) + 1
  };
  
  // Add parentId if provided
  if (parentId) {
    params.parentId = parentId;
  }
  
  return runStep({
    ws, channel,
    command: 'create_star',
    params: { star: params },
    assert: (response) => ({ pass: Array.isArray(response.ids) && response.ids.length > 0, response }),
    label: `create_star (${params.name})`
  });
}

/**
 * Creates a heart shape using SVG vector paths with bezier curves.
 * Demonstrates complex vector path creation with curved elements.
 * @param {string|null} [parentId=null] - Optional parent frame ID for containment
 * @returns {Promise} Test result with heart creation status
 * @example
 * const heartResult = await create_heart('frame123');
 * const heartId = heartResult.response?.nodeIds?.[0];
 */
function create_heart(parentId = null) {
  const params = {
    x: parentId ? 70 : 150, // Use relative coordinates if inside a parent
    y: parentId ? 70 : 150,
    width: 100, height: 90,
    name: 'UnitTestHeart',
    vectorPaths: [
      { windingRule: "EVENODD", data: "M 50 15 C 35 0 0 0 0 37.5 C 0 75 50 90 50 90 C 50 90 100 75 100 37.5 C 100 0 65 0 50 15 Z" }
    ],
    fillColor: randomColor(),
    strokeColor: randomColor(),
    strokeWeight: Math.floor(Math.random() * 8) + 1
  };
  
  // Add parentId if provided
  if (parentId) {
    params.parentId = parentId;
  }
  
  return runStep({
    ws, channel,
    command: 'create_vector',
    params: { vector: params },
    assert: (response) => {
      const ids = Array.isArray(response.nodeIds) ? response.nodeIds : response.ids;
      const ok = Array.isArray(ids) && ids.length > 0;
      return { pass: ok, reason: ok ? undefined : `Expected non-empty ids, got ${ids}`, response };
    },
    label: `create_vector (${params.name})`
  });
}
 
/**
 * Helper to create a lightning bolt icon using angular vector paths.
 * @param {string} parentId - Optional parent frame ID to place the lightning bolt inside
 * @returns {Promise<{label:string, pass:boolean, reason?:string, response:any}>}
 */
function create_lightning_bolt(parentId = null) {
  const params = {
    x: parentId ? 90 : 250, // Use relative coordinates if inside a parent
    y: parentId ? 90 : 150,
    width: 100, height: 120, // Made smaller to fit better in grid
    name: 'UnitTestLightningBolt',
    vectorPaths: [
      {
        windingRule: "EVENODD",
        // Lightning bolt (based on SVG polygon points, scaled to fit a 16x16 grid)
        data: "M 55.5 10.5 L 16.5 55.5 L 43.5 58.5 L 40.5 85.5 L 79.5 40.5 L 52.5 37.5 Z"
      }
    ],
    fillColor: randomColor(),
    strokeColor: randomColor(),
    strokeWeight: Math.floor(Math.random() * 8) + 1
  };
  
  // Add parentId if provided
  if (parentId) {
    params.parentId = parentId;
  }
  
  return runStep({
    ws, channel,
    command: 'create_vector',
    params: { vector: params },
    assert: (response) => {
      const ids = Array.isArray(response.nodeIds) ? response.nodeIds : response.ids;
      const ok = Array.isArray(ids) && ids.length > 0;
      return { pass: ok, reason: ok ? undefined : `Expected non-empty ids, got ${ids}`, response };
    },
    label: `create_vector (${params.name})`
  });
}

function create_speech_bubble(parentId = null) {
  const params = {
    x: parentId ? 50 : 70, y: parentId ? 50 : 60, 
    width: 100, height: 80,
    name: 'UnitTestSpeechBubble',
    vectorPaths: [
      { windingRule: "EVENODD", data: "M 20 30 Q 20 20 30 20 L 80 20 Q 90 20 90 30 L 90 60 Q 90 70 80 70 L 40 70 L 30 80 L 32 70 Q 20 70 20 60 Z" }
    ],
    fillColor: randomColor(),
    strokeColor: randomColor(),
    strokeWeight: Math.floor(Math.random() * 8) + 1
  };
  
  // Add parentId if provided
  if (parentId) {
    params.parentId = parentId;
  }
  
  return runStep({
    ws, channel,
    command: 'create_vector',
    params: { vector: params },
    assert: (response) => {
      const ids = Array.isArray(response.nodeIds) ? response.nodeIds : response.ids;
      const ok = Array.isArray(ids) && ids.length > 0;
      return { pass: ok, reason: ok ? undefined : `Expected non-empty ids, got ${ids}`, response };
    },
    label: `create_vector (${params.name})`
  });
}
 
function create_bookmark(parentId = null) {
  const params = {
    x: parentId ? 60 : 130, y: parentId ? 60 : 120, 
    width: 80, height: 100,
    name: 'UnitTestBookmark',
    vectorPaths: [
      { windingRule: "EVENODD", data: "M 30 20 L 70 20 Q 75 20 75 25 L 75 85 L 50 70 L 25 85 L 25 25 Q 25 20 30 20 Z" }
    ],
    fillColor: randomColor(),
    strokeColor: randomColor(),
    strokeWeight: Math.floor(Math.random() * 8) + 1
  };
  
  // Add parentId if provided
  if (parentId) {
    params.parentId = parentId;
  }
  
  return runStep({
    ws, channel,
    command: 'create_vector',
    params: { vector: params },
    assert: (response) => {
      const ids = Array.isArray(response.nodeIds) ? response.nodeIds : response.ids;
      const ok = Array.isArray(ids) && ids.length > 0;
      return { pass: ok, reason: ok ? undefined : `Expected non-empty ids, got ${ids}`, response };
    },
    label: `create_vector (${params.name})`
  });
}
 

/**
 * Main entry point for the shape scene test. Creates a container frame
 * and populates it with various geometric shapes to demonstrate shape creation capabilities.
 * @param {Array} results - Array to collect test results
 * @param {string} [parentFrameId] - Optional parent frame ID for scene organization
 * @example
 * const results = [];
 * await shapeScene(results, 'container123');
 * console.log(`Created ${results.length} shapes`);
 */
export async function shapeScene(results, parentFrameId) {
  // Create frame first and store its ID
  const frameResult = await create_frame(parentFrameId);
  results.push(frameResult);

  // Extract frame ID from the response
  const frameId = frameResult.response?.ids?.[0];

  if (!frameId) {
    console.warn('Could not get frame ID for placing shapes inside frame');
  }

  // Create 8 shapes inside the frame for comprehensive grid demonstration
  results.push(await create_star(frameId));
  results.push(await create_rectangle(frameId));
  results.push(await create_ellipse(frameId));
  results.push(await create_hexagon(frameId));
  results.push(await create_speech_bubble(frameId));
  results.push(await create_bookmark(frameId));
  results.push(await create_heart(frameId));
  results.push(await create_lightning_bolt(frameId));

  // Apply autolayout to create horizontal flow with wrapping
  results.push(await apply_autolayout(frameId));
}
