package bloodmate.model.repository;

import bloodmate.model.entity.CommentEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {

    /// 댓글 수정 - U
    @Query(value = "select * from board_comment where user_id = :userId and board_comment_id = :boardCommentId", nativeQuery = true)
    Optional<CommentEntity> updateByComment(@Param("userId") int userId, @Param("boardCommentId") int boardCommentId);

    /// 댓글 삭제 - D
    @Query(value = "select * from board_comment where user_id = :userId and board_comment_id = :boardCommentId", nativeQuery = true)
    Optional<CommentEntity> deleteByComment(@Param("userId") int userId, @Param("boardCommentId") int boardCommentId);

    /// 게시물 상세보기 댓글 출력 내림차순(DESC) | 최신순 - R
    @Query(value = "select * from board_comment where board_post_id = :boardPostId and board_comment_state order by created_at DESC", nativeQuery = true)
    List<CommentEntity> findByBoardPostIdDESC(@Param("boardPostId") int boardPostId);

    /// 게시물 상세보기 댓글 출력 오름차순(ASC) | 등록순 - R
    @Query(value = "select * from board_comment where board_post_id = :boardPostId and board_comment_state order by created_at ASC", nativeQuery = true)
    List<CommentEntity> findByBoardPostIdASC(@Param("boardPostId") int boardPostId);

}
