/*----------------------------------------------------------------------------*/
/*                                                                            */
/*    Module:       main.cpp                                                  */
/*    Author:       james                                                     */
/*    Created:      Thu Nov 04 2021                                           */
/*    Description:  EXP project                                               */
/*                                                                            */
/*----------------------------------------------------------------------------*/
#include "vex.h"

using namespace vex;

// A global instance of vex::brain used for printing to the V5 brain screen
vex::brain       Brain;

// define your global instances of motors and other devices here


int main() {
    int count = 0;
   
    Brain.Screen.setFont(prop30);

    while(1) {
        Brain.Screen.printAt( 10, 20, "Hello EXP %d", count++ );
        // Allow other tasks to run
        this_thread::sleep_for(10);
    }
}
