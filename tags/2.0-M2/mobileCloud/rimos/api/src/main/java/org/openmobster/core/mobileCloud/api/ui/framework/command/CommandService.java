/**
 * Copyright (c) {2003,2009} {openmobster@gmail.com} {individual contributors as indicated by the @authors tag}.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 */

package org.openmobster.core.mobileCloud.api.ui.framework.command;

import java.util.Hashtable;

import org.openmobster.core.mobileCloud.api.ui.framework.AppConfig;

/**
 * @author openmobster@gmail.com
 *
 */
public abstract class CommandService 
{	
	public CommandService()
	{		
	}
	
	protected Command find(String commandId)
	{
		Hashtable commandConfig = AppConfig.getInstance().getAppCommands();		
		return (Command)commandConfig.get(commandId);
	}
	
	protected void reportAppException(CommandContext commandContext, AppException appException)
	{
		commandContext.setAppException(appException);
	}
	
	/**
	 * Executes a Command based on the CommandContext
	 * 
	 * @param commandContext
	 */
	public abstract void execute(CommandContext commandContext);		
}