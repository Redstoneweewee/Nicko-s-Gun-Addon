#include <iostream>
#include <string>
#include <vector>
#include <cmath>
using namespace std;


string convertBitToString(int num, int size);

int main() {
    cout << "Enter the number of bits:";
    int bits;
    cin >> bits;
    if(bits <= 0) {
        cout << "Invalid number.";
        return 1;
    }
    string output = "";

    for(int i=0; i<pow(2,bits); i++) {
        output += "\"";
        output += convertBitToString(i, bits);
        output += "\", ";
    }
    cout << output;
    return 0;
}


string convertBitToString(int num, int size) {
    string output = "";
    for(int i=0; i<size; i++) {
        output = to_string(num % 2) + output;
        num /= 2;
    }
    return output;
}   