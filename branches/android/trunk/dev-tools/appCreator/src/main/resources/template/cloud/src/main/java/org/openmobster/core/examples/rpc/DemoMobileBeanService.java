/**
 * Copyright (c) {2003,2009} {openmobster@gmail.com} {individual contributors as indicated by the @authors tag}.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 */

package org.openmobster.core.examples.rpc;

import org.apache.log4j.Logger;

import org.openmobster.server.api.service.Request;
import org.openmobster.server.api.service.Response;
import org.openmobster.server.api.service.MobileServiceBean;
import org.openmobster.server.api.service.ServiceInfo;

/**
 * @author openmobster@gmail.com
 */
@ServiceInfo(uri="/demo/mobile-rpc")
public class DemoMobileBeanService implements MobileServiceBean
{
	private static Logger log = Logger.getLogger(DemoMobileBeanService.class);
	
	public DemoMobileBeanService()
	{
		
	}
	
	public void start()
	{
		log.info("--------------------------------------------------------------------------");
		log.info("/demo/mobile-rpc: was successfully started....");
		log.info("--------------------------------------------------------------------------");
	}
	
	public Response invoke(Request request) 
	{	
		log.info("-------------------------------------------------");
		log.info(this.getClass().getName()+" successfully invoked...");		
		
		Response response = new Response();
		String[] names = request.getNames();
		for(String name: names)
		{
			String value = request.getAttribute(name);
			log.info("Name="+name+", Value="+value);
			response.setAttribute(name, "response://"+value);
		}		
		log.info("-------------------------------------------------");
		
		return response;
	}
}