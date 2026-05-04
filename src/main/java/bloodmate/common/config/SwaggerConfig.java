package bloodmate.common.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {

        Info info = new Info();
        info.title("블러드메이트(BloodMate) API");
        info.description("혈당·혈압 기록 및 건강 관리 서비스 API 문서");
        info.version("v1.0.0");

        return new OpenAPI().info(info);
    }

}
