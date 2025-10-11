package bloodmate.controller;

import bloodmate.model.dto.bloodpressure.BloodPressureRequestDto;
import bloodmate.model.dto.bloodpressure.BloodPressureResponseDto;
import bloodmate.service.BloodPressureService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/blood/pressure")
public class BloodPressureController {

    private final BloodPressureService bloodPressureService;

    /// 혈압 정보 작성 - C
    @PostMapping("")
    public ResponseEntity<Boolean> create(@RequestHeader("Authorization") String token, @RequestBody BloodPressureRequestDto bloodPressureRequestDto) {
        System.out.println(">> BloodPressureController.createBloodPressure start");
        System.out.println(">> token = " + token);
        System.out.println(">> bloodPressureRequestDto = " + bloodPressureRequestDto);
        ResponseEntity<Boolean> result = bloodPressureService.create(token, bloodPressureRequestDto);
        System.out.println(">> BloodPressureController.createBloodPressure end\n");
        return result;
    }

    /// 혈압 정보 전체 불러오기 - R
    @GetMapping("")
    public ResponseEntity<Page<BloodPressureResponseDto>> findAll(
            @RequestHeader("Authorization") String token,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "7") int size,
            @RequestParam(name = "sorting", defaultValue = "DESC") String sorting
            ) {
        System.out.println(">> BloodPressureController.findAll start");
        System.out.println(">> token = " + token);
        System.out.println(">> page = " + page);
        System.out.println(">> size = " + size);
        System.out.println(">> sorting = " + sorting);
        ResponseEntity<Page<BloodPressureResponseDto>> result = bloodPressureService.findAll(token, page, size, sorting);
        System.out.println(">> BloodPressureController.findAll end\n");
        return result;
    }

    /// 혈압 정보 조건 불러오기 - R
    @GetMapping("/date")
    public List<BloodPressureResponseDto> findByDate(@RequestHeader("Authorization") String token, @RequestParam("date") LocalDateTime date) {
        System.out.println(">> BloodPressureController.findByDate start");
        List<BloodPressureResponseDto> result = bloodPressureService.findByDate(token, date);
        System.out.println(">> BloodPressureController.findByDate end\n");
        return result;
    }

    /// 혈압 정보 수정하기 - U
    @PutMapping("/{bloodPressureId}")
    public ResponseEntity<Boolean> update(
            @RequestHeader("Authorization") String token,
            @RequestBody BloodPressureRequestDto bloodPressureRequestDto,
            @PathVariable("bloodPressureId") int bloodPressureId
    ) {
        System.out.println(">> BloodPressureController.update start");
        System.out.println(">> token = " + token);
        System.out.println(">> bloodPressureId = " + bloodPressureId);
        System.out.println(">> bloodPressureRequestDto = " + bloodPressureRequestDto);
        ResponseEntity<Boolean> result = bloodPressureService.update(token, bloodPressureRequestDto, bloodPressureId);
        System.out.println(">> BloodPressureController.update end\n");
        return result;
    }

    /// 혈압 정보 삭제하기 - D
    @DeleteMapping("/{bloodPressureId}")
    public ResponseEntity<Boolean> delete(@RequestHeader("Authorization") String token, @PathVariable("bloodPressureId") int bloodPressureId) {
        System.out.println(">> BloodPressureController.delete start");
        System.out.println(">> token = " + token);
        System.out.println(">> bloodPressureId = " + bloodPressureId);
        ResponseEntity<Boolean> result = bloodPressureService.delete(token, bloodPressureId);
        System.out.println(">> BloodPressureController.delete end\n");
        return result;
    }

}
