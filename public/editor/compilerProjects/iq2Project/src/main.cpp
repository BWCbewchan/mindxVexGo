/*----------------------------------------------------------------------------*/
/*                                                                            */
/*    Module:       main.cpp                                                  */
/*    Author:       james                                                     */
/*    Created:      Thu Aug 05 2021                                           */
/*    Description:  XX project                                                */
/*                                                                            */
/*----------------------------------------------------------------------------*/
#include "vex.h"

using namespace vex;

// A global instance of vex::brain used for printing to the V5 brain screen
vex::brain       Brain;

// define your global instances of motors and other devices here


int main() {
    int count = 0;
   
    Brain.Screen.clearScreen();
    Brain.Screen.setFont( mono15 ); 

    while(1) {
        Brain.Screen.printAt( 10, 30, "Hello IQ2 %d", count++ );
        // Allow other tasks to run
        this_thread::sleep_for(10);
    }
}
