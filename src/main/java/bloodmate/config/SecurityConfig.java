package bloodmate.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Security 필터 체인
 * http.cors()를 켜야 webMvcConfigurer의 CORS 설정을 Security가 인식한다.
 * API 서버(JWT/토큰 기반)라면 CSRF는 비활성화하는게 일반적이다.
 */

@Configuration
public class SecurityConfig {
    // Spring Security의 HTTP 보안(필터 체인) 설정을 구성하고 Bean으로 등록
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // REST API(JWT)라면 보통 CSRF를 끈다. (세션/폼 로그인이라면 켜고 설정이 필요하다)
        http.csrf(csrf -> csrf.disable())
            // ★ 핵심 : CORS를 활성화시킨다. | 내용은 비워두고 활성화만 하면 MVC쪽 설정을 그대로 가져다 쓸 수 있다.
            .cors(cors -> {})
            // 접근 권한 정책 설정 | 여기서는 개발 편의를 위해 전부 허용 | 운영 시에는 엔드포인트별 정책을 세분화하거나 authenticated()로 전환
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        // 위에서 구성한 설정으로 SecurityFilterChain인스턴스를 생성하여 반환
        return http.build();
    }
}
