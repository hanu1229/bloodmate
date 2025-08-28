package bloodmate.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import javax.crypto.SecretKey;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    // 이전 코드
    // private Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    // 신규 코드 --> HS256으로 안전한 키 생성 ( 랜텀키 )
    private SecretKey secretKey = Jwts.SIG.HS256.key().build();

    @Autowired
    // Redis 선언
    private StringRedisTemplate stringRedisTemplate;

    /// JWT 토큰 발급
    /// 사용자 id를 받아서 토큰 만들기
    public String createToken(int userId) {
        //권한 부여
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        // 중복 방지 코드 부분
        //
        // 중복 방지 코드 부분
        String token =
                // JWT 토큰 생성
                Jwts.builder()
                        // 토큰에 넣을 정보 추가
                        .claims(claims)
                        // 토큰 발급 시간 | 현재 날짜 추가
                        .issuedAt(new Date())
                        // 토큰 만료 시간 | 1000은 밀리초이기 때문에 사용 | (1000 * 초 * 분 * 시)
                        .expiration(new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 24)))
                        // 지정한 비밀키로 암호화
                        .signWith(secretKey)
                        // 위 정보를 토대로 JWT 토큰을 생성하고 반환
                        .compact();

        // 중복 로그인을 방지하기 위해 웹서버가 아닌 Redis에 토큰 정보를 저장(분산 처리, MSA 구축, AI 속도 등등)
        // Redis에 토큰 저장 | .opsForValue().set(key, value) 뒤에 24는 저장 시간이며 TimeUnit.HOURS는 분, 초, 시, 일 중 시로 하겠다는 표시
        stringRedisTemplate.opsForValue().set("JWT:" + userId, token, 24, TimeUnit.HOURS);
        System.out.println(stringRedisTemplate.keys("*"));
        System.out.println(stringRedisTemplate.opsForValue().get("JWT:" + userId));

        // 이전 코드
        /*
        //권한 부여
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 24)))
                .signWith(secretKey)
                .compact();

        stringRedisTemplate.opsForValue().set("JWT:" + userId, token, 24, TimeUnit.HOURS);
        System.out.println(stringRedisTemplate.keys(""));
        System.out.println(stringRedisTemplate.opsForValue().get("JWT:" + userId));
        */

        return token;
    }

    /// JWT 토큰 검증
    public int valnoateToken(String token) {
        try {
            Claims claims =
                    // 토큰을 검증하기 위한 함수
                    Jwts.parser()
                            // 검증을 위한 비밀키 추가
                            .verifyWith(secretKey)
                            // 검증을 실행할 객체 생성
                            .build()
                            // 검증된 토큰 해석 | 실패 시 예외 발생
                            .parseSignedClaims(token)
                            // 검증된 Claims 객체 생성
                            .getPayload();
            // 중복 로그인을 방지하고 Redis에서 최근에 로그인된 토큰을 확인
            int userId = (int)claims.get("userId");
            // Redis에서 최신 토큰 가져오기
            String redisToken = stringRedisTemplate.opsForValue().get("JWT:" + userId);
            // 전달받은 토큰과 레디스에 저장된 토큰을 비교
            if(token.equals(redisToken)) {
                return userId;
            } else {
                return 0;
            }
        } catch(ExpiredJwtException e) {
            // 토큰이 만료 되었을 때 예외 클래스
            System.out.println(">> JWT 토큰 기간 만료 : " + e);
        } catch(JwtException e) {
            // 그 외 모든 토큰 예외 클래스
            System.out.println(">> JWT 예외 : " + e);
        }
        // 유효하지 않은 토큰 또는 오류 발생 시 null 반환
        return 0;
    }

    /// JWT 토큰 삭제
    public void deleteToken(int userId) {
        stringRedisTemplate.delete("JWT:" + userId);
    }

}
