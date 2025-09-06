package bloodmate.model.repository;

import bloodmate.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    @Query(value = "select * from users where user_login_id = :userLoginId and user_password = :userPassword", nativeQuery = true)
    Optional<UserEntity> findByUserLoginId(@Param("userLoginId") String userLoginId, @Param("userPassword") String userPassword);

    /// 닉네임 중복 확인 - R
    boolean existsByUserNickname(@Param("userNickname") String userNickname);

    /// 아이디 중복 확인 - R
    boolean existsByUserLoginId(@Param("userLoginId") String userLoginId);

    /// 닉네임으로 회원 정보 확인
    @Query(value = "select * from users where user_nickname = :userNickname and user_id = :userId", nativeQuery = true)
    UserEntity findByNicknameToUserId(@Param("userNickname") String userNickname, @Param("userId") int userId);

}
