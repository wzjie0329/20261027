let runnerImage; // 儲存跑步角色的橫向精靈圖
const FRAME_COUNT = 6; // 設定精靈圖中的動畫格數
const FRAME_WIDTH = 259 / FRAME_COUNT; // 計算每一格的來源寬度
const FRAME_HEIGHT = 64; // 設定精靈圖每一格的來源高度
const DISPLAY_HEIGHT = 128; // 設定角色顯示高度
const MOVE_SPEED = 4; // 設定角色每次繪圖移動的像素數
let characterX; // 記錄角色目前的水平位置
let characterY; // 記錄角色目前的垂直位置
let facing = 1; // 記錄角色朝向，1 為右，-1 為左
let isMoving = false; // 記錄角色目前是否正在移動

function preload() { // 在畫布建立前載入角色精靈圖
  runnerImage = loadImage("1/跑步/跑.png"); // 載入指定路徑的跑步精靈圖
} // 結束素材載入函式

function setup() { // 設定全螢幕畫布與角色初始狀態
  createCanvas(windowWidth, windowHeight); // 建立符合瀏覽器視窗大小的畫布
  imageMode(CENTER); // 讓角色圖片以指定位置為中心繪製
  characterX = width / 2; // 將角色初始水平位置設在畫面中央
  characterY = height / 2; // 將角色初始垂直位置設在畫面中央
} // 結束畫布初始化函式

function draw() { // 每一影格更新背景、移動與角色動畫
  background("#f2e9e4"); // 使用指定的背景顏色清除畫面
  let direction = 0; // 初始化本影格的移動方向
  if (keyIsDown(LEFT_ARROW)) { // 檢查是否按住鍵盤左方向鍵
    direction = -1; // 設定角色向左移動
    facing = -1; // 設定角色面向左側
  } else if (keyIsDown(RIGHT_ARROW)) { // 檢查是否按住鍵盤右方向鍵
    direction = 1; // 設定角色向右移動
    facing = 1; // 設定角色面向右側
  } // 結束方向鍵判斷
  isMoving = direction !== 0; // 根據移動方向更新角色移動狀態
  characterX += direction * MOVE_SPEED; // 依方向與速度更新角色水平位置
  const spriteHeight = min(DISPLAY_HEIGHT, height * 0.4); // 依畫面高度限制角色顯示高度
  const spriteWidth = spriteHeight * (FRAME_WIDTH / FRAME_HEIGHT); // 依單格精靈圖比例計算角色顯示寬度
  characterX = constrain(characterX, min(spriteWidth / 2, width / 2), max(width - spriteWidth / 2, width / 2)); // 將角色限制在畫布水平範圍內
  characterY = height / 2; // 讓角色在視窗縮放後仍保持垂直置中
  const frameIndex = isMoving ? floor(frameCount / 8) % FRAME_COUNT : 0; // 移動時循環播放六格動畫，停止時顯示第一格
  push(); // 暫存目前的繪圖設定
  translate(characterX, characterY); // 將繪圖原點移至角色位置
  scale(facing, 1); // 依角色朝向翻轉精靈圖
  image(runnerImage, 0, 0, spriteWidth, spriteHeight, frameIndex * FRAME_WIDTH, 0, FRAME_WIDTH, FRAME_HEIGHT); // 繪製目前動畫格
  pop(); // 還原繪圖設定，避免影響其他畫面
} // 結束每影格繪圖函式

function windowResized() { // 瀏覽器視窗尺寸改變時更新畫布
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的視窗大小
} // 結束視窗縮放處理函式

function keyPressed() { // 處理方向鍵按下事件
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) { // 判斷按下的是否為左右方向鍵
    return false; // 阻止方向鍵造成瀏覽器頁面捲動
  } // 結束方向鍵判斷
} // 結束按鍵事件處理函式
