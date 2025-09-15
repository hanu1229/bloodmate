package bloodmate.util;

import java.security.SecureRandom;

public final class VerificationNumber {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private VerificationNumber () {}

    /// 4자리 숫자 코드
    public static String createNumber() {
        int number = SECURE_RANDOM.nextInt(10000);
        return String.format("%04d", number);
    }

}
