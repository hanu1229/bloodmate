import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins : [react()],
  server : {
    // 모든 IP에서 접근 가능
    // host : '0.0.0.0',
    host : true,
    // 포트 확인
    port : 5173,
    // 포트를 고정(포트 스왑 방지)
    strictPort : true,
    // 커스텀 도메인 허용(차단 메시지 방지)
    allowedHosts : [
      // 필요하면 추가 가능 | 와일드 카드도 가능 : ".iptime.org"
      "raunriu.iptime.org",
    ],
    //HMR(WebSocket)연결을 외부 도메인으로 설정
    hmr : {
      host : "raunriu.iptime.org",
      protocol : "ws",
      prot : 5173,
      // 만약 리버스 프록시(80/443)뒤에 두면 아래처럼 설정
      // clientPort : 80 또는 clientPort : 443
      // protocal : "wss" | HTTPS면 wss를 권장
    }
  }
})
