<?php
	if(isset($_POST['username']) && isset($_POST['password']))
	{
		$userlist = file('profiles.txt');
		$username = $_POST['username'];
		$password = $_POST['password'];
		
		$success = false;
		foreach ($userlist as $user) 
		{
			$user_info = explode(' - ', $user);
			if($user_info[0] == $username && $user_info[1] == $password)
			{
				$success = true;
				break;
			}
			else
			{
				continue;
			}
		}
		
		if($success)
		{
			header("Location: index.html");
		}
		else
		{
			echo("You have incorrectly inputted your username or password.<br>");
			echo "<a href='login.html'>Try again?</a>";
			exit();
		}
	}
	else
	{
		echo "You did not input a username or password.<br>";
		echo "<a href='login.html'>Try again?</a>";
		exit();
	}
?>
