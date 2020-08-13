package k8s

import (
	"flag"
	"fmt"
	"path/filepath"
    "k8s.io/client-go/rest"
    metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
    corev1 "k8s.io/api/core/v1"
    "k8s.io/client-go/kubernetes"
    "k8s.io/client-go/tools/clientcmd"
    "k8s.io/client-go/util/homedir"
)

func getIP() {

	// Require variables declared
    var kubeconfig *string
    nodeAddresses := []corev1.NodeAddress{}
	var fl int64 = 0
	/*
	// To get In-CLuster config
	config, err := rest.InClusterConfig()
	
	//It config is nil 
	if err != nil {
		panic(err.Error())
    }
    // If In-Cluster is nil then it will go for Out-Cluster config  
    if config == nil{
		fl = 1
		
		//To get Out-Cluster config
        if home := homedir.HomeDir(); home != "" {
             kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "kubeconfig file it is out-of-cluster")
        } else {
            kubeconfig = flag.String("kubeconfig", "", "Path to the kubeconfig file")
        }
    }
	flag.Parse()
	*/
	// uses the current context in kubeconfig
    config, err = clientcmd.BuildConfigFromFlags("", *kubeconfig)
    if err != nil {
        panic(err.Error())
	}
	
    // creates the clientset
    clientset, err := kubernetes.NewForConfig(config)
    if err != nil {
        panic(err.Error())
    }
	
	// Using clientset get nodes
    nodes, err := clientset.CoreV1().Nodes().List(metav1.ListOptions{})
    if err != nil {
        panic(err)
	}

	// Traverse to node to get IP addresses 
	// If In-Cluster kubeconfig then return Internal IP
	// If Out-Cluster kubeconfig then return External IP 
	if fl == 0 {
    	for i := 0; i < len(nodes.Items); i++ {
        	nodeAddresses = nodes.Items[i].Status.Addresses
    	    for j := 0; j < len(nodeAddresses); j++ {
				nodeAddress := nodeAddresses[j]
				if fl ==0 {
            		if(nodeAddress.Type == corev1.NodeInternalIP){
					fmt.Println(nodeAddress.Address)
					// Internal IP if Inside Of Cluster
					}
				} else if fl == 1 { 	
					if(nodeAddress.Type == corev1.NodeExternalIP){
						fmt.Println(nodeAddress.Address)
						// External IP if Out Of Cluster
					}
				}	
       		}
    	}
    } else {
		fmt.Println("Error") 
	}
}
