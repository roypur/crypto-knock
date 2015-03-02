#include<stdio.h> //For standard things
#include<stdlib.h>    //malloc
#include<string.h>    //memset
#include<netinet/ip_icmp.h>   //Provides declarations for icmp header
#include<netinet/udp.h>   //Provides declarations for udp header
#include<netinet/tcp.h>   //Provides declarations for tcp header
#include<netinet/ip.h>    //Provides declarations for ip header
#include<sys/socket.h>
#include<arpa/inet.h>

int sock_raw;
int data_size;
int buffer;
int saddr;

struct sockaddr_in source,dest;
struct sockaddr;

int saddr_size;

int main()
{
    sock_raw = socket(AF_INET , SOCK_RAW , IPPROTO_UDP);
    while(1)
    {
        data_size = recvfrom(sock_raw , buffer , 65536 , 0 , &saddr , &saddr_size);
    }
}
