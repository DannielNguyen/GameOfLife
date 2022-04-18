<?php
	if(isset($_POST['username']) && isset($_POST['password']))
	{
		$file = fopen('profiles.txt', 'r');
		$username = $_POST['username'];
		$password = $_POST['password'];
		
		$success = false;
		while (!feof($file)) 
		{
			$user_info = fgets($file);
			$arr = explode(' - ', $user_info);
			if(trim($arr[0]) == $username && trim($arr[1]) == $password)
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
