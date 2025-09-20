package bloodmate.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * WebMvcConfigurer를 이용해서 CORS 전역을 설정한다.
 * Spring Security가 있어도 Security에서 http.cors()를 사용하면 CorsConfig의 설정을 Security 필터가 참조하게 된다.
 */

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 어떤 API 경로에 CROS를 적용할지 매핑 | 보통 전역 "/**"
        registry.addMapping("/**")
                // 허용할 오리진(출처)을 지정 | 접속할 도메인 작성 (여러개 가능)
                .allowedOrigins("http://localhost:5173", "http://raunriu.iptime.org:5173")
                // 프론트에서 사용할 HTTP 메소드를 지정 | OPTIONS는 브라우저가 사진을 요청할 때 사용되므로 꼭 포함
                .allowedMethods("POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS")
                // 요청 시 허용할 헤더
                // Authorization, Content-Type, X-Requested-With등을 개별 기재해도 되지만 운영 중 헤더가 추가 될 수 있음으로 "*"를 작성한다.
                .allowedHeaders("*")
                // 쿠키/세션/인증정보(자격 증명) 포함 허용 여부
                // axios에서 withCredentials : true를 사용할 때 필요하다.
                // true일 경우 allowedOrigins()에 "*" 사용 못함 |
                .allowCredentials(true);
                /*
                * OPTIONS 결과를 브라우저가 캐시하는 시간(초) | 숫자가 클수록 횟수가 줄어 성능상 유리하다
                * .maxAge(3600);
                */
    }

}
