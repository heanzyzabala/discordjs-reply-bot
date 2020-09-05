# Discord Reply Bot
<a href="https://top.gg/bot/693108033601011762" >
  <img src="https://top.gg/api/widget/693108033601011762.svg" alt="ReplyBot" />
</a>

A configurable discord that adds automated reply function to your server.
## Installation
Use this [link](https://discordapp.com/oauth2/authorize?client_id=693108033601011762&scope=bot&permissions=281664) to invite the bot to your server.

## Commands

NOTE: Keywords enclosed in `<` `>` are just placeholders. See example for the actual values.

### 1. add
* Description:
  * Used to set the word/s that triggers the reply.
* Parameters:
  * `--add "<key>" "<reply>"`
* Example:
  * `---add "hello" "world"`
* Flags:
  * By default, only the exact word is matched. This means that if I chat the word `Hello` (with a capitalized `H`) or `hhello` then the reply will not be triggered.
  * To change this, you can add `flags` to the command to specify how the `key` will be matched to the word/s provided by the user:
    * `--includes`
      * Description:
        * Searches the whole string if it contains the `key`, meaning that it will trigger the `reply` when a user says `apple` since `ppl` is inside the word `apple`. See Example: 
      * Example:
        * `--add "pple" "fruit" --includes`
    * `--ignoreCase`
      * Description:
        * Ignore case sensitivity when matching the `key`. This will let us trigger the reply `world` using `Hello`(with a capitalized H) instead of `hello`. See Example:
      * Example:
        * `--add "hello" "world" --ignoreCase`
   
   NOTE: You can combine multiple flags like so: `--add "hello" "world" --includes --ignoreCase`.


### 2. list
* Description:
  * Prints all saved replies.
* Parameters:
  * `--list`
* Example:
  * `--list`

### 3. remove
* Description:
  * Used to remove saved reply either by it's `index` or `key`
* Parameters:
  * `--remove "<key>"|<index>`
* Example:
  * `--remove "hello"`
  * `--remove 0`
  
## Todos
- [ ] Restructure code
- [ ] Add reply limits per server (default should be 10 but increasing per x votes)
- [ ] Add proper analytics (currently using logs)
- [ ] Create dashboard for analytics

## Contributing
Pull requests are welcome. Please open an issue first to discuss what you would like to change.


## License
```
MIT License

Copyright (c) 2020 Heanzy Zabala

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
