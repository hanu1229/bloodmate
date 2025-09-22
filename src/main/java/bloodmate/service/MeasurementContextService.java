package bloodmate.service;

import bloodmate.model.dto.MeasurementContextDto;
import bloodmate.model.entity.MeasurementContextEntity;
import bloodmate.model.repository.MeasurementContextRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MeasurementContextService {

    private final MeasurementContextRepository mcRepository;

    /// 측정 상황 불러오기 - R
    public ResponseEntity<List<MeasurementContextDto>> findAll() {
        System.out.println(">> MeasurementContextService.findAll start");
        try {
            List<MeasurementContextEntity> mcEntityList = mcRepository.findAll();
            if(mcEntityList == null) { return ResponseEntity.status(400).body(null); }
            List<MeasurementContextDto> body = mcEntityList.stream().map(entity -> {
                MeasurementContextDto mcDto = entity.toDto();
                String label = BloodSugarService.CONTEXT_LABELS.getOrDefault(mcDto.getMcCode(), mcDto.getMcCode());
                mcDto.setMcCode(label);
                return mcDto;
            }).toList();
            return ResponseEntity.status(200).body(body);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> MeasurementContextService.findAll error!!!");
            return ResponseEntity.status(400).body(null);
        } finally {
            System.out.println(">> MeasurementContextService.findAll end");
        }
    }

}
