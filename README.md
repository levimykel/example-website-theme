# prismic.io Example Theme

This is a simple nodejs website example theme for prismic.io.

## Creating your own theme

In order to create a theme for prismic.io, there are a few things you need to do.

#### 1) Add a prismic-configuration file

The project must contain a prismic-configuration.js file in the root folder of the project. The file must at least contain the following code:

```
module.exports = {
  apiEndpoint: 'https://your-repo-name.prismic.io/api',
};
```

##### 2) Add the custom type folder

Create a folder named "custom_types" in the root folder of the project.

Inside the custom_types folder, create a json file for each custom type that you need for your theme. The prismic command line tool will automatically create these custom types for anyone installing your theme. Use te exact same format used to create the custom types in the prismic.io dashboard.

Create an "index.json" file in the custom_types folder. It will contain the meta data for each of the custom types included in the project. Use the following format:


```
[{
  "id": "bloghome",
  "name": "Blog Home",
  "repeatable": false,
  "value": "bloghome.json"
}, {
  "id": "post",
  "name": "Blog Post",
  "repeatable": true,
  "value": "post.json"
}]
```

In this case you have two custom types, a single custom type with the id bloghome and a display name Blog Home, and another custom type post which is repeatable with the id post and the display name Blog Post.

The field “value” correspond to the file name in the same folder with the actual custom type information.

##### 3) Publish your theme

It’s simple, you just need to provide a public URL with the zip of your theme.

You can also host your code on github. A simple github url or github zip url will also work to load your theme using the prismic command line tool.

That's it! Your theme is ready to use.

## Installing your theme

In order to install your theme, you need to install the prismic command line tool. Run the following command from your terminal:

```
$ npm install -g prismic-cli
```

Once installed, you can install a theme simply by running the following code in your terminal and follow the prompts:

```
$ prismic theme http://example.com/your-theme-url.zip
```

The prismic command line tool will automatically install the project files, set up a new prismic-repository, and create the custom types.

### Licence

This software is licensed under the Apache 2 license, quoted below.

Copyright 2016 Zengularity (http://www.zengularity.com).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
