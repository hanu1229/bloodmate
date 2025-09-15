package bloodmate.model.repository;

import bloodmate.model.entity.VerificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationRepository extends JpaRepository<VerificationEntity, Integer> {

    /// 인증번호 확인 및 아이디 찾기
    @Query(value = "select * from verifications where user_name = :userName and user_phone = :userPhone order by created_at desc limit 1", nativeQuery = true)
    VerificationEntity findByUserNameAndUserPhone(@Param("userName") String userName, @Param("userPhone") String userPhone);

    /// 인증번호 확인 및 비밀번호 찾기
    @Query(value = "select * from verifications where user_name = :userName and user_phone = :userPhone order by created_at desc limit 1", nativeQuery = true)
    VerificationEntity findByUserNameAndUserPhoneAndUserLoginId(@Param("userName") String userName, @Param("userPhone") String userPhone, @Param("userLoginId") String userLoginId);

}
