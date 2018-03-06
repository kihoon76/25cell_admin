package hotplace.admin.service;

import org.apache.commons.codec.binary.StringUtils;
import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TMultiplexedProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import hotplace.admin.domain.AjaxVO;
import hotplace.admin.thrift.RefreshApplicationConfigService;

@Service("thriftService")
public class ThriftService {

	@Value("#{thriftCfg['host']}")
	private String host;
	
	@Value("#{thriftCfg['port']}")
	private int port;
	
	private interface Client {
		public void build(TBinaryProtocol protocol) throws TException;
	};
	
	private AjaxVO run(Client c) {
		TTransport transport = new TSocket(host, port);
		AjaxVO vo = new AjaxVO();
		
		try {
			transport.open();
			
			TBinaryProtocol protocol = new TBinaryProtocol(transport);
			c.build(protocol);
			vo.setSuccess(true);
			/*TMultiplexedProtocol mp1 = new TMultiplexedProtocol(protocol, "Ping");
			PingService.Client client = new PingService.Client(mp1);
			
			System.out.println(client.ping());*/
		} 
		catch (TTransportException e) {
			// TODO Auto-generated catch block
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
			e.printStackTrace();
		}
		catch(TException e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
			e.printStackTrace();
		}
		
		transport.close();
		
		return vo;
		
	}
	
	public AjaxVO runHotplace25Config() {
		return run(new Client() {

			@Override
			public void build(TBinaryProtocol protocol) throws TException {
				if(protocol != null) {
					TMultiplexedProtocol mp = new TMultiplexedProtocol(protocol, "HotplaceConfig");
					RefreshApplicationConfigService.Client client = new RefreshApplicationConfigService.Client(mp);
					String s = client.touch();
					AjaxVO vo = getResult(s);
					
					if(vo == null) throw new TException("Result is empty");
					if(!vo.isSuccess()) throw new TException(vo.getErrMsg());
				}
				
			}
			
		});
	}
	
	private AjaxVO getResult(String s) {
		if(s == null || "".equals(s)) return null;
		
		Gson g = new Gson();
		return g.fromJson(s, AjaxVO.class);
	}
}
