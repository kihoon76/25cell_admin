package hotplace.admin.dao;

import java.util.List;

import hotplace.admin.domain.Yaggwan;

public interface YaggwanDao {

	List<Yaggwan> selectYaggwanList();

	void updateYaggwan(Yaggwan yaggwan);

	void updateYaggwanSoonseo(Yaggwan yaggwan);

	void deleteYaggwan(Yaggwan yaggwan);

	void insertYaggwan(Yaggwan yaggwan);

}
