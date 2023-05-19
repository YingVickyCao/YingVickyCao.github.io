# XCode FAQ

# FAQ-1:The archive "XCode_10.1.xip" does not come from apple.

A ：

- Reason:  
  The zip is downloade long long ago, so certification is expired .

```
s$ xip -x Xcode_10.1.xip
xip: signing certificate was "Software Update" (validation not attempted)
xip: error: The archive “Xcode_10.1.xip” does not come from Apple.
hades4mac:Downloads hades$ pkgutil --check-signature Xcode_10.1.xip
Package "Xcode_10.1.xip":
   Status: signed by a certificate that has since expired
   Certificate Chain:
    1. Software Update
       SHA1 fingerprint: 1C 34 E3 91 C6 44 32D7 DD 24 BE 59 B1 66 7B 2F DA 09 76 E1 FD
       -----------------------------------------------------------------------------
    2. Apple Software Update Certification Authority
       SHA1 fingerprint: FA 02 10 0F CE 9D 93 00 89 C8 C2 51 0B BC 50 C8 85 8E 6F C10
       -----------------------------------------------------------------------------
    3. Apple Root CA
       SHA1 fingerprint: AC 1E 78 66 2C 59 3A 08 FF 58 D1 99 E2 24 52 D1 98 DF 80 60
```

- Fix:  
  Re-download, then re-install.

- Refs:  
  https://developer.apple.com/downloads/  
  https://developer.apple.com/download/more/  
  https://download.developer.apple.com/Developer_Tools/Xcode_10.1/Xcode_10.1.xip

# FAQ-2:[Xcode 10.3] XCode 不能自动提示 Objective-C 代码

A ：  
首先重启 XCode。
解决不了，尝试 https://www.cnblogs.com/leisurezxy/p/10329361.html。

# FAQ-3:[XCode 13.3] Command "`swiftc --help`" failed:"`xcrun: error: invalid active developer path`"

```
$ swiftc --help
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```

Reason：

“Xcode command line tools”缺失。  
”Xcode command line tools“ 每此升级 Mac OS，都要重新安装一遍。

Fix：
"重新安装 Xcode command line tools"

```
$ xcode-select --install
xcode-select: note: install requested for command line developer tools

// After finish install
$ xcode-select -v
xcode-select version 2395.

$ swiftc --version
Apple Swift version 5.5 (swiftlang-1300.0.27.6 clang-1300.0.27.2)
Target: x86_64-apple-darwin21.5.0
```

Ref ： https://zhuanlan.zhihu.com/p/354158676

# FAQ-4:[Xcode 10.3]XCode run:This iPhone 6s Plus is running iOS 12.4 (16G77), which may not be supported by this version of Xcode.

