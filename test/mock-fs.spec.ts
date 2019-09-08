import 'mocha';
import { expect } from 'chai';

import fs = require('fs');

import mock = require('mock-fs');

import Item = require('mock-fs/lib/item');
import File = require('mock-fs/lib/file');
import Directory = require('mock-fs/lib/directory');
import SymbolicLink = require('mock-fs/lib/symlink');
import FileSystem = require('mock-fs/lib/filesystem');

afterEach(mock.restore);

describe('Smoke Tests', () => {
    it('check-mock-fs.ts should run without errors', () => {
        require('../types/mock-fs/check-mock-fs');
    });

    describe('index', () => {
        describe('getMockRoot()', () => {
            expect(() => mock.getMockRoot()).to.not.throw;
        });

        describe('file', () => {
            it('should be callable', () => {
                expect(() => mock.file()).to.not.throw;
            });
        });

        describe('directory', () => {
            it('should be callable', () => {
                expect(() => mock.directory()).to.not.throw;
            });
        });

        describe('symlink', () => {
            it('should be callable', () => {
                expect(() => mock.symlink({ path: 'foo' })).to.not.throw;
            });
        });
    });

    // submodules
    describe('FileSystem', () => {
        it('should be constructible', () => {
            expect(() => new FileSystem()).to.not.throw;
        });

        describe('create', () => {
            it('should be callable', () => {
                expect(() => FileSystem.create()).to.not.throw;
            });
        });

        describe('file', () => {
            it('should be callable', () => {
                expect(() => FileSystem.file()).to.not.throw;
            });
        });

        describe('directory', () => {
            it('should be callable', () => {
                expect(() => FileSystem.directory()).to.not.throw;
            });
        });

        describe('symlink', () => {
            it('should be callable', () => {
                expect(() => FileSystem.symlink({ path: 'foo' })).to.not.throw;
            });
        });

        describe('getPathParts', () => {
            it('should be callable', () => {
                expect(() => FileSystem.getPathParts('abc/def')).to.not.throw;
            });
        });
    });

    describe('Item', () => {
        it('should be constructible', () => {
            expect(() => new Item()).to.not.throw;
        });
    });

    describe('File', () => {
        it('should be constructible', () => {
            expect(() => new File()).to.not.throw;
        });
    });

    describe('Directory', () => {
        it('should be constructible', () => {
            expect(() => new Directory()).to.not.throw;
        });
    });

    describe('SymbolicLink', () => {
        it('should be constructible', () => {
            expect(() => new SymbolicLink()).to.not.throw;
        });
    });
});

describe('Basic Tests', () => {
    it('should mock file contents', () => {
        mock({
            'path/to/fake/dir': {
                'some-file.txt': 'file content here',
                'empty-dir': {
                    /** empty directory */
                },
            },
            'path/to/some.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
            'some/other/path': {
                /** another empty directory */
            },
        });

        const fileContents = fs.readFileSync('path/to/fake/dir/some-file.txt', 'utf8');

        expect(fileContents).to.equal('file content here');
    });

    it('should allow creating files with mock.file()', () => {
        mock({
            'path/to/fake/dir': {
                'some-file.txt': mock.file({
                    content: 'file content here',
                }),
                'empty-dir': {
                    /** empty directory */
                },
            },
            'path/to/some.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
            'some/other/path': {
                /** another empty directory */
            },
        });

        const fileContents = fs.readFileSync('path/to/fake/dir/some-file.txt', 'utf8');

        expect(fileContents).to.equal('file content here');
    });
});
