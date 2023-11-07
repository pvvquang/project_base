#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
// #import "RNSplashScreen"
#import <Firebase.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  [FIRApp configure];

  self.moduleName = @"ReactNative";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  BOOL ret = [super application:application didFinishLaunchingWithOptions:launchOptions];
  if (ret == YES) {
    // Set the splash screen to show by default.
    // [RNSplashScreen show];
  }
  return ret;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