![ios_build_error_4_xcode_overdue_1.jpg](https://yingvickycao.github.io/img/ios/xcode_run_ios/ios_build_error_4_xcode_overdue_1.jpg)

原因：IPhone 升级到 12.4 后，Xcode 不支持。  
Fix：

- 方法 1:下载/Copy 12.14 真机包，放到 DeviceSupport 目录  
  https://github.com/iGhibli/iOS-DeviceSupport

Applications -> Xcode.app -> Contents -> Developer -> Platforms -> iPhoneOS.platform -> DeviceSupport  
(/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/DeviceSupport)  
![ios_build_error_4_xcode_overdue_2.jpg](https://yingvickycao.github.io/img/ios/xcode_run_ios/ios_build_error_4_xcode_overdue_2.jpg)

提示需要：12.4 (16G77)  
实际 donwload：12.4 (16G73)  
测试结果：正常 work

- 方法 2：升级 XCode

# FAQ-5:[Xcode 10.3]XCode run：Please try rebooting and reconnecting the device. (0xE8000076)

![ios_build_error_4_reboold_4_reconnect_iphone.jpg](https://yingvickycao.github.io/img/ios/xcode_run_ios/ios_build_error_4_reboold_4_reconnect_iphone.jpg)

Fix：  
重启 device/重连 device

# FAQ-6:[Xcode 10.3]XCode run：Xcode will continue when iPhone is finished.

![ios_build_error_4_when_iphone_finished.jpg](https://yingvickycao.github.io/img/ios/xcode_run_ios/ios_build_error_4_when_iphone_finished.jpg)

Fix：  
删除 build，reconnet iphone，重新打开 test.xcodeproj

# FAQ-7:[Xcode 10.3]XCode run : Verify the Developer App certificate for your account is trusted on your device.

![iod_build_error_4_trust_iphone.jpg](https://yingvickycao.github.io/img/ios/xcode_run_ios/iod_build_error_4_trust_iphone.jpg)

Fix：  
IPhone 真机 -> General -> Device Management -> Trust

# FAQ-8:[Xcode 10.3]XCode run ：codesign wants to access key "access" in keychain your keychain

![ios_build_4_need_chain.jpg](https://yingvickycao.github.io/img/ios/xcode_run_ios/ios_build_4_need_chain.jpg)

Fix:  
mac login pwd

# FAQ-9：[XCode 13.3]Command `"swiftc -dump-ast main.swift"` failed,error:`"error: failed to build module 'Swift'; this SDK is not supported by the compiler (the SDK is built with 'Apple Swift version 5.6 (swiftlang-5.6.0.323.32 clang-1316.0.20.8)', while this compiler is 'Apple Swift version 5.5 (swiftlang-1300.0.27.6 clang-1300.0.27.2)'). Please select a toolchain which matches the SDK."`

```
$ swiftc -dump-ast main.swift

/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:525:32: error: unknown attribute 'unchecked'
extension Swift._ArrayBuffer : @unchecked Swift.Sendable where Element : Swift.Sendable {
                               ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:1325:25: error: unknown attribute 'unchecked'
extension Swift.Array : @unchecked Swift.Sendable where Element : Swift.Sendable {
                        ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:2091:30: error: unknown attribute 'unchecked'
extension Swift.ArraySlice : @unchecked Swift.Sendable where Element : Swift.Sendable {
                             ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:1529:16: error: stored property '_buffer' of 'Sendable'-conforming generic struct 'ArraySlice' has non-sendable type 'ArraySlice<Element>._Buffer' (aka '_SliceBuffer<Element>')
  internal var _buffer: Swift.ArraySlice<Element>._Buffer
               ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:5543:35: error: unknown attribute 'unchecked'
extension Swift.ContiguousArray : @unchecked Swift.Sendable where Element : Swift.Sendable {
                                  ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:4991:16: error: stored property '_buffer' of 'Sendable'-conforming generic struct 'ContiguousArray' has non-sendable type 'ContiguousArray<Element>._Buffer' (aka '_ContiguousArrayBuffer<Element>')
  internal var _buffer: Swift.ContiguousArray<Element>._Buffer
               ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:7252:30: error: unknown attribute 'unchecked'
extension Swift.Dictionary : @unchecked Swift.Sendable where Key : Swift.Sendable, Value : Swift.Sendable {
                             ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:7254:35: error: unknown attribute 'unchecked'
extension Swift.Dictionary.Keys : @unchecked Swift.Sendable where Key : Swift.Sendable, Value : Swift.Sendable {
                                  ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:7256:37: error: unknown attribute 'unchecked'
extension Swift.Dictionary.Values : @unchecked Swift.Sendable where Key : Swift.Sendable, Value : Swift.Sendable {
                                    ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:7258:44: error: unknown attribute 'unchecked'
extension Swift.Dictionary.Keys.Iterator : @unchecked Swift.Sendable where Key : Swift.Sendable, Value : Swift.Sendable {
                                           ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:7260:46: error: unknown attribute 'unchecked'
extension Swift.Dictionary.Values.Iterator : @unchecked Swift.Sendable where Key : Swift.Sendable, Value : Swift.Sendable {
                                             ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:7262:36: error: unknown attribute 'unchecked'
extension Swift.Dictionary.Index : @unchecked Swift.Sendable where Key : Swift.Sendable, Value : Swift.Sendable {
                                   ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:7264:39: error: unknown attribute 'unchecked'
extension Swift.Dictionary.Iterator : @unchecked Swift.Sendable where Key : Swift.Sendable, Value : Swift.Sendable {
                                      ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:7151:18: error: stored property '_variant' of 'Sendable'-conforming struct 'Iterator' has non-sendable type 'Dictionary<Key, Value>.Iterator._Variant'
    internal var _variant: Swift.Dictionary<Key, Value>.Iterator._Variant
                 ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:11945:16: error: stored property '_elements' of 'Sendable'-conforming generic struct 'KeyValuePairs' has non-sendable type '[(Key, Value)]'
  internal let _elements: [(Key, Value)]
               ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:17251:23: error: unknown attribute 'unchecked'
extension Swift.Set : @unchecked Swift.Sendable where Element : Swift.Sendable {
                      ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:17253:29: error: unknown attribute 'unchecked'
extension Swift.Set.Index : @unchecked Swift.Sendable where Element : Swift.Sendable {
                            ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:17255:32: error: unknown attribute 'unchecked'
extension Swift.Set.Iterator : @unchecked Swift.Sendable where Element : Swift.Sendable {
                               ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:17156:18: error: stored property '_variant' of 'Sendable'-conforming struct 'Iterator' has non-sendable type 'Set<Set<Element>.Iterator.Element>.Iterator._Variant' (aka 'Set<Element>.Iterator._Variant')
    internal var _variant: Swift.Set<Element>.Iterator._Variant
                 ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/Swift.swiftmodule/x86_64-apple-macos.swiftinterface:19556:37: error: unknown attribute 'unchecked'
@frozen public struct _StringGuts : @unchecked Swift.Sendable {
                                    ^
/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/_Concurrency.swiftmodule/x86_64-apple-macos.swiftinterface:5:8: error: failed to build module 'Swift'; this SDK is not supported by the compiler (the SDK is built with 'Apple Swift version 5.6 (swiftlang-5.6.0.323.32 clang-1316.0.20.8)', while this compiler is 'Apple Swift version 5.5 (swiftlang-1300.0.27.6 clang-1300.0.27.2)'). Please select a toolchain which matches the SDK.
import Swift
       ^
Please submit a bug report (https://swift.org/contributing/#reporting-bugs) and include the project and the crash backtrace.
Stack dump:
0.	Program arguments: /Library/Developer/CommandLineTools/usr/bin/swift-frontend -frontend -dump-ast -primary-file main.swift -target x86_64-apple-darwin21.5.0 -enable-objc-interop -sdk /Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk -color-diagnostics -target-sdk-version 12.3 -module-name main -o -
1.	Apple Swift version 5.5 (swiftlang-1300.0.27.6 clang-1300.0.27.2)
2.
3.	While evaluating request TypeCheckSourceFileRequest(source_file "/Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/_Concurrency.swiftmodule/x86_64-apple-macos.swiftinterface")
4.	While type-checking 'MainActor' (at /Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/_Concurrency.swiftmodule/x86_64-apple-macos.swiftinterface:1455:27)
5.	While type-checking declaration 0x7fa2d11b4198 (at /Library/Developer/CommandLineTools/SDKs/MacOSX12.3.sdk/usr/lib/swift/_Concurrency.swiftmodule/x86_64-apple-macos.swiftinterface:1456:10)
Stack dump without symbol names (ensure you have llvm-symbolizer in your PATH or set the environment var `LLVM_SYMBOLIZER_PATH` to point to it):
0  swift-frontend           0x00000001087df187 llvm::sys::PrintStackTrace(llvm::raw_ostream&, int) + 39
1  swift-frontend           0x00000001087de118 llvm::sys::RunSignalHandlers() + 248
2  swift-frontend           0x00000001087df796 SignalHandler(int) + 278
3  libsystem_platform.dylib 0x00007ff817acfdfd _sigtramp + 29
4  libsystem_platform.dylib 000000000000000000 _sigtramp + 18446603370183721504
5  swift-frontend           0x00000001048d93ac swift::TypeChecker::conformsToProtocol(swift::Type, swift::ProtocolDecl*, swift::DeclContext*) + 76
6  swift-frontend           0x000000010488f126 (anonymous namespace)::DeclChecker::visitBoundVariable(swift::VarDecl*) + 2950
7  swift-frontend           0x000000010488db25 void llvm::function_ref<void (swift::VarDecl*)>::callback_fn<(anonymous namespace)::DeclChecker::visitPatternBindingDecl(swift::PatternBindingDecl*)::'lambda'(swift::VarDecl*)>(long, swift::VarDecl*) + 37
8  swift-frontend           0x0000000104882490 swift::ASTVisitor<(anonymous namespace)::DeclChecker, void, void, void, void, void, void>::visit(swift::Decl*) + 4240
9  swift-frontend           0x000000010487f1b6 (anonymous namespace)::DeclChecker::visit(swift::Decl*) + 422
10 swift-frontend           0x0000000104883a0c swift::ASTVisitor<(anonymous namespace)::DeclChecker, void, void, void, void, void, void>::visit(swift::Decl*) + 9740
11 swift-frontend           0x000000010487f1b6 (anonymous namespace)::DeclChecker::visit(swift::Decl*) + 422
12 swift-frontend           0x000000010487effd swift::TypeChecker::typeCheckDecl(swift::Decl*) + 205
13 swift-frontend           0x000000010494f018 swift::TypeCheckSourceFileRequest::evaluate(swift::Evaluator&, swift::SourceFile*) const + 552
14 swift-frontend           0x0000000104950e29 llvm::Expected<swift::TypeCheckSourceFileRequest::OutputType> swift::Evaluator::getResultUncached<swift::TypeCheckSourceFileRequest>(swift::TypeCheckSourceFileRequest const&) + 633
15 swift-frontend           0x000000010494ed92 swift::performTypeChecking(swift::SourceFile&) + 114
16 swift-frontend           0x0000000103a78aed swift::CompilerInstance::performSema() + 269
17 swift-frontend           0x0000000103a80e01 std::__1::error_code llvm::function_ref<std::__1::error_code (swift::SubCompilerInstanceInfo&)>::callback_fn<swift::ModuleInterfaceBuilder::buildSwiftModuleInternal(llvm::StringRef, bool, std::__1::unique_ptr<llvm::MemoryBuffer, std::__1::default_delete<llvm::MemoryBuffer> >*, llvm::ArrayRef<std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > >)::$_1::operator()() const::'lambda'(swift::SubCompilerInstanceInfo&)>(long, swift::SubCompilerInstanceInfo&) + 241
18 swift-frontend           0x0000000103a8aa54 swift::InterfaceSubContextDelegateImpl::runInSubCompilerInstance(llvm::StringRef, llvm::StringRef, llvm::StringRef, swift::SourceLoc, llvm::function_ref<std::__1::error_code (swift::SubCompilerInstanceInfo&)>) + 6628
19 swift-frontend           0x0000000103a80cef void llvm::function_ref<void ()>::callback_fn<swift::ModuleInterfaceBuilder::buildSwiftModuleInternal(llvm::StringRef, bool, std::__1::unique_ptr<llvm::MemoryBuffer, std::__1::default_delete<llvm::MemoryBuffer> >*, llvm::ArrayRef<std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > >)::$_1>(long) + 159
20 swift-frontend           0x0000000108721c46 RunSafelyOnThread_Dispatch(void*) + 38
21 swift-frontend           0x00000001087e03fd threadFuncSync(void*) + 13
22 libsystem_pthread.dylib  0x00007ff817aba4e1 _pthread_start + 125
23 libsystem_pthread.dylib  0x00007ff817ab5f6b thread_start + 15
Segmentation fault: 11
```

Reason:
XCode 自带 swift 版本与 command line tools 的 Swift 版本不一致。

Fix：
下载 command line tools 13.3，并安装。  
https://developer.apple.com/downloads/

```
// 安装前
$ swift -version
Apple Swift version 5.5 (swiftlang-1300.0.27.6 clang-1300.0.27.2)
Target: x86_64-apple-darwin21.5.0

// 安装后
$ swift -version
Apple Swift version 5.6 (swiftlang-5.6.0.323.62 clang-1316.0.20.8)
Target: x86_64-apple-darwin21.5.0
```

# FAQ-10:[XCode 13.3] Command "swiftc -dump-ast main.swift" failed,error:""

```
$ swiftc -dump-ast main.swift
<unknown>:0: remark: did not find a prebuilt standard library for target 'x86_64-apple-macos' compatible with this Swift compiler; building it may take a few minutes, but it should only happen once for this combination of compiler and target
```

![swiftc_create_ ast_error](https://yingvickycao.github.io/img/ios/swift/swiftc_create_ast_error.webp)

Reason：TODO

Fix:
虽然有错误提示，但是最终生成 AST，因此不需要 fix。

# FAQ-11:[XCode 13.3]XCode run failed,error:"duplicate symbol 'main'"

```swift
//main.swift
import Foundation
print("Hello, World!")
```

```c
// test.m
#import <Foundation/Foundation.h>

int main(int argc,const char* argv[]){
   @autoreleasepool {
       int c = sizeof(int);
       printf("%d", c);
   }
}
```

```
duplicate symbol 'main' in:
    /Users/hades/Library/Developer/Xcode/DerivedData/Test-Swift-hjmlyoordacidhbcrpwyxvrdgqoj/Build/Intermediates.noindex/Test-Swift.build/Debug/Test-Swift.build/Objects-normal/x86_64/main2.o
    /Users/hades/Library/Developer/Xcode/DerivedData/Test-Swift-hjmlyoordacidhbcrpwyxvrdgqoj/Build/Intermediates.noindex/Test-Swift.build/Debug/Test-Swift.build/Objects-normal/x86_64/main.o
ld: 1 duplicate symbol for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

Reason :  
main.swift 默认带一个 main 函数，test.m 有一个 main 函数，一共有 2 个 main 函数。  
一个程序只能有一个 main 入口。

Fix：
运行 main.swift 时，注释掉 test.m。  
运行 test.m 时，暂时删掉 main.swift。

# FAQ-12 : [XCode 13.3] Swift Playground 运行起来很慢

Fix :

```swift
import UIKit
import Foundation
```

Platform : IOS, 改成 macOS

![XCode_FAQ_runs_swft_playground_slow ast_error](https://yingvickycao.github.io/img/ios/XCode_FAQ_runs_swft_playground_slow.webp)

# 【FAQ-13 】[XCode 14.1]Xcode 不显示 Products 文件夹问题 ?

Fix ：https://www.jianshu.com/p/3175de0120a5

# 【FAQ-14 】[XCode 14.1]XCode 格式化代码

https://www.zhihu.com/question/518500770

# 【FAQ-15 】[XCode 14.1] Xcode 调试：不让他进入汇编，只在源代码中调试

Debug -> Debug Workflow -> Always Show Disassembly
https://blog.csdn.net/DY_1024/article/details/86508025
