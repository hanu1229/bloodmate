package bloodmate.model.repository;

import bloodmate.model.entity.BloodSugarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloodSugarRepository extends JpaRepository<BloodSugarEntity, Integer> {

    /// 혈당 전체 불러오기 - R
    @Query(value = "select * from user_blood_sugar where user_id = :userId", nativeQuery = true)
    List<BloodSugarEntity> findByUserIdToBloodSugar(@Param("userId") int userId);


}
