package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"time"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)

//
// Pod infos
//

func GetPodDetails() {

	// creates the in-cluster config
	var kubeconfig *string
	//nodeAddresses := []corev1.NodeAddress{}
	//var fl int64 = 0

	// To get In-CLuster config
	config, err := rest.InClusterConfig()
	fmt.Println("Incluster called")
	// If In-Cluster is nil then it will go for Out-Cluster config
	if config == nil {
		//fl = 1
		fmt.Println("config==nil")
		//To get Out-Cluster config
		if home := homedir.HomeDir(); home != "" {
			kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "kubeconfig file it is out-of-cluster")
		} else {
			kubeconfig = flag.String("kubeconfig", "", "Path to the kubeconfig file")
		}
		fmt.Println("kubeconfig :", kubeconfig)
		//panic(err.Error())
		flag.Parse()

		// uses the current context in kubeconfig
		config, err = clientcmd.BuildConfigFromFlags("", *kubeconfig)
		if err != nil {
			fmt.Println("congig err")
			panic(err.Error())
		}
	}
	// creates the clientset
	clientset, err := kubernetes.NewForConfig(config)

	if err != nil {
		panic(err.Error())
	}

	var IP string = ""
	var name string = ""
	for {
		if IP != "" {
			break
		} else {
			log.Printf("No IP for now.\n")
		}

		pods, err := clientset.CoreV1().Pods("default").List(metav1.ListOptions{})
		if err != nil {
			panic(err.Error())
		}
		for _, pod := range pods.Items {
			pod, _ := clientset.CoreV1().Pods("default").Get(pod.Name, metav1.GetOptions{})
			if pod.Name == os.Getenv("HOSTNAME") {
				IP = pod.Status.PodIP
			}
		}

		log.Printf("Waits...\n")
		time.Sleep(1 * time.Second)
	}

	name = os.Getenv("HOSTNAME")
	log.Printf("Trying os.Getenv(\"HOSTNAME/IP\"): [%s][%s]\n", name, IP)

	fmt.Println(IP, name)
}
func main() {
	GetPodDetails()
}
