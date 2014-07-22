/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    sprite.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/22 15:27:03$
 */

var fs = require('fs');

/**
 * 命令行配置项
 *
 * @inner
 * @type {Object}
 */
var cli = {};

/**
 * @const
 * @type {Array.<string>}
 */
cli.options = ['config:', 'output:'];

/**
 * @const
 * @type {string}
 */
cli.description = '扫描css，将其中合适的图片合并到精灵图';


/**
 * 模块命令行运行入口
 * 
 * @param {Array} args 命令运行参数
 * @param {Object} opts 命令运行选项
 */
cli.main = function (args, opts) {
    var spriter = require('ispriter');

    var config = {};
    if (opts.config) {
        config = eval('(' + fs.readFileSync(opts.config, 'utf-8') + ')');
    }

    if (!config.input) {
        config.input = {
            cssSource: []
        };
    }

    if (typeof config.input == 'string') {
        config.input = {
            cssSource: [config.input]
        };
    }
    else if (Array.isArray(config.input)) {
        config.input = {
            cssSource: config.input
        };
    }

    if (args.length) {
        config.input.cssSource = config.input.cssSource.concat(args);
    }

    if (opts.output) {
        if (!config.output) {
            config.output = {
                cssDist: opts.output
            };
        }
        else if (typeof config.output != 'string') {
            config.output.cssDist = opts.output;
        }
    }

    spriter.merge(opts.config);
};

/**
 * 命令行配置项
 *
 * @type {Object}
 */
exports.cli = cli;



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
