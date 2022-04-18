<?php
	if($_POST['username'] != "" && $_POST['password'] != "")
	{
		$path = 'profiles.txt';
		$userlist = file('profiles.txt');
		$username = $_POST['username'];
		foreach ($userlist as $user) 
		{
			$user_info = explode(' - ', $user);
			if($user_info[0] == $username)
			{
				echo "You have inputted a username that already exists.<br>";
				echo "<a href='signup.html'>Try again?</a>";
				exit();
			}
		}
		$fp = fopen($path, 'a');
		$profile = "\n".$_POST['username'].' - '.$_POST['password'];
		fwrite($fp,$profile);
		fclose($fp);
		header("Location: login.html");
	}
	else{
		echo "Please enter a username or password!<br>";
		echo "<a href='signup.html'>Try again?</a>";
		exit();
	}
?>
