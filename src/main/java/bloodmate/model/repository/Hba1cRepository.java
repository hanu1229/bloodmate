package bloodmate.model.repository;

import bloodmate.model.entity.Hba1cEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Hba1cRepository extends JpaRepository<Hba1cEntity, Integer> {

    /// 당화혈색소 정보 전체 불러오기 - R
    @Query(value = "select * from user_hba1c where user_id = :userId", nativeQuery = true)
    List<Hba1cEntity> findByUserIdToHba1c(@Param("userId") int userId);

    /// 당화혈색소 정보 삭제하기 - D
    @Modifying
    @Query(value = "delete from user_hba1c where hba1c_id = :hba1cId and user_id = :userId", nativeQuery = true)
    int deleteByHba1cIdAndUserId(@Param("hba1cId") int hba1cId, @Param("userId") int userId);

}
