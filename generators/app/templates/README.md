Things to be done in the next upcoming version :-
1.
Separate all the git, eslint, readme files from one folder i.e app folder and put these files in their respective folders , i.e
.gitignore file in git folder , readme.md file in readme folder.
For this, use this.composeWith() method in your appfolder->index.js . This method will help in going to that particular index.js folder which is being mentioned in that composeWith() method.
2.
Provide Eslint rules to this project i.e generator-node. Also, keep a good habit of providing eslint rules to all the project you are making.For this, either copy that eslint rules and modify it what you have made for your generator project or make ur own eslint rules for that particular project.
3.
Write Test cases using jasmine and run using karma Test case runner for generator-node project.
4.
Use Gulp/Grunt JS to operate on your main JS file and gulp will help you in operating the file as according to what you want :-
	*When you save code on your machine during development, you want the browser to reload your page automatically.
	*When a developer saves code on his machine, he wants a comprehensive list of JS errors / general best practice violations to be shown.
	*You have a project with SASS/ LESS files which need to be compiled to CSS files on the developers machine during development.
	 Ex-whenever he saves a SASS file, you want it to be compiled to a CSS file automatically.
	*The integration with project seed generators on Yeoman, Gulp is another major factor to consider. Yeoman and Gulp come with 'Gruntfile.js' with intelligent defaults.
 
*******************************************************************
 Steps to install generator-node project in your system :-
1.
clone your generator project from github in C:\Users\surajsk\AppData\Roaming\npm\node_modules.
2.
Now, Install all the dependencies by running "npm install". This will download all the dependencies mentioned in package.json of generator-node.
3.
After installation, run "yo node".
	It will ask several questions which after inputting it will be saved in package.json of that particular project.
4.
Your project is now ready. Now, run "npm start" which will run your main node project.

*******************************************************************
//this mergeOrextend method will also help in the same way as what Object.assign() does.

//for installing the dependencies of jquery,jsdom etc.. , you have to download it in this generator-node project which helps in 
//creating another project ,say Ax. so, we don't need to install dependencies there in Ax. But , it must be installed in the main
//yeoman generator ,i.e generator-node.

//var jsdom = require('jsdom');
// require("jsdom").env("", function(err, window) {
//     if (err) {
//         console.error(err);
//         return;
//     }
 
//     var $ = require("jquery")(window);
// });
//var validate = require('validate-element-name');

// Calling the super constructor is important so our generator is correctly set up

//super(args, options); //helps in calling the method of generators (parent) class.

//Delete the cache file which could not may have been deleted because of any unwanted interruption while installing the project.

//To notify the system that we expect an option, we use this.option() method

/*var testArray = ['node-project'];
		    if(testArray.indexOf(prefix) === -1){
			  //this.log('Prefix not matching with the default prefix "node-project"');
        };*/
        //assert.equal() helps in validating the entered arguments with the expected arguments.
//assert.equal(this.options.prefix, 'node-project', 'project Prefix should match ' + '"node-project"' + ". Eg: node-project-<<project name>>");

        //yo node-project --skip-project-install will give true and will go inside the loop
        //Options look a lot like arguments, but they are written as command line flags.
        //arguments :- yo node skip-project-install (in cmd) (Difference between arguments & options)
        //options :- yo node --skip-project-install (in cmd)

        		   //this.log('this.options.prefix', this.options.prefix);

        /*if(this.options['skip-project-install']){
            this.log('skip-project-installation true  ', this.options.prefix );
        }*/
		   //this.log("name:- ",this.options.name);

	 //Reading the files of package.json file present in templates , so that it can be customised according to our needs and 
      //then copied into the made project directory.

      //assigning the readed files of package.json file into packageJson...Now, we will customize this packageJson object a/c to our requirement.

      //assign method helps in updating the JSON values of json x from json y if the json values of y is present in x , otherwise , it will simply gets appended/extended.

      //customising the packageJson object with the new values obtained from the User Input.

      //Doing store : true will help in saving the inputted values in the .yo-rc.json configuration file in the made project directory 
                   //and next time,
                   // this value will get defaulted. This will make .yo-rc.json file in the node-project u want to make.

      //customising the packageJson object with the new values obtained from the User Input.

      //this method helps in taking the user input.
      //this method is an asynchronous method...so, take care of using async() method.

      //this will give values only for the input entered in cli as yo node --includeReadme=xyz //this will give value as xyz
      //otherwise , the value what we will get will be undefined. To access the entered user input, you have to use packageJson what you have stored/configured in prompt.then() function. 

          //To make the project more generic, commented out the below dependencies . Now, we are putting all the dependencies in
      //the source template path of package.json file present in templates. So, from now onwards, if any dependencies needs to be 
      //included , it should be included in this package.json file of templates.
           /* var includeAllDependencies = {
              dependencies : {
                    "body-parser": "^1.18.3",
                    "cookie-parser": "~1.4.3",
                    "debug": "~2.6.9",
                    "express": "~4.16.0",
                    "http-errors": "~1.6.2",
                    "jade": "~1.11.0",
                    "karma-cli": "^1.0.1",
                    "mongodb": "^3.1.9"
              },
              devDependencies : {
                    "karma": "^3.1.1",
                    "karma-chrome-launcher": "^2.2.0",
                    "karma-coverage": "^1.1.2",
                    "karma-firefox-launcher": "^1.1.0",
                    "karma-jasmine": "^2.0.1"
              }
            };
            this.fs.extendJSON(this.destinationPath('package.json'), includeAllDependencies); */

            //console.log(Object.keys(jsonofExistingNodeProject).length);//to count the length of a JSON Object.

            //To be noted that extendJSON also overrides the existing data of the JSON.
            //we can't assign directly jsonofExistingNodeProject into packageJson because it will override the user inputted values.

            //use copyTpl() method when you have to pass parameters in the particular file after copying that from templates.
            //when we don't have to pass any parameters , then we can use any of the two methods i.e copyTpl() or copy().
            //But, copyTpl() method is must when you are passing the parameters.

    //dependency can also be downloaded by using this command :-
    //this.npmInstall(['karma'], {'save-dev' : true}); //for installing 'karma' node module dependency in my package.json file.  
