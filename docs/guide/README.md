# Introduction

**HttpService** is a framework-agnostic HTTP client built on top of [axios](https://www.npmjs.com/package/axios)

The purpose of creating **HttpService** is to provide a tool with an easy way to handle the axios setup reducing the complexity 
to manage the configurations for multiple hosts.

## Why Not ...?

### Use axios only

**Axios** is a powerful HTTP client lib and in the most use cases we don't need to handle multiple host to make 
API requests, so if you are looking for reducing the axios setup for multiple hosts clients in your projects, 
or you are a _OOP_ lover, this package is for you.

### Build on top of the JS fetch API

The javascript **fetch API** is great as well, however **axios** is one of the best packages for make request with a big community
support, and in our experience axios covers the mostly edge cases that we need. In the another hand, the goal of this package 
is not to provide a new HTTP client built form scratch to cover the same use cases, which can introduce issues that 
are already solved in axios by the community.

