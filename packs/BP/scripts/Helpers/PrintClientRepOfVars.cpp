#include <iostream>
#include <string>
#include <vector>
using namespace std;

const int totalBits = 7;

//taken from BinaryOfBitsToString with size 6
vector<string> bitRep6 = {"000000", "000001", "000010", "000011", "000100", "000101", "000110", "000111", "001000", "001001", "001010", "001011", "001100", "001101", "001110", "001111", "010000", "010001", "010010", "010011", "010100", "010101", "010110", "010111", "011000", "011001", "011010", "011011", "011100", "011101", "011110", "011111", "100000", "100001", "100010", "100011", "100100", "100101", "100110", "100111", "101000", "101001", "101010", "101011", "101100", "101101", "101110", "101111", "110000", "110001", "110010", "110011", "110100", "110101", "110110", "110111", "111000", "111001", "111010", "111011", "111100", "111101", "111110", "111111"};

int main() {
    /**
     * conversion table:
     * 0 = v.shouldArmBob
     * 1 = v.isShooting        
     * 2 = v.isReloading       
     * 3 = v.shouldFirearmSlide
     * 4 = v.recoilBit1
     * 5 = v.recoilBit2
     * 6 = v.recoilBit3
     */
    cout << "Enter which variable to get a query string from:";
    int conversionNum;
    cin >> conversionNum;
    if(conversionNum < 0 || conversionNum >= totalBits) {
        cout << "Invalid number.";
        return 1;
    }
    string output = "q.is_name_any(";
    for(int i=0; i<bitRep6.size(); i++) {
        bitRep6[i].insert(bitRep6[i].begin()+conversionNum, '1');
        output += "\'" + bitRep6[i] + "\'";
        if(i != bitRep6.size()-1) {
            output += ", ";
        }
    }

    output += ");";
    cout << output;
    return 0;
}