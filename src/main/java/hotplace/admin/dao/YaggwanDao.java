package hotplace.admin.dao;

import java.util.List;

import hotplace.admin.domain.Yaggwan;

public interface YaggwanDao {

	List<Yaggwan> selectYaggwanList();

	boolean updateYaggwan(Yaggwan yaggwan);

	boolean updateYaggwanSoonseo(Yaggwan yaggwan);

}
