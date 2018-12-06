'use strict';
var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var assert = require('assert');
var path = require('path');
var _ = require('lodash');
var mergeOrextend = _.merge;//this mergeOrextend method will also help in the same way as what Object.assign() does.
var filesystem = require('fs');
//for installing the dependencies of jquery,jsdom etc.. , you have to download it in this generator-node project which helps in 
//creating another project ,say Ax. so, we don't need to install dependencies there in Ax. But , it must be installed in the main
//yeoman generator ,i.e generator-node.
var $ = require('jquery');
//var jsdom = require('jsdom');
// require("jsdom").env("", function(err, window) {
//     if (err) {
//         console.error(err);
//         return;
//     }
 
//     var $ = require("jquery")(window);
// });
//var validate = require('validate-element-name');

var packageJson = {};

module.exports = class extends generators {

    constructor(args, options) {
		// Calling the super constructor is important so our generator is correctly set up
        super(args, options); //helps in calling the method of generators (parent) class. 
        //this.config.save();
        // Next, add your custom code
        //
        var dirName = process.cwd().split(path.sep).pop();

        var split = dirName.split('-');
        var prefix = split[0] + '-' + split[1];
        split.shift();
        split.shift();
        var name = split.join('-');
        //Delete the cache file which could not may have been deleted because of any unwanted interruption while installing the project.
        filesystem.unlink(this.destinationPath('.tempCacheFile'), function(){});

        //To notify the system that we expect an option, we use this.option() method

        this.option('prefixName', {
            type: String,
            default: prefix,
            desc: 'A prefix that will be used to namespace the project.',
            required: true
        });
		
		    /*var testArray = ['node-project'];
		    if(testArray.indexOf(prefix) === -1){
			  //this.log('Prefix not matching with the default prefix "node-project"');
        };*/
        //assert.equal() helps in validating the entered arguments with the expected arguments.		
        assert.equal(prefix, 'node-project', 'project Prefix should match ' + '"node-project"' + ". Eg: node-project-<<project name>>");
        //assert.equal(this.options.prefix, 'node-project', 'project Prefix should match ' + '"node-project"' + ". Eg: node-project-<<project name>>");
				
    		this.option('name', {
          type: String,
          default: name,
          desc: 'The name of the component to be generated.',
          required: false
        });
        this.option('description',{
          type : String,
          desc : 'Description of the Project',
          required : true
        });
        this.option('githubAccount',{
          type : String,
          desc : 'Github Account of the Author',
          required : true
        });
        this.option('authorName',{
          type : String,
          desc : 'Name of the Author',
          required : true
        });
        this.option('email',{
          type : String,
          desc : 'Email Account of the Author',
          required : false
        });
        this.option('includeReadme',{
          type : String,
          desc : 'Readme File Inclusion in the Project',
          required : false
        });

        this.option('skip-project-install', {
            desc : 'skip the installation of project',
            alias : 'sp',
			      type : String
        });


        //yo node-project --skip-project-install will give true and will go inside the loop
        //Options look a lot like arguments, but they are written as command line flags.
        //arguments :- yo node skip-project-install (in cmd) (Difference between arguments & options)
        //options :- yo node --skip-project-install (in cmd)
        if(!this.options['skip-project-install']){
            this.log('skip-project-installation : false');
        }
		
		   //this.log('this.options.prefix', this.options.prefix);

        /*if(this.options['skip-project-install']){
            this.log('skip-project-installation true  ', this.options.prefix );
        }*/
		   //this.log("name:- ",this.options.name);
    }

    initializing(){
      //Reading the files of package.json file present in templates , so that it can be customised according to our needs and 
      //then copied into the made project directory.
      this.pkgJSON = this.fs.readJSON(this.templatePath('package.json'), {});
      //this.log('packageJson: ',this.pkgJSON);
      this.props = {
        name : this.pkgJSON.name,
        prefix : this.pkgJSON.prefix,
        description : this.pkgJSON.description, 
        authorName : this.pkgJSON.description,
        email : this.pkgJSON.description,
        githubAccount : this.pkgJSON.description,
        includeReadme : this.pkgJSON.description,
        version : this.pkgJSON.version,
        scripts : this.pkgJSON.scripts,
        dependencies : this.pkgJSON.dependencies,
        devDependencies : this.pkgJSON.devDependencies
      };
      //assigning the readed files of package.json file into packageJson...Now, we will customize this packageJson object a/c to our requirement.
      Object.assign(packageJson,this.props);//assign method helps in updating the JSON values of json x from json y if the 
                                            //json values of y is present in x , otherwise , it will simply gets appended/extended.
    }
    
	_askForModuleName(){
			var promptInput = [{
			type: 'input',
			name: 'prefix',
			message: 'Enter component prefix:-',
			default: this.options.prefixName
			}, 
      {
			type: 'input',
			name: 'name',
			message: 'Enter component name:-',
			default: this.options.name
		   }];
		
		return this.prompt(promptInput).then(function(answers){
      //customising the packageJson object with the new values obtained from the User Input.
      Object.assign(packageJson, answers);
		});
	}

  _askFor(){
    var prompts = [{
      type : 'input',
      name : 'description',
      message : 'Description of the Project',
      required : true,
      store : true //Doing store : true will help in saving the inputted values in the .yo-rc.json configuration file in the made project directory 
                   //and next time,
                   // this value will get defaulted. This will make .yo-rc.json file in the node-project u want to make.
    },
    {
      type : 'input',
      name : 'githubAccount',
      message : 'Github Username Account',
      required : true,
      store : true
    },
    {
      type : 'input',
      name : 'authorName',
      message : 'Author Name',
      required : true,
      store : true
    },
    {
      type : 'input',
      name : 'email',
      message : 'Author Email',
      default : 'surajandraja@gmail.com',
      store : true
    },
    {
      type : 'confirm',
      name : 'includeReadme',
      message : 'Include Readme ?',
      default : true,
      store : true,
      when : !(this.options.githubAccount === 'surajkum1995' ? true : false)
    }
    ];

    return this.prompt(prompts).then(function(values){
      //customising the packageJson object with the new values obtained from the User Input.
      Object.assign(packageJson, values);
    });
  }

    prompting() {
      //this method helps in taking the user input.
      //this method is an asynchronous method...so, take care of using async() method.
    return this._askForModuleName()
               .then(this._askFor.bind(this));
    }

    writing() {

      this.log(this.options.includeReadme);//this will give values only for the input entered in cli as yo node --includeReadme=xyz //this will give value as xyz
      //otherwise , the value what we will get will be undefined. To access the entered user input, you have to use packageJson what you have stored/configured in prompt.then() function. 
      this.log(packageJson.includeReadme);

		this.log('Copying Template files ...');
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

            var jsonofExistingNodeProject = this.fs.readJSON(this.destinationPath('package.json'),{});
            //console.log(Object.keys(jsonofExistingNodeProject).length);//to count the length of a JSON Object.
            if(Object.keys(jsonofExistingNodeProject).length === 0 || jsonofExistingNodeProject === undefined || jsonofExistingNodeProject ==={}){
                this.fs.writeJSON(this.destinationPath('package.json'),packageJson);
            }
            else if (Object.keys(jsonofExistingNodeProject).length !== 0 || jsonofExistingNodeProject !== {}){
                filesystem.writeFile('.tempCacheFile',packageJson, function(err){//writeFile() helps in creating file or replacing the file if it exists.
                if (err){
                  console.log('Error while Creating file...');
                }
                else {
                  //console.log('Temp File Created!');
                }
              });
              this.fs.extendJSON(this.destinationPath('.tempCacheFile'),jsonofExistingNodeProject); //To be noted that extendJSON also overrides the existing data of the JSON.
              this.fs.extendJSON(this.destinationPath('.tempCacheFile'),packageJson);//we can't assign directly jsonofExistingNodeProject into packageJson because it will override the user inputted values.
              this.fs.writeJSON(this.destinationPath('package.json'), this.fs.readJSON(this.destinationPath('.tempCacheFile')));             
            }           
            
            //use copyTpl() method when you have to pass parameters in the particular file after copying that from templates.
            //when we don't have to pass any parameters , then we can use any of the two methods i.e copyTpl() or copy().
            //But, copyTpl() method is must when you are passing the parameters.
            this.fs.copyTpl(
               this.templatePath('www'),
               this.destinationPath(path.join('bin','www')), packageJson);
            // this.fs.copy(
            //   this.destinationPath('public','images'));
            // this.fs.copy(
            //   this.destinationPath('public','javascripts'));
            mkdirp.sync('public/images');
            mkdirp.sync('public/javascripts');
            this.fs.copy(
               this.templatePath('style.css'),
               this.destinationPath(path.join('public','stylesheets','style.css')));
            this.fs.copy(
               this.templatePath('index.js'),
               this.destinationPath(path.join('routes','index.js')));
            this.fs.copy(
               this.templatePath('users.js'),
               this.destinationPath(path.join('routes','users.js')));
            this.fs.copy(
               this.templatePath('error.jade'),
               this.destinationPath(path.join('views','error.jade')));
            this.fs.copy(
               this.templatePath('index.jade'),
               this.destinationPath(path.join('views','index.jade')));
            this.fs.copy(
               this.templatePath('layout.jade'),
               this.destinationPath(path.join('views','layout.jade')));
            this.fs.copy(
               this.templatePath('app.js'),
               this.destinationPath('app.js'));
            if(packageJson.includeReadme){
              this.fs.copy(
                this.templatePath('README.md'),
                this.destinationPath('README.md'));
            }            
    }
	
	install(){
    this.log('Finished Copying Template files');
    this.log('Installing all the Dependencies ...');
		this.npmInstall();
    //dependency can also be downloaded by using this command :-
    //this.npmInstall(['karma'], {'save-dev' : true}); //for installing 'karma' node module dependency in my package.json file.  
	}

    end() {

        filesystem.unlink(this.destinationPath('.tempCacheFile'), function(err){
          if(err){
          console.log('No such file exists...');
        }
          //console.log('Temp file not there or Deleted!!!');
        }); 

        this.log('Finished creating Project.');
    }
};