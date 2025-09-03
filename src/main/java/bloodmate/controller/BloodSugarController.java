package bloodmate.controller;

import bloodmate.model.dto.bloodsugar.BloodSugarRequestDto;
import bloodmate.model.dto.bloodsugar.BloodSugarResponseDto;
import bloodmate.service.BloodSugarService;
import lombok.RequiredArgsConstructor;
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
    public boolean create(@RequestHeader("Authorization") String token, @RequestBody BloodSugarRequestDto bloodSugarRequestDto) {
        System.out.println(">> BloodSugarController.create start");
        System.out.println(">> token = " + token);
        System.out.println(">> bloodSugarDto = " + bloodSugarRequestDto);
        boolean result = bloodSugarService.create(token, bloodSugarRequestDto);
        System.out.println(">> BloodSugarController.create end\n");
        return result;
    }

    /// 혈당 정보 전체 불러오기 - R
    @GetMapping("")
    public List<BloodSugarResponseDto> findAll(@RequestHeader("Authorization") String token) {
        System.out.println(">> BloodSugarController.findAll start");
        System.out.println(">> token = " + token);
        List<BloodSugarResponseDto> result = bloodSugarService.findAll(token);
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
    public boolean update(
            @RequestHeader("Authorization") String token,
            @RequestBody BloodSugarRequestDto bloodSugarRequestDto,
            @PathVariable("bloodSugarId") int bloodSugarId
    ) {
        System.out.println(">> BloodSugarController.update start");
        System.out.println(">> token = " + token);
        System.out.println(">> bloodSugarDto = " + bloodSugarRequestDto);
        System.out.println(">> bloodSugarId = " + bloodSugarId);
        boolean result = bloodSugarService.update(token, bloodSugarRequestDto, bloodSugarId);
        System.out.println(">> BloodSugarController.update end\n");
        return result;
    }

    /// 혈당 정보 삭제하기 - D
    @DeleteMapping("/{bloodSugarId}")
    public boolean delete(@RequestHeader("Authorization") String token, @PathVariable("bloodSugarId") int bloodSugarId) {
        System.out.println(">> BloodSugarController.delete start");
        System.out.println(">> token = " + token);
        System.out.println(">> bloodSugarId = " + bloodSugarId);
        boolean result = bloodSugarService.delete(token, bloodSugarId);
        System.out.println(">> BloodSugarController.delete end\n");
        return result;
    }

}
