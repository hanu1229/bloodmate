package bloodmate.controller;

import bloodmate.model.dto.bloodsugar.BloodSugarRequestDto;
import bloodmate.model.dto.bloodsugar.BloodSugarResponseDto;
import bloodmate.service.BloodSugarService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/blood/sugar")
public class BloodSugarController {

    private final BloodSugarService bloodSugarService;

    /// 혈당 정보 작성 - C
    @PostMapping("")
    public ResponseEntity<Boolean> create(@RequestHeader("Authorization") String token, @RequestBody BloodSugarRequestDto bloodSugarRequestDto) {
        System.out.println(">> BloodSugarController.create start");
        System.out.println(">> token = " + token);
        System.out.println(">> bloodSugarDto = " + bloodSugarRequestDto);
        ResponseEntity<Boolean> result = bloodSugarService.create(token, bloodSugarRequestDto);
        System.out.println(">> BloodSugarController.create end\n");
        return result;
    }

    /// 혈당 정보 전체 불러오기 - R
    @GetMapping("")
    public ResponseEntity<Page<BloodSugarResponseDto>> findAll(
            @RequestHeader("Authorization") String token,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "7") int size,
            @RequestParam(name = "sorting", defaultValue = "DESC") String sorting
    ) {
        System.out.println(">> BloodSugarController.findAll start");
        System.out.println(">> token = " + token);
        System.out.println(">> page = " + page);
        System.out.println(">> size = " + size);
        System.out.println(">> sorting = " + sorting);
        ResponseEntity<Page<BloodSugarResponseDto>> result = bloodSugarService.findAll(token, page, size, sorting);
        System.out.println(">> BloodSugarController.findAll end\n");
        return result;
    }

    /// 혈당 정보 조건 불러오기(조건 : 날짜) - R
    @GetMapping("/date")
    public List<BloodSugarResponseDto> findByDate(@RequestHeader("Authorization") String token, @RequestParam("date") LocalDateTime date) {
        System.out.println(">> BloodSugarController.findByDate start");
        System.out.println(">> token = " + token);
        System.out.println(">> date = " + date);
        List<BloodSugarResponseDto> result = bloodSugarService.findByDate(token, date);
        System.out.println(">> BloodSugarController.findByDate end\n");
        return result;
    }

    /// 혈당 정보 수정하기 - U
    @PutMapping("/{bloodSugarId}")
    public ResponseEntity<Boolean> update(
            @RequestHeader("Authorization") String token,
            @RequestBody BloodSugarRequestDto bloodSugarRequestDto,
            @PathVariable("bloodSugarId") int bloodSugarId
    ) {
        System.out.println(">> BloodSugarController.update start");
        System.out.println(">> token = " + token);
        System.out.println(">> bloodSugarDto = " + bloodSugarRequestDto);
        System.out.println(">> bloodSugarId = " + bloodSugarId);
        ResponseEntity<Boolean> result = bloodSugarService.update(token, bloodSugarRequestDto, bloodSugarId);
        System.out.println(">> BloodSugarController.update end\n");
        return result;
    }

    /// 혈당 정보 삭제하기 - D
    @DeleteMapping("/{bloodSugarId}")
    public ResponseEntity<Boolean> delete(@RequestHeader("Authorization") String token, @PathVariable("bloodSugarId") int bloodSugarId) {
        System.out.println(">> BloodSugarController.delete start");
        System.out.println(">> token = " + token);
        System.out.println(">> bloodSugarId = " + bloodSugarId);
        ResponseEntity<Boolean> result = bloodSugarService.delete(token, bloodSugarId);
        System.out.println(">> BloodSugarController.delete end\n");
        return result;
    }

}
