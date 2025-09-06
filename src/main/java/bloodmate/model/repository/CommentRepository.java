package bloodmate.model.repository;

import bloodmate.model.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {

    /// 댓글 수정 - U
    @Query(value = "select * from board_comment where user_id = :userId and board_post_id = :boardPostId and board_comment_id = :boardCommentId", nativeQuery = true)
    Optional<CommentEntity> findByComment(@Param("userId") int userId, @Param("boardPostId") int boardPostId, @Param("boardCommentId") int boardCommentId);

}
