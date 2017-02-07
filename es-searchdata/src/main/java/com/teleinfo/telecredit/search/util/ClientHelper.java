package com.teleinfo.telecredit.search.util;
/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年2月6日 上午10:31:59
*@version 1.0
*@parameter
*@since
*@return 
*/

import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ClientHelper {
    private Settings setting;

    private Map<String, Client> clientMap = new ConcurrentHashMap<String, Client>();

    private Map<String, Integer> ips = new HashMap<String, Integer>();

    private String clusterName = "elasticsearch";

    public ClientHelper(String nodes,String cluster) {
        init(nodes,cluster);
    }

    /**
     * 初始化默认的client
     */
    public void init(String nodes,String cluster) {
        setting = Settings
                .settingsBuilder()
                .put("client.transport.sniff",true)
                .put("cluster.name",cluster)
                .build();
        getAllClient(setting,nodes);
    }
    public Client getClient() {
        return getClient(clusterName);
    }

    public Client getClient(String clusterName) {
        return clientMap.get(clusterName);
    }
    public void getAllClient(Settings settings,String nodes){
    	TransportClient client = null;
		try {
			client = TransportClient.builder().settings(settings).build();
			String[] node = nodes.split(",");
	    	if(node != null && node.length != 0){
	    		for(String nodemap : node){
	    			String host = nodemap.split(":")[0];
	    			int port = Integer.parseInt(nodemap.split(":")[1]);
	    			client = client.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName(host), port));
	    		}
	    	}
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
    	clientMap.put(settings.get("cluster.name"), client);
    }
}